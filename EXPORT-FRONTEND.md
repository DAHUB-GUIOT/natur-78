# Festival NATUR - Frontend Files Export

## 📁 client/src/App.tsx

```typescript
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { ContrastEnhancer } from "@/components/accessibility/ContrastEnhancer";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Register from "./pages/Register";
import ConSentidosRegister from "./pages/ConSentidosRegister";
import AuthEmpresas from "./pages/AuthEmpresas";
import AuthConSentidos from "./pages/AuthConSentidos";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import Platform from "./pages/Platform";
import Agenda from "./pages/Agenda";
import Networking from "./pages/Networking";
import Educacion from "./pages/Educacion";
import Marketplace from "./pages/Marketplace";
import ExperienciasOptimized from "./pages/ExperienciasOptimized";
import Perfil from "./pages/Perfil";
import PublicProfile from "./pages/PublicProfile";
import AdminOptimized from "./pages/AdminOptimized";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";

import MinimalistPortalEmpresas from "./pages/MinimalistPortalEmpresas";
import PortalEmpresasAuth from "./pages/PortalEmpresasAuth";
import PortalViajerosNew from "./pages/PortalViajerosNew";
import AuthViajeros from "./pages/AuthViajeros";
import ExperienceDetail from "./pages/ExperienceDetail";

import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Profile from "./pages/Profile";
import EnhancedProfile from "./pages/EnhancedProfile";

import Tickets from "./pages/Tickets";
import SessionDetail from "./pages/SessionDetail";
import Noticias from "./pages/Noticias";
import BiodiversityExperience from "./pages/BiodiversityExperience";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import About from "./pages/About";
import BlogPost from "./pages/BlogPost";
import ErrorBoundary from "@/components/ErrorBoundary";
import { setupGlobalErrorHandlers } from "@/lib/errorHandler";
import { useEffect } from "react";
import EventDetail from "./pages/EventDetail";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import { AuthProvider } from "./contexts/AuthContext";
import ComprehensiveCompanyRegistration from "./pages/ComprehensiveCompanyRegistration";
import VerificationPending from "./pages/VerificationPending";
import EmailVerification from "./pages/EmailVerification";
import React from "react";

// Create QueryClient outside component to prevent recreation on renders
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <ContrastEnhancer />
              <Switch>
                <Route path="/" component={Index} />
                <Route path="/registro" component={ComprehensiveCompanyRegistration} />
                <Route path="/verificacion-pendiente" component={VerificationPending} />
                <Route path="/verificar-email" component={EmailVerification} />
                <Route path="/con-sentidos" component={ConSentidosRegister} />
                <Route path="/auth/empresas" component={AuthEmpresas} />
                <Route path="/auth/consentidos" component={AuthConSentidos} />
                <Route path="/reserva" component={Reservation} />
                <Route path="/experiencias">
                  <MainLayout><ExperienciasOptimized /></MainLayout>
                </Route>
                <Route path="/networking">
                  <MainLayout><Networking /></MainLayout>
                </Route>
                <Route path="/perfil">
                  <MainLayout><Perfil /></MainLayout>
                </Route>
                <Route path="/perfil-publico/:username">
                  <MainLayout><PublicProfile /></MainLayout>
                </Route>
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/admin-legacy">
                  <MainLayout><AdminOptimized /></MainLayout>
                </Route>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/portal-empresas/auth" component={PortalEmpresasAuth} />
                <Route path="/portal-empresas" component={MinimalistPortalEmpresas} />
                <Route path="/company-profile" component={CompanyProfilePage} />
                <Route path="/portal-viajeros/auth" component={AuthViajeros} />
                <Route path="/portal-viajeros" component={PortalViajerosNew} />
                <Route path="/experiencia/:id" component={ExperienceDetail} />
                <Route path="/mapa" component={PortalViajerosNew} />
                <Route path="/profile/:userId" component={UserProfile} />
                <Route path="/user-profile/:id" component={Profile} />
                <Route path="/perfil-empresarial/:id" component={EnhancedProfile} />
                <Route path="/empresa/:companyId" component={CompanyProfile} />

                <Route path="/tickets" component={Tickets} />
                <Route path="/sesion/:sessionId" component={SessionDetail} />
                <Route path="/agenda">
                  <MainLayout><Agenda /></MainLayout>
                </Route>
                <Route path="/educacion">
                  <MainLayout><Educacion /></MainLayout>
                </Route>
                <Route path="/marketplace">
                  <MainLayout><Marketplace /></MainLayout>
                </Route>
                <Route path="/noticias" component={Noticias} />
                <Route path="/experiencia-biodiversidad" component={BiodiversityExperience} />
                <Route path="/blog/:slug" component={BlogPost} />
                <Route path="/evento/:eventId" component={EventDetail} />
                <Route path="/categoria/:category" component={CategoryPage} />
                <Route path="/acerca" component={About} />
                <Route path="/contacto" component={Contact} />
                <Route path="/servicios" component={Services} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </TooltipProvider>
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
```

## 📁 client/src/index.css

```css
@import url("https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables for Light/Dark Mode */
@layer base {
  :root {
    /* Light mode colors */
    --background: 252 248 238; /* #FCF8EE cream */
    --foreground: 20 14.3 4.1; /* #342521 dark brown */
    --card: 252 248 238;
    --card-foreground: 20 14.3 4.1;
    --popover: 252 248 238;
    --popover-foreground: 20 14.3 4.1;
    --primary: 73 69 79; /* NATUR green #CAD95E */
    --primary-foreground: 0 0 0;
    --secondary: 210 40 8; /* Light secondary */
    --secondary-foreground: 222.2 84 4.9;
    --muted: 210 40 8;
    --muted-foreground: 215.4 16.3 46.9;
    --accent: 73 69 79; /* NATUR green accent */
    --accent-foreground: 0 0 0;
    --destructive: 0 84.2 60.2;
    --destructive-foreground: 210 40 98;
    --border: 214.3 31.8 91.4;
    --input: 214.3 31.8 91.4;
    --ring: 73 69 79; /* NATUR green ring */
    --radius: 0.5rem;
    --chart-1: 12 76 61;
    --chart-2: 173 58 39;
    --chart-3: 197 37 24;
    --chart-4: 43 74 66;
    --chart-5: 27 87 67;
  }

  .dark {
    /* Dark mode colors */
    --background: 120 50 4; /* #0a1a0a dark green */
    --foreground: 73 69 79; /* #CAD95E light green */
    --card: 120 50 4;
    --card-foreground: 73 69 79;
    --popover: 120 50 4;
    --popover-foreground: 73 69 79;
    --primary: 73 69 79; /* NATUR green consistent */
    --primary-foreground: 0 0 0;
    --secondary: 217.2 32.6 17.5;
    --secondary-foreground: 210 40 98;
    --muted: 217.2 32.6 17.5;
    --muted-foreground: 215 20.2 65.1;
    --accent: 73 69 79; /* NATUR green accent */
    --accent-foreground: 0 0 0;
    --destructive: 0 62.8 30.6;
    --destructive-foreground: 210 40 98;
    --border: 217.2 32.6 17.5;
    --input: 217.2 32.6 17.5;
    --ring: 73 69 79; /* NATUR green ring */
    --chart-1: 220 70 50;
    --chart-2: 160 60 45;
    --chart-3: 30 80 55;
    --chart-4: 280 65 60;
    --chart-5: 340 75 55;
  }
}

/* Base Styles */
* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Unbounded', system-ui, -apple-system, sans-serif;
}

/* Custom Fonts */
.font-gasoek {
  font-family: 'Gasoek One', cursive;
}

.font-unbounded {
  font-family: 'Unbounded', sans-serif;
}

/* Glassmorphism Effect */
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glassmorphism {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Brutalist Design Elements */
.brutalist-card {
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #CAD95E;
  transition: all 0.2s ease;
}

.brutalist-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px #CAD95E;
}

.dark .brutalist-card {
  border: 3px solid #CAD95E;
  box-shadow: 6px 6px 0px rgba(202, 217, 94, 0.8);
}

.dark .brutalist-card:hover {
  box-shadow: 8px 8px 0px rgba(202, 217, 94, 0.8);
}

/* NATUR Brand Colors */
.natur-green {
  background-color: #CAD95E;
  color: #000;
}

.natur-green-text {
  color: #CAD95E;
}

.natur-cream {
  background-color: #FCF8EE;
  color: #342521;
}

/* Map Styles */
.mapbox-control-container {
  font-family: 'Unbounded', sans-serif !important;
}

.mapbox-ctrl-group {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 8px !important;
}

.mapbox-ctrl-group button {
  background: transparent !important;
  color: #CAD95E !important;
}

/* Accessibility Enhancements */
.contrast-high {
  filter: contrast(150%);
}

.contrast-ultra {
  filter: contrast(200%);
}

.contrast-inverted {
  filter: invert(1) contrast(150%);
}

.reduced-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

.focus-enhanced *:focus {
  outline: 3px solid #CAD95E !important;
  outline-offset: 2px !important;
}

.underline-links a {
  text-decoration: underline !important;
}

/* Utility Classes */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.gradient-natur {
  background: linear-gradient(135deg, #CAD95E, #22c55e);
}

.gradient-dark {
  background: linear-gradient(135deg, #0a1a0a, #1a2e1a);
}

/* Animation Classes */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

.animate-bounce-subtle {
  animation: bounceSubtle 2s ease-in-out infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .mobile-full {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }
  
  .mobile-padding {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Print Styles */
@media print {
  .no-print {
    display: none !important;
  }
}
```

## 📁 server/storage.ts (Database Implementation)

```typescript
import { users, userProfiles, experiences, companies, type User, type InsertUser, type UserProfile, type InsertUserProfile, type Experience, type InsertExperience, type Company, type InsertCompany } from "@shared/schema";
import { messages, conversations, type Message, type InsertMessage, type Conversation, type InsertConversation } from "@shared/messaging-schema";
import { db } from "./db";
import { eq, desc, or, and, ilike } from "drizzle-orm";

// Storage interface with all CRUD methods needed
export interface IStorage {
  // User authentication methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
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

export class DatabaseStorage implements IStorage {
  // User authentication methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async createGoogleUser(userData: any): Promise<User> {
    const insertData: InsertUser = {
      email: userData.email,
      googleId: userData.googleId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profilePicture: userData.profilePicture,
      authProvider: "google",
      emailVerified: true,
      role: userData.role || "viajero",
      registrationComplete: userData.role === "viajero" ? true : false,
    };

    const [user] = await db.insert(users).values(insertData).returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async getUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isActive, true)).orderBy(desc(users.createdAt));
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User> {
    const [user] = await db.update(users).set({ ...data, updatedAt: new Date() }).where(eq(users.id, id)).returning();
    return user;
  }

  async searchUsers(query: string): Promise<User[]> {
    return await db.select().from(users).where(
      or(
        ilike(users.firstName, `%${query}%`),
        ilike(users.lastName, `%${query}%`),
        ilike(users.companyName, `%${query}%`),
        ilike(users.email, `%${query}%`)
      )
    );
  }

  // Experience methods
  async getExperiences(userId: number): Promise<Experience[]> {
    return await db.select().from(experiences).where(eq(experiences.userId, userId)).orderBy(desc(experiences.createdAt));
  }

  async getAllExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).where(eq(experiences.isActive, true)).orderBy(desc(experiences.createdAt));
  }

  async createExperience(experienceData: InsertExperience): Promise<Experience> {
    const [experience] = await db.insert(experiences).values(experienceData).returning();
    return experience;
  }

  async updateExperience(id: number, data: Partial<InsertExperience>): Promise<Experience> {
    const [experience] = await db.update(experiences).set({ ...data, updatedAt: new Date() }).where(eq(experiences.id, id)).returning();
    return experience;
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience;
  }

  async duplicateExperience(id: number, userId: number): Promise<Experience> {
    const original = await this.getExperience(id);
    if (!original) throw new Error('Experience not found');

    const { id: _, userId: __, createdAt: ___, updatedAt: ____, ...duplicateData } = original;
    const [experience] = await db.insert(experiences).values({
      ...duplicateData,
      userId,
      title: `${original.title} (Copia)`,
      status: 'pendiente'
    }).returning();
    return experience;
  }

  // Additional storage methods would continue here...
  // Company, messaging, user profile methods following the same pattern
}

export const storage = new DatabaseStorage();
```

¿Continúo con las páginas principales del frontend (Index.tsx, MinimalistPortalEmpresas.tsx, etc.)?