import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - main authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password"), // Make optional for OAuth users
  googleId: text("google_id").unique(), // For Google OAuth
  firstName: text("first_name"),
  lastName: text("last_name"),
  profilePicture: text("profile_picture"),
  authProvider: text("auth_provider").notNull().default("local"), // 'local' or 'google'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User profiles table - detailed profile information
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  fullName: text("full_name"), // Make optional for flexibility
  userCategory: text("user_category").notNull(), // startup, investor, mentor, etc.
  subcategory: text("subcategory"),
  
  // Contact info
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  website: text("website"),
  linkedin: text("linkedin"),
  
  // Profile content
  bio: text("bio"),
  description: text("description"),
  
  // Startup specific fields
  startupName: text("startup_name"),
  foundingYear: integer("founding_year"),
  stage: text("stage"), // idea, mvp, growth, etc.
  sector: text("sector"),
  teamSize: integer("team_size"),
  fundingNeeded: text("funding_needed"),
  currentRevenue: text("current_revenue"),
  
  // Investor specific fields
  investmentFocus: text("investment_focus").array(),
  investmentRange: text("investment_range"),
  portfolioSize: integer("portfolio_size"),
  
  // Mentor specific fields  
  expertise: text("expertise").array(),
  experience: text("experience"),
  mentorshipType: text("mentorship_type").array(),
  
  // Support needed/offered
  supportNeeded: jsonb("support_needed"),
  supportOffered: jsonb("support_offered"),
  
  // Skills and interests
  skills: text("skills").array(),
  interests: text("interests").array(),
  
  // Location
  country: text("country"),
  city: text("city"),
  
  // Profile completion and visibility
  isProfileComplete: boolean("is_profile_complete").default(false),
  isPublic: boolean("is_public").default(true),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().optional(), // Make password optional for OAuth users
  googleId: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  profilePicture: z.string().optional().nullable(),
  authProvider: z.string().default("local"),
});

export const insertGoogleUserSchema = createInsertSchema(users).pick({
  email: true,
  googleId: true,
  firstName: true,
  lastName: true,
  profilePicture: true,
}).extend({
  authProvider: z.literal("google"),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  // Make arrays optional and allow empty arrays  
  investmentFocus: z.array(z.string()).optional().nullable(),
  expertise: z.array(z.string()).optional().nullable(),
  mentorshipType: z.array(z.string()).optional().nullable(),
  skills: z.array(z.string()).optional().nullable(),
  interests: z.array(z.string()).optional().nullable(),
  // Make all numeric fields optional
  foundingYear: z.number().optional().nullable(),
  teamSize: z.number().optional().nullable(),
  portfolioSize: z.number().optional().nullable(),
  // Make optional fields explicitly partial
  fullName: z.string().optional(),
  subcategory: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
