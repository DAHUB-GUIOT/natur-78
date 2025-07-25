import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertUserProfileSchema, insertExperienceSchema, insertMessageSchema, insertConversationSchema, insertCompanySchema } from "@shared/schema";
import { z } from "zod";
import passport from 'passport';
import { setupGoogleAuth } from './googleAuth';

// Extend Express Request type to include session
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
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
      
      res.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await storage.createUser(userData);
      
      // Auto-login after registration
      req.session.userId = user.id;
      
      res.status(201).json({ user: { id: user.id, email: user.email } });
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

  app.get("/api/auth/me", async (req, res) => {
    try {
      // Support both session-based auth (Google OAuth) and custom session auth
      const userId = req.session.userId || (req.user as any)?.id;
      
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ 
        user: { 
          id: user.id, 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          authProvider: user.authProvider
        } 
      });
    } catch (error) {
      console.error("Get user error:", error);
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

  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const experienceId = parseInt(req.params.id);
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

  // Get all experiences (public)
  app.get("/api/experiences/public", async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Get all experiences error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Company routes
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Get companies error:", error);
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

  // Message routes
  app.get("/api/messages/conversations", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const conversations = await storage.getConversations(req.session.userId);
      res.json(conversations);
    } catch (error) {
      console.error("Get conversations error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/messages/:conversationId", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const conversationId = parseInt(req.params.conversationId);
      const messages = await storage.getMessages(conversationId);
      res.json(messages);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const messageData = insertMessageSchema.parse({
        ...req.body,
        senderId: req.session.userId
      });

      const message = await storage.sendMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      console.error("Send message error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/messages/:messageId/read", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const messageId = parseInt(req.params.messageId);
      await storage.markMessageAsRead(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Mark message as read error:", error);
      res.status(500).json({ error: "Internal server error" });
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

  const httpServer = createServer(app);

  return httpServer;
}
