import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from 'ws';
import { storage } from "./storage";
import { db } from "./db";
import { insertUserSchema, insertUserProfileSchema, insertExperienceSchema, insertMessageSchema, insertConversationSchema, insertCompanySchema, adminLogs, conversations } from "@shared/schema";
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
      
      const userData = insertUserSchema.parse({
        ...req.body,
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        role: role,
        isActive: true
      });
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await storage.createUser(userData);
      
      // Auto-login after registration
      req.session.userId = user.id;
      
      res.status(201).json({ user: { id: user.id, email: user.email, role: user.role } });
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
          authProvider: user.authProvider,
          role: user.role
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

  // Search users for messaging
  app.get("/api/messages/search-users", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { query } = req.query;
      
      // Get all users with role 'empresa' for B2B messaging
      const users = await storage.getAllUsers();
      const empresaUsers = users.filter(user => 
        user.role === 'empresa' && 
        user.id !== req.session.userId &&
        user.isActive
      );

      // Filter by search query if provided
      let filteredUsers = empresaUsers;
      if (query && typeof query === 'string') {
        const searchQuery = query.toLowerCase();
        filteredUsers = empresaUsers.filter(user => {
          const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
          const email = user.email.toLowerCase();
          return fullName.includes(searchQuery) || email.includes(searchQuery);
        });
      }

      // Return user info suitable for messaging
      const userResults = filteredUsers.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        role: user.role
      }));

      res.json(userResults);
    } catch (error) {
      console.error("Search users error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Enhanced conversations endpoint with user details
  app.get("/api/messages/conversations/enhanced", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const conversations = await storage.getConversations(req.session.userId);
      
      // Enhance conversations with user details
      const enhancedConversations = await Promise.all(
        conversations.map(async (conv) => {
          const otherUserId = conv.participant1Id === req.session.userId 
            ? conv.participant2Id 
            : conv.participant1Id;
          
          const otherUser = await storage.getUser(otherUserId);
          
          // Count unread messages
          const messages = await storage.getMessages(conv.id);
          const unreadCount = messages.filter(
            msg => msg.receiverId === req.session.userId && !msg.isRead
          ).length;
          
          return {
            ...conv,
            otherUser: otherUser ? {
              id: otherUser.id,
              email: otherUser.email,
              firstName: otherUser.firstName,
              lastName: otherUser.lastName,
              profilePicture: otherUser.profilePicture,
              isOnline: false, // Would need real-time tracking
              lastSeen: otherUser.updatedAt
            } : null,
            unreadCount
          };
        })
      );
      
      res.json(enhancedConversations);
    } catch (error) {
      console.error("Get enhanced conversations error:", error);
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

      // Check if conversation exists between these users
      const existingConversations = await storage.getConversations(req.session.userId);
      let conversation = existingConversations.find(conv => 
        (conv.participant1Id === req.session.userId && conv.participant2Id === req.body.receiverId) ||
        (conv.participant2Id === req.session.userId && conv.participant1Id === req.body.receiverId)
      );

      // Create conversation if it doesn't exist
      if (!conversation) {
        conversation = await storage.createConversation({
          participant1Id: req.session.userId,
          participant2Id: req.body.receiverId
        });
      }

      // Parse message data with conversationId
      const messageData = insertMessageSchema.parse({
        ...req.body,
        senderId: req.session.userId,
        conversationId: conversation.id
      });

      // Send the message
      const message = await storage.sendMessage(messageData);
      
      // Update conversation's last activity
      await db.update(conversations)
        .set({ 
          lastActivity: new Date(),
          lastMessageId: message.id 
        })
        .where(eq(conversations.id, conversation.id));

      // Broadcast to connected WebSocket clients
      if ((httpServer as any).broadcastMessage) {
        (httpServer as any).broadcastMessage(message, messageData.receiverId);
      }

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

  // Add WebSocket server for real-time messaging  
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store active connections by user ID
  const connectedUsers = new Map<number, WebSocket>();

  wss.on('connection', (ws: WebSocket, req) => {
    console.log('New WebSocket connection');
    
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message);
        
        if (data.type === 'authenticate') {
          // Store user connection
          connectedUsers.set(data.userId, ws);
          console.log(`User ${data.userId} connected via WebSocket`);
        } else if (data.type === 'typing') {
          // Forward typing indicator to recipient
          const recipientWs = connectedUsers.get(data.recipientId);
          if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
            recipientWs.send(JSON.stringify({
              type: 'typing',
              senderId: data.senderId,
              isTyping: data.isTyping
            }));
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      // Remove user from connected users
      for (const [userId, socket] of Array.from(connectedUsers.entries())) {
        if (socket === ws) {
          connectedUsers.delete(userId);
          console.log(`User ${userId} disconnected from WebSocket`);
          break;
        }
      }
    });
  });

  // Function to broadcast new messages to connected users
  const broadcastMessage = (message: any, recipientId: number) => {
    const recipientWs = connectedUsers.get(recipientId);
    if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
      recipientWs.send(JSON.stringify({
        type: 'new_message',
        message
      }));
    }
  };

  // Attach broadcast function to the server for use in routes
  (httpServer as any).broadcastMessage = broadcastMessage;

  return httpServer;
}
