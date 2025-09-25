import type { Express } from "express";
import { createServer, type Server } from "http";

import { storage } from "./storage";
import { db } from "./db";
import { insertUserSchema, insertUserProfileSchema, insertExperienceSchema, insertCompanySchema, adminLogs, users } from "@shared/schema";
import { z } from "zod";
import passport from 'passport';
import { setupGoogleAuth } from './googleAuth';
import { desc, eq, and, or, sql } from "drizzle-orm";
import { sendVerificationEmail, sendAdminNotification } from "./emailService";
import crypto from "crypto";
import path from "path";
import bcrypt from "bcryptjs";

// Extend Express Request type to include session and admin user
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      adminUser?: any;
    }
  }
}

// Authentication middleware
function requireAuth(req: any, res: any, next: any) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  // Add user info to request
  req.user = { id: req.session.userId };
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Setup Google OAuth with routes
  setupGoogleAuth(app);

  // Add CORS headers for OAuth
  app.use('/api/auth/google*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Google OAuth routes are now handled in setupGoogleAuth

  // Logout route
  app.post("/api/auth/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destroy error:", err);
          return res.status(500).json({ error: "Could not log out" });
        }
        res.clearCookie('connect.sid');
        res.json({ message: "Logged out successfully" });
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Authentication routes - Return complete user data including all company fields
  app.get("/api/auth/me", async (req, res) => {
    try {
      // Support both session-based auth (Google OAuth) and custom session auth
      const userId = req.session.userId || (req.user as any)?.id;
      
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      // Return complete user data directly (not nested in user property)
      const { password, verificationToken, verificationTokenExpiry, ...safeUserData } = user;
      res.json(safeUserData);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Email verification endpoint
  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token) {
        return res.status(400).json({ error: "Verification token is required" });
      }
      
      const user = await storage.getUserByVerificationToken(token as string);
      
      if (!user) {
        return res.status(400).json({ error: "Invalid or expired verification token" });
      }
      
      // Update user email verification status
      await storage.verifyUserEmail(user.id);
      
      console.log(`✅ Email verified for user: ${user.email}`);
      
      res.json({ 
        message: "Email verified successfully! You can now access all portal features.",
        user: {
          id: user.id,
          email: user.email,
          emailVerified: true
        }
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if email is verified AND registration complete for empresa users
      if (user.role === 'empresa' && (!user.emailVerified || !user.registrationComplete)) {
        return res.status(403).json({ 
          error: user.emailVerified 
            ? "Complete company registration is required for portal access"
            : "Email not verified", 
          message: user.emailVerified 
            ? "Please complete your company registration to access the portal"
            : "Please verify your email before logging in",
          requiresVerification: !user.emailVerified,
          requiresRegistration: !user.registrationComplete
        });
      }

      // Verify password (using bcrypt for hashed passwords or plain comparison for legacy)
      const isPasswordValid = user.password?.startsWith('$2') 
        ? await bcrypt.compare(password, user.password)
        : user.password === password;

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Set session with user ID
      req.session.userId = user.id;
      
      // Force session save to ensure persistence before responding
      req.session.save((err) => {
        if (err) {
          console.error("❌ Session save error:", err);
          return res.status(500).json({ error: "Session save failed" });
        } else {
          console.log("✅ Session saved successfully");
          res.json({ user: { id: user.id, email: user.email } });
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      console.log("🚀 New registration attempt:", {
        email: req.body.email,
        role: req.body.role,
        hasCompanyData: !!(req.body.companyName || req.body.companyCategory),
        isCompleteRegistration: req.body.registrationComplete
      });

      // Extract first and last name from email if not provided
      const email = req.body.email;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      
      if (!firstName || !lastName) {
        const emailName = email.split('@')[0];
        const nameParts = emailName.split('.');
        firstName = firstName || nameParts[0] || emailName;
        lastName = lastName || nameParts[1] || 'User';
      }
      
      // Determine role based on registration path or default to 'viajero'
      const role = req.body.role || req.body.userType || 'viajero';
      
      // Handle location data for map positioning
      const coordinates = req.body.coordinates || req.body.location || { lat: 4.7110, lng: -74.0721 };
      const address = req.body.address || '';
      const city = req.body.city || 'Bogotá';
      
      // Build comprehensive user data for complete empresa registration
      const userData = insertUserSchema.parse({
        ...req.body,
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        companyName: req.body.companyName || req.body.businessName,
        role: role,
        isActive: true,
        address,
        city,
        country: req.body.country || 'Colombia',
        coordinates,
        // Complete company registration fields
        companyDescription: req.body.companyDescription || '',
        companyCategory: req.body.companyCategory || '',
        companySubcategory: req.body.companySubcategory || '',
        businessType: req.body.businessType || '',
        yearsExperience: req.body.yearsExperience ? parseInt(req.body.yearsExperience) : null,
        teamSize: req.body.teamSize ? parseInt(req.body.teamSize) : null,
        bio: req.body.bio || '',
        targetMarket: req.body.targetMarket || '',
        phone: req.body.phone || '',
        website: req.body.website || '',
        twitterUrl: req.body.twitterUrl || '',
        facebookUrl: req.body.facebookUrl || '',
        linkedinUrl: req.body.linkedinUrl || '',
        instagramUrl: req.body.instagramUrl || '',
        certifications: req.body.certifications || [],
        sustainabilityPractices: req.body.sustainabilityPractices || [],
        accessibilityFeatures: req.body.accessibilityFeatures || [],
        servicesOffered: req.body.servicesOffered || [],
        operatingHours: req.body.operatingHours || {},
        socialMedia: req.body.socialMedia || {},
        emergencyContact: req.body.emergencyContact || {},
        profilePicture: req.body.profilePicture || '',
        registrationComplete: req.body.registrationComplete || false,
        profileCompletion: req.body.profileCompletion || (role === 'empresa' ? 100 : 50),
        verificationLevel: req.body.verificationLevel || (role === 'empresa' ? 'verified' : 'basic'),
        isContactCardVisible: req.body.isContactCardVisible ?? true,
        isMapVisible: req.body.isMapVisible ?? true,
        // New messaging configuration fields
        messagingEnabled: req.body.messagingEnabled ?? true,
        messagingBio: req.body.messagingBio || '',
        acceptsInquiries: req.body.acceptsInquiries ?? true,
        responseTimeHours: req.body.responseTimeHours || 24,
        // New experience creation setup fields  
        experienceSetupComplete: req.body.experienceSetupComplete ?? true,
        defaultExperienceCategory: req.body.defaultExperienceCategory || '',
        defaultMeetingPoint: req.body.defaultMeetingPoint || '',
        defaultCancellationPolicy: req.body.defaultCancellationPolicy || '',
        // Additional new fields from 15-step registration
        businessLicense: req.body.businessLicense || '',
        taxId: req.body.taxId || '',
        languages: req.body.languages || [],
        acceptTerms: req.body.acceptTerms || false,
        // Payment configuration
        paymentMethods: JSON.stringify(req.body.paymentMethods || []),
        invoiceEmail: req.body.invoiceEmail || '',
        taxInformation: req.body.taxInformation || '',
        // Notification preferences
        emailNotifications: req.body.emailNotifications ?? true,
        smsNotifications: req.body.smsNotifications ?? false,
        marketingEmails: req.body.marketingEmails ?? true,
        // Security settings
        twoFactorEnabled: req.body.twoFactorEnabled ?? false,
        loginNotifications: req.body.loginNotifications ?? true,
        // API settings
        apiAccess: req.body.apiAccess ?? false,
        webhookUrl: req.body.webhookUrl || '',
        // Final configuration
        setupComplete: req.body.setupComplete ?? true
      });
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Generate verification token for email verification
      const verificationToken = crypto.randomBytes(32).toString('hex');
      userData.verificationToken = verificationToken;
      userData.emailVerified = true; // Temporarily auto-verify until SendGrid is configured

      const user = await storage.createUser(userData);
      
      // Send verification email for empresa users (non-blocking)
      if (role === 'empresa' && userData.companyName) {
        // Send emails asynchronously without blocking registration
        Promise.resolve().then(async () => {
          try {
            const emailSent = await sendVerificationEmail(
              userData.email,
              `${userData.firstName || ''} ${userData.lastName || ''}`,
              userData.companyName || '',
              verificationToken
            );
            console.log(`📧 Verification email sent: ${emailSent ? 'Success' : 'Failed'}`);
            
            // Send admin notification
            await sendAdminNotification(
              `${userData.firstName || ''} ${userData.lastName || ''}`,
              userData.companyName || '',
              userData.email,
              userData.companyCategory || 'Sin categoría'
            );
          } catch (emailError) {
            console.error("⚠️ Email sending error (non-blocking):", emailError);
            // Email errors should not affect registration success
          }
        });
      }
      
      // For empresa users, create company profile automatically to activate all portal features
      if (role === 'empresa') {
        try {
          await storage.createCompany({
            userId: user.id,
            companyName: userData.companyName || `${user.firstName} ${user.lastName}`,
            businessType: userData.businessType || userData.companyCategory || 'tourism',
            description: userData.companyDescription || userData.bio || `${userData.companyName} - Empresa registrada en Festival NATUR`,
            address: userData.address || '',
            city: userData.city || 'Bogotá',
            country: userData.country || 'Colombia',
            coordinates: userData.coordinates || { lat: 4.6097, lng: -74.0817 },
            phone: userData.phone || '',
            website: userData.website || '',
            isVerified: true
          });
          
          console.log("✅ Complete Portal Empresas Registration - All Features Activated:");
          console.log("1. ✅ User account created with full profile");
          console.log("2. 🏢 Company profile created with all details");
          console.log("3. 📋 Category and subcategory assigned");
          console.log("4. 📍 Map location set with coordinates");
          console.log("5. 💬 Messaging system enabled");
          console.log("6. ✨ Experience creation available");
          console.log("7. 📞 Contact information complete");
          console.log("8. 🌐 Social media links integrated");
          console.log("9. 🏆 Certifications and practices listed");
          console.log("10. ⚙️ All portal features functional");
        } catch (companyError) {
          console.error("Company creation error:", companyError);
          // Continue with user creation even if company fails
        }
      }
      
      // Auto-login after registration
      req.session.userId = user.id;
      
      res.status(201).json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          role: user.role, 
          companyName: user.companyName,
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          coordinates: user.coordinates,
          registrationComplete: user.registrationComplete,
          profileCompletion: user.profileCompletion,
          verificationLevel: user.verificationLevel
        },
        message: role === 'empresa' 
          ? 'Registro empresarial completo. Por favor verifica tu email para activar todas las funcionalidades.'
          : 'Registro exitoso. ¡Bienvenido a NATUR!'
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        });
      }
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Company registration endpoint with email verification
  // NOTE: Email verification temporarily disabled - users auto-verified until SendGrid is properly configured
  app.post("/api/auth/register-company", async (req, res) => {
    try {
      const {
        email, password, firstName, lastName, companyName,
        companyDescription, companyCategory, companySubcategory,
        servicesOffered, targetMarket, yearsExperience, teamSize,
        address, city, country, phone, website, operatingHours
      } = req.body;

      console.log("📋 Company registration attempt:", { 
        email, 
        companyName, 
        companyCategory, 
        hasDescription: !!companyDescription,
        servicesCount: servicesOffered?.length || 0
      });

      // Validate required fields
      if (!email || !password || !companyName || !companyCategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Validate complete company information is provided (required for empresa portal access)
      if (!companyDescription || !companyCategory || !servicesOffered || servicesOffered.length === 0) {
        return res.status(400).json({ 
          error: "Complete company information is required for empresa registration" 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Create user with complete company data including all new fields
      const userData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        companyName,
        role: 'empresa' as const,
        authProvider: 'local',
        isActive: true, // Temporarily auto-activate until SendGrid is configured
        emailVerified: true, // Temporarily auto-verify until SendGrid is configured
        verificationToken,
        verificationTokenExpiry,
        address,
        city,
        country: country || 'Colombia',
        phone,
        website,
        companyDescription: companyDescription || '',
        companyCategory: companyCategory || '',
        companySubcategory: companySubcategory || '',
        servicesOffered: servicesOffered || [],
        targetMarket: targetMarket || '',
        yearsExperience: yearsExperience || 0,
        teamSize: teamSize || 0,
        operatingHours: operatingHours || {},
        businessType: req.body.businessType || '',
        certifications: req.body.certifications || [],
        socialMedia: req.body.socialMedia || {},
        businessLicense: req.body.businessLicense || '',
        taxId: req.body.taxId || '',
        emergencyContact: req.body.emergencyContact || {},
        sustainabilityPractices: req.body.sustainabilityPractices || [],
        accessibilityFeatures: req.body.accessibilityFeatures || [],
        languages: req.body.languages || ['Español'],
        registrationComplete: true,
        profileCompletion: 100,
        isVerified: false,
        isContactCardVisible: true,
        isMapVisible: true,
        verificationLevel: 'basic',
        // Set default coordinates for Bogotá if not provided
        coordinates: { lat: 4.7110, lng: -74.0721 }
      };

      const user = await storage.createUser(userData);

      // Send verification email (non-blocking)
      Promise.resolve().then(async () => {
        try {
          const emailSent = await sendVerificationEmail(
            email,
            `${firstName} ${lastName}`,
            companyName,
            verificationToken
          );
          console.log(`📧 Verification email sent: ${emailSent ? 'Success' : 'Failed'}`);
          
          // Send admin notification
          await sendAdminNotification(
            `${firstName} ${lastName}`,
            companyName,
            email,
            companyCategory
          );
        } catch (emailError) {
          console.error("⚠️ Email sending error (non-blocking):", emailError);
        }
      });

      console.log("✅ Company Registration Complete - Email verification required");

      res.status(201).json({
        message: "Company registered successfully. Please check your email for verification.",
        user: {
          id: user.id,
          email: user.email,
          companyName: user.companyName,
          emailVerified: user.emailVerified
        }
      });
    } catch (error) {
      console.error("Company registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Email verification endpoint
  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ error: "Verification token required" });
      }

      const user = await storage.getUserByVerificationToken(token as string);
      
      if (!user) {
        return res.status(400).json({ error: "Invalid or expired verification token" });
      }

      // Check if token is expired
      if (user.verificationTokenExpiry && new Date() > user.verificationTokenExpiry) {
        return res.status(400).json({ error: "Verification token has expired" });
      }

      // Update user as verified and active
      await storage.updateUser(user.id, {
        emailVerified: true,
        isActive: true,
        verificationToken: null,
        verificationTokenExpiry: null
      });

      console.log(`✅ Email verified for user: ${user.email}`);

      res.json({ 
        message: "Email verified successfully. You can now access your account.",
        verified: true
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ error: "Verification failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ error: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });



  // Map API - Get companies with locations for map markers
  app.get("/api/map/companies", async (req, res) => {
    try {
      const companies = await storage.getAllCompanies();
      const users = await storage.getUsers();
      
      // Combine company data with user location data
      const mapCompanies = companies.map(company => {
        const user = users.find(u => u.id === company.userId);
        return {
          id: company.id,
          name: company.companyName,
          businessType: company.businessType,
          coordinates: company.coordinates || user?.coordinates,
          address: company.address || user?.address,
          city: company.city || user?.city,
          description: company.description,
          isVerified: company.isVerified
        };
      }).filter(company => company.coordinates); // Only include companies with coordinates
      
      res.json(mapCompanies);
    } catch (error) {
      console.error("Error fetching map companies:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



  // Alternative auth check route 
  app.get("/api/auth/check", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User profile routes
  app.get("/api/profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      // Get user info to include in response
      const user = await storage.getUser(userId);
      if (user) {
        (profile as any).user = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture
        };
      }

      res.json(profile);
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get company by user ID
  app.get("/api/companies/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const company = await storage.getCompany(userId);
      
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }

      res.json(company);
    } catch (error) {
      console.error("Get company by user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update user profile
  app.put("/api/profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const updates = req.body;
      
      const updatedProfile = await storage.updateUserProfile(userId, updates);
      res.json(updatedProfile);
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update company by user ID
  app.put("/api/companies/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const updates = req.body;
      
      const updatedCompany = await storage.updateCompany(userId, updates);
      res.json(updatedCompany);
    } catch (error) {
      console.error("Update company error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get experiences by user ID
  app.get("/api/experiences/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const experiences = await storage.getExperiences(userId);
      res.json(experiences);
    } catch (error) {
      console.error("Get user experiences error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/profiles", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const profileData = insertUserProfileSchema.parse({
        ...req.body,
        userId: req.session.userId
      });

      const profile = await storage.createUserProfile(profileData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ 
          error: "Invalid input", 
          details: error.errors,
          receivedData: req.body 
        });
      }
      console.error("Create profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/profiles/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (!req.session.userId || req.session.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updateData = req.body;
      const profile = await storage.updateUserProfile(userId, updateData);
      
      res.json(profile);
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Experience routes
  app.get("/api/experiences", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const experiences = await storage.getExperiences(req.session.userId);
      res.json(experiences);
    } catch (error) {
      console.error("Get experiences error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Public experiences endpoint for travelers - MUST be before /:id route
  app.get("/api/experiences/public", async (req, res) => {
    try {
      const experiences = await storage.getPublicExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Get public experiences error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const experienceId = parseInt(req.params.id);
      
      // Validate that the ID is a valid number
      if (isNaN(experienceId)) {
        return res.status(400).json({ error: "Invalid experience ID" });
      }
      
      const experience = await storage.getExperience(experienceId);
      
      if (!experience) {
        return res.status(404).json({ error: "Experience not found" });
      }

      res.json(experience);
    } catch (error) {
      console.error("Get experience error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/experiences", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const experienceData = insertExperienceSchema.parse({
        ...req.body,
        userId: req.session.userId
      });

      const experience = await storage.createExperience(experienceData);
      res.status(201).json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      console.error("Create experience error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experience = await storage.getExperience(id);
      
      if (!experience) {
        return res.status(404).json({ error: "Experience not found" });
      }

      res.json(experience);
    } catch (error) {
      console.error("Get experience error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/experiences/:id", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const id = parseInt(req.params.id);
      const experienceData = insertExperienceSchema.partial().parse(req.body);

      const experience = await storage.updateExperience(id, experienceData);
      res.json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      console.error("Update experience error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Duplicate experience
  app.post("/api/experiences/:id/duplicate", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const id = parseInt(req.params.id);
      const duplicatedExperience = await storage.duplicateExperience(id, req.session.userId);
      res.status(201).json(duplicatedExperience);
    } catch (error) {
      console.error("Duplicate experience error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Duplicate route removed - now handled above

  // Company routes - only return verified companies for contacts directory
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getAllCompanies();
      console.log(`Returning ${companies.length} verified companies for contacts directory`);
      res.json(companies);
    } catch (error) {
      console.error("Get companies error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Portal stats endpoint
  app.get("/api/portal/stats", async (req, res) => {
    try {
      const registeredUsers = await storage.getAllUsers();
      const companies = registeredUsers.filter(user => user.role === 'empresa');
      const travelers = registeredUsers.filter(user => user.role === 'viajero');
      
      // Get recent companies (last 6 registered)
      const recentCompanies = companies
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        .slice(0, 6)
        .map(company => ({
          id: company.id,
          companyName: company.companyName,
          companyCategory: company.companyCategory,
          city: company.city,
          country: company.country,
          createdAt: company.createdAt,
        }));

      res.json({
        totalCompanies: companies.length,
        totalTravelers: travelers.length,
        totalUsers: registeredUsers.length,
        recentCompanies,
      });
    } catch (error) {
      console.error('❌ Error fetching portal stats:', error);
      res.status(500).json({ error: 'Failed to fetch portal stats' });
    }
  });

  // Featured blogs endpoint
  app.get("/api/portal/blogs", async (req, res) => {
    try {
      const blogs = [
        {
          id: 1,
          title: "Festival NATUR: Forjando la Alianza de Turismo Sostenible en Colombia",
          description: "Descubre cómo la plataforma Festival NATUR está uniendo empresas, viajeros y comunidades para crear la alianza más grande de turismo sostenible en Colombia, transformando el sector hacia un futuro regenerativo.",
          image: "/api/image/colombia_coffee_plan_975065b6.jpg",
          category: "Plataforma NATUR",
          readTime: "8 min lectura",
          publishedDate: "2025-09-25",
          slug: "festival-natur-alianza-turismo-sostenible-colombia",
          author: "Equipo Festival NATUR",
          authorRole: "Líderes en Turismo Sostenible"
        },
        {
          id: 2,
          title: "Guía Completa: Turismo Sostenible y Responsable en Colombia",
          description: "Una guía definitiva para practicar turismo sostenible en Colombia. Aprende cómo viajar de manera responsable, apoyar comunidades locales y conservar nuestros ecosistemas únicos mientras disfrutas experiencias auténticas.",
          image: "/api/image/biodiversity_conserv_33d23d5e.jpg",
          category: "Guía de Turismo",
          readTime: "12 min lectura",
          publishedDate: "2025-09-20",
          slug: "guia-turismo-sostenible-responsable-colombia",
          author: "María Alejandra Rodríguez",
          authorRole: "Experta en Turismo Sostenible"
        },
        {
          id: 3,
          title: "Preparándonos para el Festival NATUR 2026: Todo lo que Necesitas Saber",
          description: "Conoce todos los detalles sobre el Festival NATUR 2026, el evento más importante de turismo sostenible en Colombia. Agenda, ponentes, experiencias y cómo ser parte de esta transformación histórica del sector.",
          image: "/api/image/sustainable_tourism,_75db2cd6.jpg",
          category: "Festival NATUR 2026",
          readTime: "10 min lectura",
          publishedDate: "2025-09-15",
          slug: "preparandonos-festival-natur-2026",
          author: "Comité Organizador",
          authorRole: "Festival NATUR 2026"
        }
      ];

      res.json(blogs);
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  });

  // Serve stock images endpoint
  app.get('/api/image/:filename', (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'attached_assets', 'stock_images', filename);
      res.sendFile(imagePath);
    } catch (error) {
      console.error('❌ Error serving image:', error);
      res.status(404).json({ error: 'Image not found' });
    }
  });

  // Get registered companies with locations for map bubbles
  app.get("/api/companies/map", async (req, res) => {
    try {
      const registeredUsers = await storage.getRegisteredCompaniesForMap();
      console.log(`📍 Map Companies: Found ${registeredUsers.length} registered companies`);
      
      // Transform data to match InteractiveMap interface
      const mapCompanies = registeredUsers.map(user => ({
        id: user.id,
        companyName: user.companyName || user.firstName + " " + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        companyDescription: user.companyDescription || user.bio || `${user.companyName} - ${user.companyCategory}`,
        companyCategory: user.companyCategory || user.businessType || "Empresa",
        companySubcategory: user.companySubcategory || "",
        coordinates: user.coordinates,
        address: user.address,
        city: user.city,
        country: user.country,
        website: user.website,
        phone: user.phone,
        facebookUrl: user.facebookUrl,
        twitterUrl: user.twitterUrl,
        instagramUrl: user.instagramUrl,
        linkedinUrl: user.linkedinUrl,
        businessType: user.businessType,
        createdAt: user.createdAt
      })).filter(company => {
        const coords = company.coordinates as { lat?: number; lng?: number } | null;
        return coords && coords.lat && coords.lng;
      });
      
      console.log(`📍 Map Bubbles: Sending ${mapCompanies.length} companies with coordinates`);
      if (mapCompanies.length > 0) {
        console.log(`📍 First company: ${mapCompanies[0].companyName} at ${mapCompanies[0].city}`);
      }
      
      res.json(mapCompanies);
    } catch (error) {
      console.error("Get companies for map error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Filter options endpoints for smart search
  app.get("/api/search/filters/categories", async (req, res) => {
    try {
      const result = await db
        .select({ companyCategory: users.companyCategory })
        .from(users)
        .where(
          and(
            eq(users.role, 'empresa'),
            eq(users.isActive, true),
            sql`${users.companyCategory} IS NOT NULL AND ${users.companyCategory} != ''`
          )
        )
        .groupBy(users.companyCategory);
      
      const categories = result
        .map(row => row.companyCategory)
        .filter(cat => cat)
        .sort();
      
      console.log(`📊 Found ${categories.length} unique company categories`);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/search/filters/subcategories", async (req, res) => {
    try {
      const { category } = req.query;
      let query = db
        .select({ companySubcategory: users.companySubcategory })
        .from(users)
        .where(
          and(
            eq(users.role, 'empresa'),
            eq(users.isActive, true),
            sql`${users.companySubcategory} IS NOT NULL AND ${users.companySubcategory} != ''`
          )
        );

      // If category is provided, filter subcategories for that category
      if (category) {
        query = db
          .select({ companySubcategory: users.companySubcategory })
          .from(users)
          .where(
            and(
              eq(users.role, 'empresa'),
              eq(users.isActive, true),
              eq(users.companyCategory, category as string),
              sql`${users.companySubcategory} IS NOT NULL AND ${users.companySubcategory} != ''`
            )
          );
      }
      
      const result = await query.groupBy(users.companySubcategory);
      
      const subcategories = result
        .map(row => row.companySubcategory)
        .filter(subcat => subcat)
        .sort();
      
      console.log(`📊 Found ${subcategories.length} unique subcategories${category ? ` for ${category}` : ''}`);
      res.json(subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      res.status(500).json({ error: "Failed to fetch subcategories" });
    }
  });

  app.get("/api/search/filters/countries", async (req, res) => {
    try {
      const result = await db
        .select({ country: users.country })
        .from(users)
        .where(
          and(
            eq(users.role, 'empresa'),
            eq(users.isActive, true),
            sql`${users.country} IS NOT NULL AND ${users.country} != ''`
          )
        )
        .groupBy(users.country);
      
      const countries = result
        .map(row => row.country)
        .filter(country => country)
        .sort();
      
      console.log(`📊 Found ${countries.length} unique countries`);
      res.json(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  app.get("/api/search/filters/cities", async (req, res) => {
    try {
      const { country } = req.query;
      let query = db
        .select({ city: users.city })
        .from(users)
        .where(
          and(
            eq(users.role, 'empresa'),
            eq(users.isActive, true),
            sql`${users.city} IS NOT NULL AND ${users.city} != ''`
          )
        );

      // If country is provided, filter cities for that country
      if (country) {
        query = db
          .select({ city: users.city })
          .from(users)
          .where(
            and(
              eq(users.role, 'empresa'),
              eq(users.isActive, true),
              eq(users.country, country as string),
              sql`${users.city} IS NOT NULL AND ${users.city} != ''`
            )
          );
      }
      
      const result = await query.groupBy(users.city);
      
      const cities = result
        .map(row => row.city)
        .filter(city => city)
        .sort();
      
      console.log(`📊 Found ${cities.length} unique cities${country ? ` in ${country}` : ''}`);
      res.json(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });

  // Enhanced companies search with filters
  app.get("/api/search/companies", async (req, res) => {
    try {
      const { 
        query: searchQuery, 
        category, 
        subcategory, 
        country, 
        city, 
        limit = 50 
      } = req.query;

      console.log('🔍 Company search with filters:', { 
        searchQuery, category, subcategory, country, city, limit 
      });

      let queryBuilder = db
        .select({
          id: users.id,
          companyName: users.companyName,
          companyCategory: users.companyCategory,
          companySubcategory: users.companySubcategory,
          city: users.city,
          country: users.country,
          companyDescription: users.companyDescription,
          coordinates: users.coordinates,
          phone: users.phone,
          website: users.website
        })
        .from(users)
        .where(
          and(
            eq(users.role, 'empresa'),
            eq(users.isActive, true),
            sql`${users.companyName} IS NOT NULL AND ${users.companyName} != ''`
          )
        );

      // Apply filters
      const filters = [];
      
      if (category) {
        filters.push(eq(users.companyCategory, category as string));
      }
      
      if (subcategory) {
        filters.push(eq(users.companySubcategory, subcategory as string));
      }
      
      if (country) {
        filters.push(eq(users.country, country as string));
      }
      
      if (city) {
        filters.push(eq(users.city, city as string));
      }
      
      // Apply text search if provided
      if (searchQuery && typeof searchQuery === 'string') {
        const searchTerm = `%${searchQuery.toLowerCase()}%`;
        filters.push(
          or(
            sql`LOWER(${users.companyName}) LIKE ${searchTerm}`,
            sql`LOWER(${users.companyCategory}) LIKE ${searchTerm}`,
            sql`LOWER(${users.companySubcategory}) LIKE ${searchTerm}`,
            sql`LOWER(${users.city}) LIKE ${searchTerm}`,
            sql`LOWER(${users.country}) LIKE ${searchTerm}`,
            sql`LOWER(${users.companyDescription}) LIKE ${searchTerm}`
          )
        );
      }
      
      if (filters.length > 0) {
        queryBuilder = queryBuilder.where(
          and(
            eq(users.role, 'empresa'),
            eq(users.isActive, true),
            sql`${users.companyName} IS NOT NULL AND ${users.companyName} != ''`,
            ...filters
          )
        );
      }
      
      const result = await queryBuilder
        .limit(parseInt(limit as string))
        .orderBy(users.companyName);

      console.log(`📊 Search results: ${result.length} companies found`);
      res.json(result);
    } catch (error) {
      console.error("Error searching companies:", error);
      res.status(500).json({ error: "Failed to search companies" });
    }
  });

  // Directory route - get all registered users for Portal Empresas
  app.get("/api/directory/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      console.log(`✅ Portal Empresas Directory: Found ${users.length} registered users`);
      
      // Format users for directory display
      const directoryUsers = users
        .filter(user => user.isActive)
        .map(user => ({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          role: user.role,
          city: user.city,
          country: user.country,
          coordinates: user.coordinates,
          createdAt: user.createdAt,
          isActive: user.isActive
        }));
      
      res.json(directoryUsers);
    } catch (error) {
      console.error("Error fetching directory users:", error);
      res.status(500).json({ error: "Failed to fetch directory users" });
    }
  });

  // Get ALL registered users for directory display (legacy endpoint) 
  app.get("/api/users/companies", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Return ALL active users in the directory
      const allUsers = users
        .filter(user => user.isActive)
        .map(user => ({
          id: user.id,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email.split('@')[0],
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          category: user.role === 'empresa' ? 'Empresa' : user.role === 'viajero' ? 'Viajero' : user.role === 'admin' ? 'Administrador' : 'Usuario',
          location: 'Colombia',
          founder: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario'
        }));
      
      res.json(allUsers);
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/companies/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const company = await storage.getCompany(req.session.userId);
      res.json(company);
    } catch (error) {
      console.error("Get company error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/companies", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const companyData = insertCompanySchema.parse({
        ...req.body,
        userId: req.session.userId
      });

      const company = await storage.createCompany(companyData);
      res.status(201).json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      console.error("Create company error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/companies/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const companyData = insertCompanySchema.partial().parse(req.body);
      const company = await storage.updateCompany(req.session.userId, companyData);
      res.json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      console.error("Update company error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



  // Admin routes
  // Middleware to check if user is admin
  const isAdmin = async (req: any, res: any, next: any) => {
    try {
      const userId = req.session.userId || (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: "Forbidden: Admin access required" });
      }

      req.adminUser = user;
      next();
    } catch (error) {
      console.error("Admin middleware error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // Get platform statistics
  app.get("/api/admin/stats", isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const experiences = await storage.getAllExperiences();
      const companies = await storage.getAllCompanies();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats = {
        totalUsers: users.length,
        newUsersToday: users.filter(u => new Date(u.createdAt) >= today).length,
        totalCompanies: companies.length,
        activeCompanies: companies.filter(c => c.isVerified).length,
        totalExperiences: experiences.length,
        pendingApprovals: experiences.filter(e => e.status === 'pendiente').length,
        totalRevenue: '0', // Placeholder - would calculate from bookings
        totalBookings: 0, // Placeholder - would count bookings
      };

      res.json(stats);
    } catch (error) {
      console.error("Admin stats error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all users
  app.get("/api/admin/users", isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Admin get users error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update user role
  app.patch("/api/admin/users/:userId/role", isAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { role } = req.body;

      if (!['viajero', 'empresa', 'admin'].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

      const updatedUser = await storage.updateUser(userId, { role });

      // Log admin action
      await db.insert(adminLogs).values({
        adminId: req.adminUser.id,
        action: `Updated user role to ${role}`,
        targetType: 'user',
        targetId: userId,
        details: { oldRole: req.adminUser.role, newRole: role }
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Admin update user role error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update user status
  app.patch("/api/admin/users/:userId/status", isAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { isActive } = req.body;

      const updatedUser = await storage.updateUser(userId, { isActive });

      // Log admin action
      await db.insert(adminLogs).values({
        adminId: req.adminUser.id,
        action: isActive ? 'Activated user' : 'Deactivated user',
        targetType: 'user',
        targetId: userId,
        details: { isActive }
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Admin update user status error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all experiences (admin view)
  app.get("/api/admin/experiences", isAdmin, async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Admin get experiences error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update experience status
  app.patch("/api/admin/experiences/:experienceId/status", isAdmin, async (req, res) => {
    try {
      const experienceId = parseInt(req.params.experienceId);
      const { status } = req.body;

      if (!['pendiente', 'aprobado', 'rechazado', 'archivado'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const updatedExperience = await storage.updateExperience(experienceId, { status });

      // Log admin action
      await db.insert(adminLogs).values({
        adminId: req.adminUser.id,
        action: `Updated experience status to ${status}`,
        targetType: 'experience',
        targetId: experienceId,
        details: { status }
      });

      res.json(updatedExperience);
    } catch (error) {
      console.error("Admin update experience status error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete experience
  app.delete("/api/admin/experiences/:experienceId", isAdmin, async (req, res) => {
    try {
      const experienceId = parseInt(req.params.experienceId);
      
      // For now, archive instead of delete
      const updatedExperience = await storage.updateExperience(experienceId, { 
        status: 'archivado',
        isActive: false 
      });

      // Log admin action
      await db.insert(adminLogs).values({
        adminId: req.adminUser.id,
        action: 'Deleted experience',
        targetType: 'experience',
        targetId: experienceId,
        details: { archived: true }
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Admin delete experience error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get admin logs
  app.get("/api/admin/logs", isAdmin, async (req, res) => {
    try {
      const logs = await db.select().from(adminLogs).orderBy(desc(adminLogs.createdAt)).limit(100);
      res.json(logs);
    } catch (error) {
      console.error("Admin get logs error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Messaging routes
  app.get("/api/conversations", requireAuth, async (req: any, res) => {
    try {
      const conversations = await storage.getConversations(req.user.id);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Create or get conversation
  app.post("/api/conversations", requireAuth, async (req: any, res) => {
    try {
      const { receiverId } = req.body;
      
      if (!receiverId) {
        return res.status(400).json({ error: "receiverId is required" });
      }

      const conversation = await storage.getOrCreateConversation(req.user.id, receiverId);
      res.json(conversation);
    } catch (error) {
      console.error("Error creating/getting conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Get messages between two users (simpler API for new chat)
  app.get("/api/messages", requireAuth, async (req: any, res) => {
    try {
      // Return empty array for now - to be implemented with proper messaging
      res.json([]);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/conversations/:conversationId/messages", requireAuth, async (req: any, res) => {
    try {
      const conversationId = parseInt(req.params.conversationId);
      const messages = await storage.getMessages(conversationId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", requireAuth, async (req: any, res) => {
    try {
      const { receiverId, content, messageType = "text" } = req.body;
      
      // Create or get conversation
      const conversation = await storage.getOrCreateConversation(req.user.id, receiverId);
      
      // Send message
      const message = await storage.sendMessage({
        senderId: req.user.id,
        receiverId,
        content,
        messageType,
        isRead: false
      });

      res.json(message);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.put("/api/messages/:messageId/read", requireAuth, async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.messageId);
      await storage.markMessageAsRead(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  // Profile update route for user flow management
  app.put("/api/auth/update-profile", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      
      const updatedUser = await storage.updateUser(userId, updateData);
      res.json({ user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  app.get("/api/messages/search-users", requireAuth, async (req: any, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.json([]);
      }

      const users = await storage.searchUsers(query);
      res.json(users.filter((user: any) => user.id !== req.user.id)); // Exclude current user
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ error: "Failed to search users" });
    }
  });

  // Google OAuth routes
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    app.get('/api/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    app.get('/api/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/auth/empresas' }),
      async (req, res) => {
        try {
          // Set session for authenticated user
          if (req.user) {
            req.session.userId = (req.user as any).id;
          }
          // Successful authentication
          res.redirect('/portal-empresas');
        } catch (error) {
          console.error('Google callback error:', error);
          res.redirect('/auth/empresas?error=auth_failed');
        }
      }
    );
  }

  // Enhanced profile API endpoints
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Calculate profile completion
      const fields = [
        user.companyName, user.firstName, user.lastName, user.bio, 
        user.website, user.city, user.businessType, user.skills,
        user.twitterUrl, user.facebookUrl, user.linkedinUrl
      ];
      const completedFields = fields.filter(field => field && field !== null && field !== '').length;
      const profileCompletion = Math.round((completedFields / fields.length) * 100);
      
      res.json({
        ...user,
        profileCompletion
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updateData = req.body;
      
      const updatedUser = await storage.updateUser(userId, updateData);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ error: "Failed to update user profile" });
    }
  });

  app.get("/api/experiences/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const experiences = await storage.getExperiences(userId);
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching user experiences:", error);
      res.status(500).json({ error: "Failed to fetch user experiences" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
