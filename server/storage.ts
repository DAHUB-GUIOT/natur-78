import { users, userProfiles, experiences, type User, type InsertUser, type UserProfile, type InsertUserProfile, type Experience, type InsertExperience } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface with all CRUD methods needed
export interface IStorage {
  // User authentication methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createGoogleUser(userData: any): Promise<User>;
  
  // User profile methods
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile>;
  
  // Experience methods
  getExperiences(userId: number): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience>;
  getExperience(id: number): Promise<Experience | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProfiles: Map<number, UserProfile>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.googleId === googleId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      id,
      email: insertUser.email,
      password: insertUser.password || null,
      googleId: null,
      firstName: null,
      lastName: null,
      profilePicture: null,
      authProvider: "local",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createGoogleUser(userData: any): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      id,
      email: userData.email,
      password: null,
      googleId: userData.googleId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profilePicture: userData.profilePicture,
      authProvider: "google",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentId++;
    const profile: UserProfile = {
      ...insertProfile,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Set defaults for required fields not provided in insertProfile
      fullName: insertProfile.fullName ?? null,
      subcategory: insertProfile.subcategory ?? null,
      phone: insertProfile.phone ?? null,
      whatsapp: insertProfile.whatsapp ?? null,
      website: insertProfile.website ?? null,
      linkedin: insertProfile.linkedin ?? null,
      bio: insertProfile.bio ?? null,
      description: insertProfile.description ?? null,
      startupName: insertProfile.startupName ?? null,
      foundingYear: insertProfile.foundingYear ?? null,
      stage: insertProfile.stage ?? null,
      sector: insertProfile.sector ?? null,
      teamSize: insertProfile.teamSize ?? null,
      fundingNeeded: insertProfile.fundingNeeded ?? null,
      currentRevenue: insertProfile.currentRevenue ?? null,
      investmentFocus: insertProfile.investmentFocus ?? null,
      investmentRange: insertProfile.investmentRange ?? null,
      portfolioSize: insertProfile.portfolioSize ?? null,
      expertise: insertProfile.expertise ?? null,
      experience: insertProfile.experience ?? null,
      mentorshipType: insertProfile.mentorshipType ?? null,
      supportNeeded: insertProfile.supportNeeded ?? null,
      supportOffered: insertProfile.supportOffered ?? null,
      skills: insertProfile.skills ?? null,
      interests: insertProfile.interests ?? null,
      country: insertProfile.country ?? null,
      city: insertProfile.city ?? null,
      isProfileComplete: insertProfile.isProfileComplete ?? false,
      isPublic: insertProfile.isPublic ?? true
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async updateUserProfile(userId: number, updateData: Partial<InsertUserProfile>): Promise<UserProfile> {
    const existingProfile = await this.getUserProfile(userId);
    if (!existingProfile) {
      throw new Error('Profile not found');
    }
    
    const updatedProfile: UserProfile = {
      ...existingProfile,
      ...updateData,
      updatedAt: new Date()
    };
    
    this.userProfiles.set(existingProfile.id, updatedProfile);
    return updatedProfile;
  }

  // Experience methods (in-memory storage)
  async getExperiences(userId: number): Promise<Experience[]> {
    // Mock experiences for in-memory storage
    return [];
  }

  async createExperience(experienceData: InsertExperience): Promise<Experience> {
    const id = this.currentId++;
    const experience: Experience = {
      id,
      userId: experienceData.userId,
      title: experienceData.title,
      type: experienceData.type || "regular",
      status: experienceData.status || "draft",
      isActive: experienceData.isActive || true,
      modality: experienceData.modality || null,
      adultPriceNet: experienceData.adultPriceNet || null,
      adultPricePvp: experienceData.adultPricePvp || null,
      childPriceNet: experienceData.childPriceNet || null,
      childPricePvp: experienceData.childPricePvp || null,
      seniorPriceNet: experienceData.seniorPriceNet || null,
      seniorPricePvp: experienceData.seniorPricePvp || null,
      commission: experienceData.commission || "25",
      description: experienceData.description || null,
      duration: experienceData.duration || null,
      included: experienceData.included || null,
      notIncluded: experienceData.notIncluded || null,
      operationDays: experienceData.operationDays || null,
      operationHours: experienceData.operationHours || null,
      meetingPoint: experienceData.meetingPoint || null,
      hotelTransfer: experienceData.hotelTransfer || false,
      cutOff: experienceData.cutOff || "12",
      minimumPeople: experienceData.minimumPeople || null,
      wheelchairAccessible: experienceData.wheelchairAccessible || "no",
      petsAllowed: experienceData.petsAllowed || false,
      minimumAge: experienceData.minimumAge || null,
      closedDays: experienceData.closedDays || null,
      foodIncluded: experienceData.foodIncluded || false,
      foodDetails: experienceData.foodDetails || null,
      activeTourismData: experienceData.activeTourismData || null,
      cancellationPolicy: experienceData.cancellationPolicy || null,
      voucherInfo: experienceData.voucherInfo || null,
      faqs: experienceData.faqs || null,
      additionalQuestions: experienceData.additionalQuestions || null,
      languages: experienceData.languages || null,
      guideType: experienceData.guideType || null,
      passengerDataRequired: experienceData.passengerDataRequired || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return experience;
  }

  async updateExperience(id: number, experienceData: Partial<InsertExperience>): Promise<Experience> {
    // Mock implementation
    throw new Error("Experience not found");
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    // Mock implementation
    return undefined;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createGoogleUser(userData: any): Promise<User> {
    const insertUser: InsertUser = {
      email: userData.email,
      password: undefined,
      googleId: userData.googleId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profilePicture: userData.profilePicture,
      authProvider: "google"
    };
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
    return result[0];
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const result = await db.insert(userProfiles).values(insertProfile).returning();
    return result[0];
  }

  async updateUserProfile(userId: number, updateData: Partial<InsertUserProfile>): Promise<UserProfile> {
    const result = await db
      .update(userProfiles)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
      
    if (result.length === 0) {
      throw new Error('Profile not found');
    }
    
    return result[0];
  }

  // Experience methods (database storage)
  async getExperiences(userId: number): Promise<Experience[]> {
    const result = await db.select().from(experiences).where(eq(experiences.userId, userId));
    return result;
  }

  async createExperience(experienceData: InsertExperience): Promise<Experience> {
    const result = await db.insert(experiences).values(experienceData).returning();
    return result[0];
  }

  async updateExperience(id: number, experienceData: Partial<InsertExperience>): Promise<Experience> {
    const result = await db
      .update(experiences)
      .set({ ...experienceData, updatedAt: new Date() })
      .where(eq(experiences.id, id))
      .returning();
      
    if (result.length === 0) {
      throw new Error('Experience not found');
    }
    
    return result[0];
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    const result = await db.select().from(experiences).where(eq(experiences.id, id)).limit(1);
    return result[0];
  }
}

// Use DatabaseStorage for production, MemStorage for development/testing
export const storage = new DatabaseStorage();