import type { Express } from "express";
import { createServer, type Server } from "http";

import { storage } from "./storage";
import { db } from "./db";
import { insertUserSchema, insertUserProfileSchema, insertExperienceSchema, insertCompanySchema, adminLogs } from "@shared/schema";
import { z } from "zod";
import passport from 'passport';
import { setupGoogleAuth } from './googleAuth';
import { desc, eq, and, or } from "drizzle-orm";

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

  // Authentication routes
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

      // Return user in the expected format with user property
      res.json({ 
        user: { 
          id: user.id, 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          authProvider: user.authProvider,
          role: user.role
        } 
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
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
      if (!user || user.password !== password) {
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
      const coordinates = req.body.coordinates || req.body.location;
      const address = req.body.address || '';
      const city = req.body.city || 'Bogotá';
      
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
        coordinates
      });
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await storage.createUser(userData);
      
      // For empresa users, create company profile automatically to activate all portal features
      if (role === 'empresa') {
        try {
          await storage.createCompany({
            userId: user.id,
            companyName: userData.companyName || `${user.firstName} ${user.lastName}`,
            businessType: req.body.businessType || 'tourism',
            description: req.body.description || `${userData.companyName} - Empresa registrada en Festival NATUR`,
            address: userData.address || '',
            city: userData.city || 'Bogotá',
            country: userData.country || 'Colombia',
            coordinates: userData.coordinates || { lat: 4.6097, lng: -74.0817 },
            phone: req.body.phone || '',
            website: req.body.website || '',
            isVerified: true,

          });
          
          console.log("✅ Portal Empresas Registration Complete - All Features Activated:");
          console.log("1. ✅ Contact card created in directory");
          console.log("2. 📍 Map location set with coordinates");
          console.log("3. 💬 Messaging system enabled");
          console.log("4. ✨ Experience creation available");
          console.log("5. 👤 Automatic profile generated");
          console.log("6. 🧭 Name visible in navigation menu");
          console.log("7. ⚙️ Settings panel functional");
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
          coordinates: user.coordinates
        },
        message: `Registration successful. ${role === 'empresa' ? 'All portal functionalities activated.' : 'Welcome to NATUR!'}`
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
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
