# Festival NATUR - Backend Files Export

## 📁 shared/schema.ts

```typescript
import { pgTable, text, serial, integer, boolean, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User role enum
export const userRoleEnum = pgEnum("user_role", ["viajero", "empresa", "admin"]);

// Experience category enum
export const experienceCategoryEnum = pgEnum("experience_category", [
  "aventura",
  "naturaleza",
  "cultura",
  "gastronomia",
  "bienestar",
  "educacion",
  "rural",
  "ecoturismo"
]);

// Experience status enum
export const experienceStatusEnum = pgEnum("experience_status", ["pendiente", "aprobado", "rechazado", "archivado"]);

// Users table - main authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password"), // Make optional for OAuth users
  googleId: text("google_id").unique(), // For Google OAuth
  firstName: text("first_name"),
  lastName: text("last_name"),
  companyName: text("company_name"), // For business users
  profilePicture: text("profile_picture"),
  authProvider: text("auth_provider").notNull().default("local"), // 'local' or 'google'
  role: userRoleEnum("role").default("viajero").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  verificationToken: text("verification_token"), // For email verification
  verificationTokenExpiry: timestamp("verification_token_expiry"),
  
  // Additional business registration fields
  businessLicense: text("business_license"),
  taxId: text("tax_id"),
  certifications: text("certifications").array(),
  socialMedia: jsonb("social_media"),
  emergencyContact: jsonb("emergency_contact"),
  sustainabilityPractices: text("sustainability_practices").array(),
  accessibilityFeatures: text("accessibility_features").array(),
  languages: text("languages").array(),
  // Location fields for map positioning
  address: text("address"),
  city: text("city"),
  country: text("country").default("Colombia"),
  coordinates: jsonb("coordinates"), // {lat, lng}
  // Contact information
  phone: text("phone"),
  website: text("website"),
  // Social media links for enhanced profile
  twitterUrl: text("twitter_url"),
  facebookUrl: text("facebook_url"),
  linkedinUrl: text("linkedin_url"),
  instagramUrl: text("instagram_url"),
  // Professional information
  bio: text("bio"),
  skills: jsonb("skills"), // Array of skills
  interests: jsonb("interests"), // Array of interests
  businessType: text("business_type"),
  yearsExperience: integer("years_experience"),
  teamSize: integer("team_size"),
  // Enhanced company fields for complete registration
  companyDescription: text("company_description"),
  companyCategory: text("company_category"), // Main business category
  companySubcategory: text("company_subcategory"), // Specific subcategory
  servicesOffered: jsonb("services_offered"), // Array of services
  operatingHours: jsonb("operating_hours"), // Business hours
  targetMarket: text("target_market"),
  // Progress tracking fields
  registrationComplete: boolean("registration_complete").default(false).notNull(),
  profileCompletion: integer("profile_completion").default(0).notNull(), // Percentage
  verificationLevel: text("verification_level").default("basic").notNull(), // basic, verified, certified, premium
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User profiles table (for extended user information)
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  publicProfile: boolean("public_profile").default(false).notNull(),
  preferredLanguage: text("preferred_language").default("es").notNull(),
  timezone: text("timezone").default("America/Bogota").notNull(),
  profileViews: integer("profile_views").default(0).notNull(),
  lastLoginAt: timestamp("last_login_at"),
  profileSettings: jsonb("profile_settings"),
  notificationPreferences: jsonb("notification_preferences"),
  privacySettings: jsonb("privacy_settings"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Companies table (for business profiles)
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  legalName: text("legal_name").notNull(),
  tradeName: text("trade_name"),
  businessRegistrationNumber: text("business_registration_number"),
  vatNumber: text("vat_number"),
  businessType: text("business_type").notNull(),
  industryCategory: text("industry_category").notNull(),
  foundedYear: integer("founded_year"),
  employeeCount: integer("employee_count"),
  website: text("website"),
  headquarters: jsonb("headquarters"), // Address object
  branches: jsonb("branches"), // Array of branch addresses
  description: text("description"),
  mission: text("mission"),
  vision: text("vision"),
  values: jsonb("values"), // Array of company values
  certifications: jsonb("certifications"), // Array of certification objects
  awards: jsonb("awards"), // Array of award objects
  partnerships: jsonb("partnerships"), // Array of partnership objects
  socialImpact: text("social_impact"),
  environmentalPractices: jsonb("environmental_practices"),
  isVerified: boolean("is_verified").default(false).notNull(),
  verificationDocuments: jsonb("verification_documents"),
  businessMetrics: jsonb("business_metrics"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Experiences table (tourism offerings)
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  companyId: integer("company_id").references(() => companies.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  category: experienceCategoryEnum("category").notNull(),
  subcategory: text("subcategory"),
  difficulty: text("difficulty"), // Easy, Medium, Hard, Expert
  duration: text("duration"), // e.g., "2 hours", "Full day", "3 days"
  groupSize: jsonb("group_size"), // {min: number, max: number}
  ageRestrictions: jsonb("age_restrictions"), // {min: number, max: number}
  languages: text("languages").array(),
  location: jsonb("location"), // Full location object with coordinates
  meetingPoint: text("meeting_point"),
  whatIncludes: text("what_includes").array(),
  whatNotIncludes: text("what_not_includes").array(),
  requirements: text("requirements").array(),
  recommendations: text("recommendations").array(),
  sustainability: jsonb("sustainability"), // Sustainability features
  accessibility: jsonb("accessibility"), // Accessibility features
  cancellationPolicy: text("cancellation_policy"),
  images: text("images").array(),
  videos: text("videos").array(),
  pricing: jsonb("pricing"), // Complex pricing structure
  availability: jsonb("availability"), // Availability calendar
  seasonality: jsonb("seasonality"), // Seasonal information
  weather: jsonb("weather"), // Weather considerations
  equipment: jsonb("equipment"), // Equipment provided/required
  safetyMeasures: text("safety_measures").array(),
  certifications: text("certifications").array(),
  tags: text("tags").array(),
  rating: integer("rating").default(0),
  reviewCount: integer("review_count").default(0),
  bookingCount: integer("booking_count").default(0),
  viewCount: integer("view_count").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  status: experienceStatusEnum("status").default("pendiente").notNull(),
  adminNotes: text("admin_notes"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Experience categories table
export const experienceCategories = pgTable("experience_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Messages table (direct messaging system)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  receiverId: integer("receiver_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  conversationId: integer("conversation_id").references(() => conversations.id),
  content: text("content").notNull(),
  messageType: text("message_type").default("text").notNull(), // text, image, file
  attachments: jsonb("attachments"), // Array of attachment objects
  isRead: boolean("is_read").default(false).notNull(),
  readAt: timestamp("read_at"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  editedAt: timestamp("edited_at"),
  replyToId: integer("reply_to_id").references(() => messages.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Conversations table (conversation threads)
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  participantIds: integer("participant_ids").array().notNull(),
  title: text("title"),
  isGroup: boolean("is_group").default(false).notNull(),
  lastMessageId: integer("last_message_id").references(() => messages.id),
  lastMessageAt: timestamp("last_message_at"),
  isActive: boolean("is_active").default(true).notNull(),
  metadata: jsonb("metadata"), // Additional conversation data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin logs table
export const adminLogs = pgTable("admin_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => users.id).notNull(),
  action: text("action").notNull(),
  targetType: text("target_type"), // user, experience, company, etc.
  targetId: integer("target_id"),
  description: text("description"),
  metadata: jsonb("metadata"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User sessions table for tracking active sessions
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  sessionToken: text("session_token").notNull().unique(),
  deviceInfo: jsonb("device_info"),
  ipAddress: text("ip_address"),
  isActive: boolean("is_active").default(true).notNull(),
  lastActivityAt: timestamp("last_activity_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  readAt: true,
  editedAt: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastMessageAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type ExperienceCategory = typeof experienceCategories.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type AdminLog = typeof adminLogs.$inferSelect;
export type UserSession = typeof userSessions.$inferSelect;
```

## 📁 server/index.ts

```typescript
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// CORS middleware for cookie handling
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'festival-natur-secret-key-2025',
  resave: false,
  saveUninitialized: true, // Changed to true to ensure session cookie is set
  name: 'sessionId',
  cookie: {
    secure: false, // Set to false for development
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'lax', // Changed to lax for better compatibility
    domain: undefined // Let the browser determine the domain
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
```

## 📁 server/db.ts

```typescript
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Test database connection
pool.connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
```

¿Continúo con el siguiente archivo (server/routes.ts y server/storage.ts)?