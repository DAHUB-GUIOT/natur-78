import { users, userProfiles, experiences, companies, type User, type InsertUser, type UserProfile, type InsertUserProfile, type Experience, type InsertExperience, type Company, type InsertCompany } from "@shared/schema";
import { messages, conversations, type Message, type InsertMessage, type Conversation, type InsertConversation } from "@shared/messaging-schema";
import { db } from "./db";
import { eq, desc, or, and } from "drizzle-orm";

// Storage interface with all CRUD methods needed
export interface IStorage {
  // User authentication methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createGoogleUser(userData: any): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUsers(): Promise<User[]>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User>;
  searchUsers(query: string): Promise<User[]>;
  
  // User profile methods
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile>;
  
  // Experience methods
  getExperiences(userId: number): Promise<Experience[]>;
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience>;
  getExperience(id: number): Promise<Experience | undefined>;
  duplicateExperience(id: number, userId: number): Promise<Experience>;
  

  
  // Company methods
  getCompany(userId: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(userId: number, company: Partial<InsertCompany>): Promise<Company>;
  getAllCompanies(): Promise<Company[]>;
  
  // Messaging methods
  getMessages(conversationId: number): Promise<Message[]>;
  sendMessage(message: InsertMessage): Promise<Message>;
  getConversations(userId: number): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  markMessageAsRead(messageId: number): Promise<void>;
  getOrCreateConversation(userId1: number, userId2: number): Promise<Conversation>;
  searchUsers(query: string): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProfiles: Map<number, UserProfile>;
  private experiences: Map<number, Experience>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.experiences = new Map();
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
      googleId: insertUser.googleId || null,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      profilePicture: insertUser.profilePicture || null,
      authProvider: insertUser.authProvider || "local",
      role: insertUser.role || "viajero",
      isActive: insertUser.isActive ?? true,
      emailVerified: insertUser.emailVerified ?? false,
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
      role: userData.role || "empresa", // Default to empresa for Google users
      isActive: true,
      emailVerified: true, // Google users are automatically verified
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
    return Array.from(this.experiences.values()).filter(exp => exp.userId === userId);
  }

  async createExperience(experienceData: InsertExperience): Promise<Experience> {
    const id = this.currentId++;
    const experience: Experience = {
      id,
      userId: experienceData.userId,
      title: experienceData.title,
      type: experienceData.type || "regular",
      status: experienceData.status || "pendiente",
      category: experienceData.category,
      subcategory: experienceData.subcategory || null,
      location: experienceData.location || null,
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
    this.experiences.set(id, experience);
    return experience;
  }

  async updateExperience(id: number, experienceData: Partial<InsertExperience>): Promise<Experience> {
    const existingExperience = this.experiences.get(id);
    if (!existingExperience) {
      throw new Error("Experience not found");
    }
    
    const updatedExperience: Experience = {
      ...existingExperience,
      ...experienceData,
      updatedAt: new Date()
    };
    
    this.experiences.set(id, updatedExperience);
    return updatedExperience;
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async duplicateExperience(id: number, userId: number): Promise<Experience> {
    const originalExperience = this.experiences.get(id);
    if (!originalExperience) {
      throw new Error("Experience not found");
    }

    const duplicatedExperience: Experience = {
      ...originalExperience,
      id: this.currentId++,
      userId: userId,
      title: `${originalExperience.title} (Copia)`,
      status: "pendiente" as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.experiences.set(duplicatedExperience.id, duplicatedExperience);
    return duplicatedExperience;
  }



  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, ...data, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }



  // Company methods (memory storage)
  async getCompany(userId: number): Promise<Company | undefined> {
    return undefined;
  }

  async createCompany(companyData: InsertCompany): Promise<Company> {
    const id = this.currentId++;
    const company: Company = {
      id,
      userId: companyData.userId,
      companyName: companyData.companyName,
      businessType: companyData.businessType || null,
      description: companyData.description || null,
      website: companyData.website || null,
      phone: companyData.phone || null,
      address: companyData.address || null,
      city: companyData.city || null,
      department: companyData.department || null,
      country: companyData.country || "Colombia",
      coordinates: companyData.coordinates || null,
      certifications: companyData.certifications || null,
      services: companyData.services || null,
      logo: companyData.logo || null,
      coverImage: companyData.coverImage || null,
      isVerified: companyData.isVerified || false,
      rating: companyData.rating || 0,
      totalReviews: companyData.totalReviews || 0,
      status: companyData.status || "active",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return company;
  }

  async updateCompany(userId: number, companyData: Partial<InsertCompany>): Promise<Company> {
    throw new Error("Company not found");
  }

  async getAllCompanies(): Promise<Company[]> {
    return [];
  }

  // Messaging methods (memory storage)
  async getMessages(conversationId: number): Promise<Message[]> {
    return [];
  }

  async sendMessage(messageData: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    const message: Message = {
      id,
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      content: messageData.content,
      messageType: messageData.messageType || "text",
      isRead: messageData.isRead || false,
      createdAt: new Date()
    };
    return message;
  }

  async getConversations(userId: number): Promise<Conversation[]> {
    return [];
  }

  async createConversation(conversationData: InsertConversation): Promise<Conversation> {
    const id = this.currentId++;
    const conversation: Conversation = {
      id,
      participant1Id: conversationData.participant1Id,
      participant2Id: conversationData.participant2Id,
      lastMessageId: conversationData.lastMessageId || null,
      lastActivity: new Date(),
      createdAt: new Date()
    };
    return conversation;
  }

  async markMessageAsRead(messageId: number): Promise<void> {
    // Implementation for memory storage
  }

  async getOrCreateConversation(userId1: number, userId2: number): Promise<Conversation> {
    // For memory storage, create a new conversation
    return this.createConversation({
      participant1Id: userId1,
      participant2Id: userId2
    });
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async searchUsers(query: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => 
      user.email.includes(query) || 
      (user.firstName && user.firstName.includes(query)) ||
      (user.lastName && user.lastName.includes(query)) ||
      (user.companyName && user.companyName.includes(query))
    );
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
    const user = result[0];
    
    // If user is empresa role, automatically create company profile
    if (user.role === 'empresa' && user.companyName) {
      try {
        await this.createCompany({
          userId: user.id,
          companyName: user.companyName,
          address: user.address || '',
          city: user.city || '',
          country: user.country || 'Colombia',
          coordinates: user.coordinates || null,
          businessType: 'tourism',
          status: 'active',
          isVerified: true // Auto-verify for smooth UX
        });
      } catch (error) {
        console.error('Error creating company profile:', error);
      }
    }
    
    return user;
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

  async getAllExperiences(): Promise<Experience[]> {
    const result = await db.select().from(experiences).orderBy(desc(experiences.createdAt));
    return result;
  }

  async getPublicExperiences(): Promise<Experience[]> {
    const result = await db
      .select()
      .from(experiences)
      .where(eq(experiences.status, 'aprobado'))
      .orderBy(desc(experiences.createdAt));
    return result;
  }

  async duplicateExperience(id: number, userId: number): Promise<Experience> {
    const originalExperience = await this.getExperience(id);
    if (!originalExperience) {
      throw new Error("Experience not found");
    }

    const duplicatedData = {
      ...originalExperience,
      userId: userId,
      title: `${originalExperience.title} (Copia)`,
      status: "pendiente" as const,
    };

    // Remove fields that shouldn't be duplicated
    delete (duplicatedData as any).id;
    delete (duplicatedData as any).createdAt;
    delete (duplicatedData as any).updatedAt;

    const result = await db.insert(experiences).values(duplicatedData).returning();
    return result[0];
  }



  // Company methods (database storage)
  async getCompany(userId: number): Promise<Company | undefined> {
    const result = await db.select().from(companies).where(eq(companies.userId, userId)).limit(1);
    return result[0];
  }

  async createCompany(companyData: InsertCompany): Promise<Company> {
    const result = await db.insert(companies).values(companyData).returning();
    return result[0];
  }

  async updateCompany(userId: number, companyData: Partial<InsertCompany>): Promise<Company> {
    const result = await db
      .update(companies)
      .set({ ...companyData, updatedAt: new Date() })
      .where(eq(companies.userId, userId))
      .returning();
      
    if (result.length === 0) {
      throw new Error('Company not found');
    }
    
    return result[0];
  }

  async getAllCompanies(): Promise<Company[]> {
    const result = await db.select().from(companies).where(
      and(
        eq(companies.status, "active"),
        eq(companies.isVerified, true)
      )
    );
    return result;
  }

  // Messaging methods (database storage)
  async getMessages(conversationId: number): Promise<Message[]> {
    const conversation = await db.select().from(conversations).where(eq(conversations.id, conversationId)).limit(1);
    if (!conversation[0]) return [];
    
    const { participant1Id, participant2Id } = conversation[0];
    
    const result = await db.select().from(messages)
      .where(
        or(
          and(eq(messages.senderId, participant1Id), eq(messages.receiverId, participant2Id)),
          and(eq(messages.senderId, participant2Id), eq(messages.receiverId, participant1Id))
        )
      )
      .orderBy(messages.createdAt);
    
    return result;
  }

  async sendMessage(messageData: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(messageData).returning();
    return result[0];
  }

  async getConversations(userId: number): Promise<Conversation[]> {
    const result = await db.select().from(conversations)
      .where(
        or(
          eq(conversations.participant1Id, userId),
          eq(conversations.participant2Id, userId)
        )
      )
      .orderBy(desc(conversations.lastActivity));
    return result;
  }

  async createConversation(conversationData: InsertConversation): Promise<Conversation> {
    const result = await db.insert(conversations).values(conversationData).returning();
    return result[0];
  }

  async markMessageAsRead(messageId: number): Promise<void> {
    await db.update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, messageId));
  }

  async getOrCreateConversation(userId1: number, userId2: number): Promise<Conversation> {
    // Check if conversation already exists
    const existing = await db.select().from(conversations)
      .where(
        or(
          and(eq(conversations.participant1Id, userId1), eq(conversations.participant2Id, userId2)),
          and(eq(conversations.participant1Id, userId2), eq(conversations.participant2Id, userId1))
        )
      )
      .limit(1);

    if (existing[0]) {
      return existing[0];
    }

    // Create new conversation
    return this.createConversation({
      participant1Id: userId1,
      participant2Id: userId2
    });
  }

  async getAllUsers(): Promise<User[]> {
    const result = await db.select().from(users).orderBy(desc(users.createdAt));
    return result;
  }

  async getUsers(): Promise<User[]> {
    return this.getAllUsers();
  }

  async searchUsers(query: string): Promise<User[]> {
    const result = await db.select().from(users)
      .where(
        or(
          eq(users.email, `%${query}%`),
          eq(users.firstName, `%${query}%`),
          eq(users.lastName, `%${query}%`),
          eq(users.companyName, `%${query}%`)
        )
      )
      .limit(10);
    return result;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User> {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
      
    if (result.length === 0) {
      throw new Error('User not found');
    }
    
    return result[0];
  }
}

// Use DatabaseStorage for production, MemStorage for development/testing

export const storage = new DatabaseStorage();