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
  registrationComplete: boolean("registration_complete").default(false),
  // Profile completion and verification
  profileCompletion: integer("profile_completion").default(0),
  isVerified: boolean("is_verified").default(false),
  // Auto-generated contact card visibility
  isContactCardVisible: boolean("is_contact_card_visible").default(true),
  isMapVisible: boolean("is_map_visible").default(true),
  // Messaging configuration fields
  messagingEnabled: boolean("messaging_enabled").default(true),
  messagingBio: text("messaging_bio"),
  acceptsInquiries: boolean("accepts_inquiries").default(true),
  responseTimeHours: integer("response_time_hours").default(24),
  // Experience creation setup fields
  experienceSetupComplete: boolean("experience_setup_complete").default(false),
  defaultExperienceCategory: text("default_experience_category"),
  defaultMeetingPoint: text("default_meeting_point"),
  defaultCancellationPolicy: text("default_cancellation_policy"),
  // Verification levels
  verificationLevel: text("verification_level").default("basic"), // basic, verified, certified, premium
  
  // Complete registration fields
  acceptTerms: boolean("accept_terms").default(false),
  
  // Payment configuration
  paymentMethods: text("payment_methods").default("[]"),
  invoiceEmail: text("invoice_email").default(""),
  taxInformation: text("tax_information").default(""),
  
  // Notification preferences
  emailNotifications: boolean("email_notifications").default(true),
  smsNotifications: boolean("sms_notifications").default(false),
  marketingEmails: boolean("marketing_emails").default(true),
  
  // Security settings
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  loginNotifications: boolean("login_notifications").default(true),
  
  // API settings
  apiAccess: boolean("api_access").default(false),
  webhookUrl: text("webhook_url").default(""),
  
  // Final configuration
  setupComplete: boolean("setup_complete").default(false),
  
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

// Experiences table - for companies to create experiences/tours
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  
  // Basic Information
  title: text("title").notNull(),
  modality: text("modality"),
  type: text("type").notNull().default("regular"), // regular, shared, private
  location: jsonb("location"), // { lat, lng, address, city, region }
  
  // Pricing (stored as strings to handle currency formatting)
  adultPriceNet: text("adult_price_net"),
  adultPricePvp: text("adult_price_pvp"),
  childPriceNet: text("child_price_net"),
  childPricePvp: text("child_price_pvp"),
  seniorPriceNet: text("senior_price_net"),
  seniorPricePvp: text("senior_price_pvp"),
  commission: text("commission").default("25"),
  
  // Tour Details
  description: text("description"),
  duration: text("duration"),
  included: text("included"),
  notIncluded: text("not_included"),
  
  // Operation Details
  operationDays: text("operation_days"),
  operationHours: text("operation_hours"),
  meetingPoint: text("meeting_point"),
  hotelTransfer: boolean("hotel_transfer").default(false),
  cutOff: text("cut_off").default("12"),
  minimumPeople: text("minimum_people"),
  
  // Accessibility & Requirements
  wheelchairAccessible: text("wheelchair_accessible").default("no"),
  petsAllowed: boolean("pets_allowed").default(false),
  minimumAge: text("minimum_age"),
  closedDays: text("closed_days"),
  
  // Additional Info
  foodIncluded: boolean("food_included").default(false),
  foodDetails: text("food_details"),
  activeTourismData: jsonb("active_tourism_data"), // distance, altitude, difficulty, restrictions
  
  // Policies
  cancellationPolicy: text("cancellation_policy"),
  voucherInfo: text("voucher_info"),
  faqs: text("faqs"),
  additionalQuestions: text("additional_questions"),
  
  // Languages & Guide
  languages: text("languages").array(),
  guideType: text("guide_type"),
  
  // Passenger Data Required
  passengerDataRequired: jsonb("passenger_data_required"),
  
  // Category and subcategory
  category: experienceCategoryEnum("category").notNull(),
  subcategory: text("subcategory"), // Specific subcategories within main category
  
  // Status and metadata
  status: experienceStatusEnum("status").default("pendiente"),
  isActive: boolean("is_active").default(true),
  
  // Map visibility for travelers
  isVisibleOnTravelerMap: boolean("is_visible_on_traveler_map").default(true),
  
  // Statistics
  viewCount: integer("view_count").default(0),
  rating: integer("rating").default(0), // 1-5 stars
  totalReviews: integer("total_reviews").default(0),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  // Make arrays optional and allow empty arrays
  languages: z.array(z.string()).optional().nullable(),
  // Make optional fields explicitly partial
  modality: z.string().optional().nullable(),
  adultPriceNet: z.string().optional().nullable(),
  adultPricePvp: z.string().optional().nullable(),
  childPriceNet: z.string().optional().nullable(),
  childPricePvp: z.string().optional().nullable(),
  seniorPriceNet: z.string().optional().nullable(),
  seniorPricePvp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  included: z.string().optional().nullable(),
  notIncluded: z.string().optional().nullable(),
  operationDays: z.string().optional().nullable(),
  operationHours: z.string().optional().nullable(),
  meetingPoint: z.string().optional().nullable(),
  minimumPeople: z.string().optional().nullable(),
  minimumAge: z.string().optional().nullable(),
  closedDays: z.string().optional().nullable(),
  foodDetails: z.string().optional().nullable(),
  cancellationPolicy: z.string().optional().nullable(),
  voucherInfo: z.string().optional().nullable(),
  faqs: z.string().optional().nullable(),
  additionalQuestions: z.string().optional().nullable(),
  guideType: z.string().optional().nullable(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

// Conversations table - to group messages between users (defined first)
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  participant1Id: integer("participant1_id").references(() => users.id).notNull(),
  participant2Id: integer("participant2_id").references(() => users.id).notNull(),
  lastMessageId: integer("last_message_id"), // Will add reference after messages table
  lastActivity: timestamp("last_activity").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Messages table - for communication between users (matches actual database structure)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id).notNull(),
  receiverId: integer("receiver_id").references(() => users.id).notNull(),
  experienceId: integer("experience_id").references(() => experiences.id), // Optional reference to experience
  subject: text("subject"),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  messageType: text("message_type").default("direct"), // direct, inquiry, booking
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Company profiles table - for business-specific information
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  companyName: text("company_name").notNull(),
  businessType: text("business_type"), // tour_operator, hotel, restaurant, etc.
  description: text("description"),
  website: text("website"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  department: text("department"),
  country: text("country").default("Colombia"),
  coordinates: jsonb("coordinates"), // {lat, lng}
  certifications: text("certifications").array(),
  services: text("services").array(),
  logo: text("logo"),
  coverImage: text("cover_image"),
  isVerified: boolean("is_verified").default(false),
  rating: integer("rating").default(0),
  totalReviews: integer("total_reviews").default(0),
  status: text("status").default("active"), // active, inactive, suspended
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
}).extend({
  // Make optional fields explicitly partial
  subject: z.string().optional().nullable(),
  experienceId: z.number().optional().nullable(),
  isRead: z.boolean().optional(),
  messageType: z.string().optional().nullable(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  lastActivity: true,
}).extend({
  lastMessageId: z.number().optional().nullable(),
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  businessType: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  certifications: z.array(z.string()).optional().nullable(),
  services: z.array(z.string()).optional().nullable(),
  logo: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
});

// Admin activity logs table
export const adminLogs = pgTable("admin_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => users.id).notNull(),
  action: text("action").notNull(), // approve_experience, reject_experience, delete_user, etc.
  targetType: text("target_type").notNull(), // experience, user, company
  targetId: integer("target_id").notNull(),
  details: jsonb("details"), // Additional action details
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Platform statistics table
export const platformStats = pgTable("platform_stats", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  totalUsers: integer("total_users").default(0),
  totalCompanies: integer("total_companies").default(0),
  totalExperiences: integer("total_experiences").default(0),
  totalBookings: integer("total_bookings").default(0),
  totalRevenue: text("total_revenue").default("0"),
  activeUsers: integer("active_users").default(0),
  newUsersToday: integer("new_users_today").default(0),
  pendingApprovals: integer("pending_approvals").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  experienceId: integer("experience_id").references(() => experiences.id).notNull(),
  companyId: integer("company_id").references(() => companies.id),
  bookingDate: timestamp("booking_date").notNull(),
  experienceDate: timestamp("experience_date").notNull(),
  adults: integer("adults").default(1),
  children: integer("children").default(0),
  infants: integer("infants").default(0),
  totalPrice: text("total_price").notNull(),
  status: text("status").default("pending"), // pending, confirmed, cancelled, completed
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status").default("pending"), // pending, paid, refunded
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;
export type InsertAdminLog = typeof adminLogs.$inferInsert;
export type AdminLog = typeof adminLogs.$inferSelect;
export type InsertPlatformStat = typeof platformStats.$inferInsert;
export type PlatformStat = typeof platformStats.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
