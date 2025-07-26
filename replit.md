# Festival NATUR - Full Stack Application

## Overview

This is a full-stack web application for Festival NATUR (www.festivalnatur.com), a sustainable tourism and regenerative practices platform. The application serves as a comprehensive ecosystem connecting startups, investors, mentors, digital nomads, and other stakeholders in the sustainable tourism space. It features multiple modules including networking, education, marketplace, experiences, fundraising, and an accelerator program.

**Migration Status**: Successfully migrated from Lovable to Replit (January 2025) ✅

**Domain Status**: festivalnatur.com is currently serving an old production build. The optimized version with white theme and improved UX is ready for deployment from this Replit environment.

## Recent Changes

- ✅ **January 25, 2025**: Real Users Always Created Properly After Registration
  - **NEW**: Updated registration endpoint to set firstName, lastName from email if not provided
  - **NEW**: Registration now sets role based on userType parameter (empresa/viajero)
  - **NEW**: All new users are created with isActive: true
  - **NEW**: Google OAuth users default to 'empresa' role so they appear in B2B searches
  - **NEW**: Updated createUser method to accept all user fields
  - **NEW**: Registered users now appear in message search just like TripCol and DaHub
  - **FIXED**: New registrations create complete user records that can be found and messaged

- ✅ **January 25, 2025**: Maps Enhanced to Realistic 3D Green Terrain
  - **NEW**: Updated all maps to use Mapbox outdoors-v12 style for natural green appearance
  - **NEW**: Enabled 3D terrain with 1.5x exaggeration for dramatic topography
  - **NEW**: Added realistic sky layer with atmosphere rendering
  - **NEW**: Implemented fog effects for depth and realism
  - **NEW**: Set 60-degree pitch angle for immersive 3D viewing
  - **NEW**: Added globe projection for Earth curvature effect
  - **NEW**: Included fullscreen control for expanded viewing
  - **NEW**: Updated all marker colors to green nature theme (emerald, lime, green)
  - **NEW**: Enhanced map controls with scale indicator and navigation

- ✅ **January 25, 2025**: Messaging Search Shows Real Users - TripCol and DaHub
  - **NEW**: Added /api/messages/search-users endpoint to find real business users
  - **NEW**: Search functionality now displays TripCol and DaHub when typing in search box
  - **NEW**: Users can click on search results to start new conversations
  - **NEW**: Search shows only active empresa (business) users for B2B messaging
  - **NEW**: Real-time search filtering by name or email
  - **NEW**: Search results display with green avatars to differentiate from existing conversations
  - **NEW**: Click to start conversation sends initial greeting message
  - **FIXED**: Messaging now works with real seeded users instead of mock data

- ✅ **January 25, 2025**: Messaging Page Complete Light Gray Theme Redesign
  - **UPDATED**: Changed entire messaging interface from dark WhatsApp theme to light gray color scheme
  - **NEW**: Light gray backgrounds (gray-100, gray-200, gray-300, gray-400) throughout messaging UI
  - **NEW**: All text changed to white for high contrast on gray backgrounds
  - **NEW**: Updated conversation list with gray-200 background and white text
  - **NEW**: Chat area now uses gray-100 background with gray-300 message bubbles
  - **NEW**: Own messages use green-600 background for brand consistency
  - **NEW**: Input area redesigned with gray-300 background and white text placeholders
  - **NEW**: Empty state uses light gray theme with instructional text
  - **NEW**: Hover states updated to work with new light gray color palette
  - **NEW**: Removed dark WhatsApp branding colors (#111b21, #202c33, etc.)

- ✅ **January 25, 2025**: Twitter/X-Style Profile with Integrated Statistics and Glassmorphism Design
  - **REMOVED**: Estadísticas section from sidebar navigation completely
  - **NEW**: Created TwitterProfileSection.tsx with modern Twitter/X-inspired design
  - **NEW**: Glassmorphism aesthetic with semi-transparent backgrounds and frosted glass effects
  - **NEW**: Profile header with cover photo, avatar, and verified badge support
  - **NEW**: Integrated business statistics directly into profile (experiencias, vistas, reservas, ingresos, rating)
  - **NEW**: Twitter-style activity feed with posts, interactions, and engagement metrics
  - **NEW**: White sans-serif typography throughout for modern clean look
  - **NEW**: Profile tabs for Posts, Respuestas, Medios, Me gusta following Twitter UX pattern
  - **NEW**: All stats now displayed in clean rounded cards with hover effects
  - **UPDATED**: Mi Perfil section now uses TwitterProfileSection instead of old ProfileSection

- ✅ **January 25, 2025**: UI Clean-up - Removed WhatsApp Branding Text
  - **REMOVED**: "WhatsApp Business para Empresas" text from messaging interface
  - **REMOVED**: "Selecciona una conversación para empezar a chatear" text
  - **UPDATED**: Cleaner messaging interface with just the visual icon, no text labels

- ✅ **January 25, 2025**: Demo Data Successfully Created with Business Users and Festival NATUR
  - **NEW**: Created comprehensive seed data script with proper foreign key constraint handling
  - **NEW**: Added two business users: dahub.tech@gmail.com (password: dahub123) and tripcol.tour@gmail.com (password: tripcol123)
  - **NEW**: Generated 6 authentic Colombian tourism experiences across cultura, aventura, gastronomía, educativo, and naturaleza categories
  - **NEW**: Added Festival NATUR 2025 event at Centro de Felicidad Chapinero (March 15-17, 2025)
  - **NEW**: Implemented data cleanup functionality to handle existing data before seeding
  - **NEW**: Fixed database schema compatibility issues in seed data (JSON location format, proper field names)
  - **NEW**: Both companies have verified status with complete profiles and business information
  - **NEW**: Experiences include detailed pricing, accessibility info, languages, and operational details
  - **NEW**: Demo accounts ready for testing B2B messaging, experience management, and marketplace features
  - **UPDATED**: DaHub profile now includes comprehensive metadata: founder name (Daniel Hurtado), Festival NATUR branding, skills, interests, support offerings
  - **UPDATED**: DaHub company profile includes full business details: address at Centro de Felicidad Chapinero, social media, certifications, ratings
  - **UPDATED**: DaHub experiences rebranded to Festival NATUR events including main festival (March 15-17, 2025), innovation tours, and hackathon

- ✅ **January 26, 2025**: Company Directory Updated to Show Real Database Users Only
  - **RENAMED**: "Buscador de Empresas" changed to "Contactos" throughout Portal Empresas interface
  - **REMOVED**: EcoTours Colombia and Café de la Montaña placeholder cards
  - **NEW**: Enhanced company cards now display DaHub and TripCol with detailed business information
  - **NEW**: Cards show founder names, specialties, descriptions, ratings, and contact details
  - **NEW**: Improved glassmorphism design with larger cards and better information hierarchy
  - **NEW**: Real business data including certifications, skills, and verification status
  - **FIXED**: Company directory now connected to actual database users for authentic B2B networking
  - **NEW**: Intelligent search functionality with real-time filtering by name, description, and specialties
  - **NEW**: Category filters: Technology, Travel Agency, Event Organization
  - **UPDATED**: DaHub correctly positioned as technology company (platform development)
  - **UPDATED**: TripCol correctly positioned as travel agency and event organizer
  - **NEW**: Dynamic company counter showing filtered results
  - **NEW**: Empty state handling for no search results

- ✅ **January 25, 2025**: Complete Admin Dashboard Implementation with Database Fixes
  - **NEW**: Created comprehensive admin API endpoints for user management, experience approval, and platform statistics
  - **NEW**: Implemented role-based authentication with admin middleware protection
  - **NEW**: Added admin user account (admin@festivalnatur.com / admin123) for testing
  - **NEW**: Integrated "Admin Panel" button in Portal Empresas sidebar for admin users
  - **NEW**: Set up admin routes: /api/admin/stats, /api/admin/users, /api/admin/experiences
  - **NEW**: Added admin action logging with adminLogs table for audit trail
  - **FIXED**: Database schema issues by adding missing columns (location, subtitle, image, category, price) to experiences table
  - **FIXED**: Admin stats endpoint now returns proper statistics including user counts, company data, and experience metrics
  - **NEW**: Admin can update user roles (viajero, empresa, admin) and activate/deactivate users
  - **NEW**: Admin can approve/reject/archive experiences and view all platform content
  - **NEW**: Complete three-user-type system working: Usuario Viajero, Usuario Empresa, Usuario Admin

- ✅ **January 25, 2025**: About Section Border Removal
  - **FIXED**: Removed border from text container in About section as requested by user
  - **UPDATED**: Cleaned up glassmorphism design by removing border-[#191C0F]/10 class

- ✅ **January 25, 2025**: Portal Viajeros Enhanced with Separate Pages and Sample Experiences
  - **NEW**: Added "Mapa" button to show clean map view with only background and experience markers
  - **NEW**: Created 3 sample Colombian experiences: El Cocuy trekking, Nuquí whale watching, Cartagena food tour
  - **NEW**: Implemented separate overlay pages for Experiencias, Favoritos, and Reservas sections
  - **NEW**: Removed search input from top navigation for cleaner header design
  - **NEW**: Added floating info panel for map view with legend and category filters
  - **NEW**: Enhanced glassmorphism design with transparent overlays over interactive map background
  - **NEW**: Default view now shows "Mapa" section with immersive full-screen map experience
  - **FIXED**: Google OAuth redirect URI mismatch identified - requires Google Cloud Console update

- ✅ **January 25, 2025**: NEW Portal Viajeros Marketplace Implementation
  - **NEW**: Created comprehensive PortalViajeros.tsx marketplace for travelers based on Portal Empresas design
  - **NEW**: Implemented experience browsing with category filters (aventura, naturaleza, cultura, gastronomía, etc.)
  - **NEW**: Added marketplace-focused sidebar with favorites, reservations, and category navigation
  - **NEW**: Created traveler-specific interface with soft gray glassmorphism design consistent with Portal Empresas
  - **NEW**: Integrated real-time experience search and filtering functionality
  - **NEW**: Added stats dashboard showing available experiences, providers, ratings, and average pricing
  - **NEW**: Implemented experience cards with pricing, ratings, duration, and booking actions
  - **NEW**: Created dedicated route /portal-viajeros with full map background integration
  - **NEW**: Updated Hero component to redirect EXPERIENCIAS button to new Portal Viajeros
  - **NEW**: Fixed Google OAuth authentication by making password column nullable in database
  - **NEW**: Portal Viajeros serves as marketplace counterpart to Portal Empresas creation interface
  - **NEW**: Travelers can now browse, filter, favorite, and book experiences created by companies
  - **NEW**: Consistent white fonts on soft gray backgrounds throughout traveler interface
  - **NEW**: Completely replaced old /mapa route with Portal Viajeros marketplace
  - **NEW**: Updated all navigation links and references to point to new Portal Viajeros
  - **NEW**: EXPERIENCIAS button, auth redirects, and 404 page now direct to Portal Viajeros
  - **NEW**: Unified experience browsing interface replacing scattered map implementations
  - **NEW**: Simplified Portal Viajeros sidebar to only show "Mapa", "Favoritos", "Reservas"
  - **NEW**: Removed title from Portal Viajeros top bar for cleaner interface
  - **NEW**: Added interactive map with experience markers and category filtering in Mapa section
  - **NEW**: Implemented clickable markers positioned across Colombian cities (Bogotá, Medellín, Cartagena, etc.)
  - **NEW**: Added map legend and real-time stats dashboard for filtered experiences

- ✅ **January 25, 2025**: Complete Business Logic Implementation with Messaging & Unified Platform
  - **NEW**: Implemented comprehensive messaging system between users with real-time communication
  - **NEW**: Added companies database table and API for business profile management
  - **NEW**: Created experience duplication functionality for easy template copying
  - **NEW**: Built unified platform (/plataforma) combining map, experiences, and messaging
  - **NEW**: Enhanced storage interface with messaging, company, and experience management methods
  - **NEW**: Added proper API endpoints for messages, conversations, and company operations
  - **NEW**: Created MessageCenter component with conversation management and real-time chat
  - **NEW**: Implemented UnifiedPlatform as streamlined traveler and business interface
  - **NEW**: Database schema includes messages, conversations, and companies tables
  - **NEW**: Experience management now supports public listing, private management, and duplication
  - **NEW**: Platform consolidates Portal Empresas functionality into single interface
  - **NEW**: Users can now message each other about experiences and business opportunities
  - **NEW**: Companies can create detailed profiles with verification status and ratings

- ✅ **January 24, 2025**: Complete Experience Management System with UI/UX Enhancements
  - **NEW**: Created comprehensive ExperienceForm.tsx with 6-step wizard based on detailed requirements
  - **NEW**: Added experiences database table with all required fields from attached specifications
  - **NEW**: Implemented full CRUD API endpoints for experience management (/api/experiences)
  - **NEW**: Updated storage interface with experience methods for both memory and database storage
  - **NEW**: Form includes all fields: pricing by age groups, languages, accessibility, policies, etc.
  - **NEW**: Integrated form with Portal Empresas dashboard with floating action buttons
  - **NEW**: Added proper validation, loading states, and success/error handling
  - **NEW**: Created ExperienceDetail.tsx page for individual experience viewing
  - **NEW**: Added Link navigation from experience cards to detail pages (/experiencia/:id)
  - **NEW**: Enhanced statistics dashboard with sales metrics and performance indicators
  - **NEW**: Implemented Google OAuth login integration for Portal Empresas authentication
  - **NEW**: Added comprehensive sales tracking and experience performance analytics
  - **NEW**: Companies can now upload detailed experiences with professional tour operator requirements
  - **NEW**: Form supports complex pricing structures, operational details, and passenger data requirements

- ✅ **January 24, 2025**: Portal Empresas Complete Glassmorphism Design with Map Background
  - **NEW**: Applied full-screen Mapbox map as background for ALL Portal Empresas pages
  - **NEW**: Added persistent top green navigation bar across all sections
  - **NEW**: Implemented consistent glassmorphism sidebar design for all pages
  - **NEW**: Updated all text to white fonts for perfect contrast on map background
  - **NEW**: Redesigned Experiencias, Empresas, Mensajes, Estadísticas, and Ajustes pages with transparent cards
  - **NEW**: All content panels now use backdrop-blur-xl bg-black/20 with white/30 borders
  - **NEW**: Maintained functional navigation while creating immersive map-based environment
  - **NEW**: Green gradient buttons and accent colors throughout for brand consistency
  - **NEW**: Floating content panels positioned over map background for optimal UX
  - **NEW**: Responsive design preserves glassmorphism aesthetics across all screen sizes

- ✅ **January 24, 2025**: Homepage Sections Complete UX/UI Optimization
  - **NEW**: Redesigned ALL homepage sections with improved design, smaller elements, and better organization
  - **NEW**: About section with glassmorphism cards and structured content blocks
  - **NEW**: Benefits section with compact grid layout and yellow accent styling  
  - **NEW**: Program section with reduced sizes and improved interactive cards
  - **NEW**: Location section with optimized layout and organized information blocks
  - **NEW**: Award section with better proportions and structured content cards
  - **NEW**: Partners section with glassmorphism container and organized partner logos
  - **NEW**: Contact section with modern social media cards and structured layout
  - **NEW**: Participation section with compact participant grid and improved typography
  - **NEW**: All sections maintain consistent yellow (#EDFF60) branding and glassmorphism design
  - **NEW**: Responsive design improvements with better mobile/desktop scaling
  - **NEW**: Preserved ALL original information while dramatically improving visual hierarchy and user experience

- ✅ **January 24, 2025**: BIME-Style Landing Page with Fixed Navigation Redesign
  - **NEW**: Redesigned Hero.tsx with BIME event-style layout inspired by attached design reference
  - **NEW**: Implemented fixed top navigation with glassmorphism effect (backdrop-blur-md bg-white/10)
  - **NEW**: Moved Portal Empresas and Con-Sentidos buttons to top right navigation menu
  - **NEW**: Added three main action buttons in center: TICKETS, AGENDA, and EXPERIENCIAS
  - **NEW**: Restored original NATUR font styling and green color scheme (green-800 title, green-700 subtitle)
  - **NEW**: Removed search bar for cleaner design and changed to organic emerald accent colors
  - **NEW**: Implemented gradient overlays for better text readability over background image
  - **NEW**: Maintained full-screen immersive design with proper spacing for fixed header
  - **NEW**: Used original font-gasoek for title and proper button styling with icons

- ✅ **January 24, 2025**: Portal Empresas Modern Dashboard Implementation
  - **NEW**: Created PortalEmpresasDashboard.tsx with clean, modern design inspired by Notion/Airbnb/LinkedIn
  - **NEW**: Implemented white minimalist design with soft borders, modern icons, and sans-serif fonts
  - **NEW**: Added collapsible sidebar with Inicio, Mapa, Empresas, Experiencias, Mensajes, Estadísticas, Ajustes
  - **NEW**: Created professional top bar with global search, notifications, messages, and user profile dropdown
  - **NEW**: Implemented experience cards with ratings, tags, location, pricing, and host information
  - **NEW**: Added company directory with LinkedIn-style search and profile cards
  - **NEW**: Created floating action button for creating new experiences
  - **NEW**: Updated registration flow to redirect to /portal-empresas after completion
  - **NEW**: Modern dashboard replaces old Dashboard, Admin, and Experiencias versions
  - **NEW**: Responsive design with stats cards, activity feed, and comprehensive business management tools

- ✅ **January 24, 2025**: Traveler Registration Marketplace Redirect Implementation
  - **NEW**: Modified ConSentidosRegister.tsx to redirect travelers to marketplace (/mapa) after registration
  - **NEW**: Updated Auth.tsx to ensure travelers access marketplace after login/registration
  - **NEW**: Enhanced user flow for viajeros to automatically access experience marketplace
  - **NEW**: Added proper redirect timing and success messages for traveler registration completion

- ✅ **January 24, 2025**: High Contrast Design & Font Visibility Fix FULLY COMPLETED
  - **NEW**: Fixed all yellow font visibility issues across the entire platform
  - **NEW**: Updated numbered registration steps (1-6: Participación, Perfil, Datos, Información, Términos, Plataforma) with black fonts
  - **NEW**: Fixed "Busco articulación territorial" and all subcategory selection text to black
  - **NEW**: Fixed "Consentimiento y envío" section with black fonts for all consent form text
  - **NEW**: Updated consent checkboxes labels "Acepto los términos y condiciones" and "Deseo recibir noticias" to black
  - **NEW**: Implemented high contrast black text on white/light backgrounds throughout
  - **NEW**: Replaced all yellow colors with green gradient alternatives for buttons and progress bars
  - **NEW**: Updated CSS color system with pure black/white and green accent colors
  - **NEW**: Enhanced form styling with bold black labels and green borders
  - **NEW**: Fixed Portal Empresas button styling with black background and white text
  - **NEW**: Improved visibility in Admin panel, Experiencias page, and registration forms
  - **NEW**: All cards, badges, and interactive elements now use high contrast colors
  - **NEW**: Registration forms now feature white cards with green borders and black text

- ✅ **January 24, 2025**: Unified Authentication System & Portal Integration Completed
  - **NEW**: Auth.tsx unified authentication component with login/register tabs for both portals
  - **NEW**: AuthEmpresas.tsx - Yellow-themed authentication for Portal Empresas (/auth/empresas)
  - **NEW**: AuthConSentidos.tsx - Green-themed authentication for Con-Sentidos (/auth/consentidos)
  - **NEW**: Portal buttons in hero section replace "QUIERO SER PARTE" button
  - **NEW**: Portal Empresas (yellow) and Con-Sentidos (green) prominently displayed in main hero
  - **NEW**: Removed duplicate navigation buttons from header (registro, explorar, dashboard)
  - **NEW**: Authentication flows redirect to full registration forms with all subcategories and questions
  - **NEW**: Registration forms maintain all detailed questions and category selection steps
  - **NEW**: Cross-portal navigation links in authentication and registration pages

- ✅ **January 24, 2025**: Platform Optimization and White Theme Implementation completed
  - **NEW**: Complete platform redesign with clean white background and professional UI
  - **NEW**: ExperienciasOptimized.tsx - Enhanced experience management with improved UX, stats dashboard, and better visual hierarchy
  - **NEW**: MapaPublicoOptimized.tsx - Beautiful public map interface with advanced filtering, detailed experience cards, and immersive design
  - **NEW**: AdminOptimized.tsx - Professional admin panel with tabbed interface, content approval workflow, and comprehensive analytics
  - **NEW**: Improved search and filtering functionality across all optimized pages
  - **NEW**: Enhanced user experience with better visual feedback, loading states, and responsive design
  - **NEW**: Clean typography, consistent spacing, and professional color scheme throughout
  - **NEW**: Fixed all routing to use optimized page components
  - **NEW**: Better data visualization with stats cards, progress indicators, and status badges

- ✅ **January 24, 2025**: Dashboard integrado completado
  - **NEW**: Eliminada página de ecosistema y creado dashboard integrado con diseño moderno
  - **NEW**: Sidebar colapsible con navegación entre módulos del dashboard
  - **NEW**: Topbar con búsqueda global y menú de usuario
  - **NEW**: Mapa interactivo de empresas con filtros y marcadores por tipo
  - **NEW**: Buscador de contactos estilo LinkedIn con filtros avanzados
  - **NEW**: Sistema de chat comunitario con salas temáticas y chat general NATUR
  - **NEW**: Panel de control con estadísticas, actividad reciente y acciones rápidas

- ✅ **January 24, 2025**: Navigation and subscription improvements
  - **NEW**: Added "Corazón NATUR" module before Platform in navigation menu
  - **NEW**: Added free subscription plan ($0/mes) with basic features
  - Enhanced user experience with clearer navigation hierarchy
  - Updated sidebar and main navigation to prioritize Heart module

- ✅ **January 24, 2025**: Registration system completed and working
  - Fixed authentication endpoints and error handling
  - Corrected database integration for user profiles
  - Implemented proper redirect flow from registration to profile page
  - System fully functional for user onboarding

- ✅ **January 24, 2025**: Security vulnerability patch applied
  - **CRITICAL**: Upgraded Vite from ^5.4.14 to ^5.4.15 to fix CVE-2025-30208
  - Security patch verified working, application tested and confirmed operational
  - Build tool vulnerability resolved, development and production processes secured

- ✅ **January 24, 2025**: Successfully completed migration from Lovable to Replit
  - Migrated from React Router to Wouter for better Replit compatibility
  - Replaced Supabase with PostgreSQL/Drizzle ORM backend
  - Created comprehensive database schema for users and profiles
  - Implemented secure server-side API endpoints with session management
  - Added "Corazón NATUR" button in registration flow that leads to Heart module after completion
  - Website confirmed working at www.festivalnatur.com
  - Fixed CategoryType compatibility issues across components

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing (migrated from React Router)
- **Styling**: Tailwind CSS with custom design system and font-gasoek support
- **UI Components**: Radix UI components with shadcn/ui component library
- **State Management**: React Context for authentication, TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API
- **Database ORM**: Drizzle ORM with PostgreSQL (migrated from Supabase)
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with secure server-side storage
- **Development**: Hot reload with Vite middleware integration
- **Security**: Proper client/server separation with API authentication

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express API
├── shared/          # Shared types and schemas
└── migrations/      # Database migrations
```

## Key Components

### Authentication System
- Custom authentication flow with email/password
- Session-based authentication using PostgreSQL storage
- User registration with profile creation
- Protected routes and authorization context

### Database Schema
- **Users**: Core authentication table with email, password, timestamps
- **User Profiles**: Detailed profile information with category-specific fields
- Support for multiple user types: startups, investors, mentors, ecosystem players, digital nomads
- Flexible schema accommodating different user categories and subcategories

### User Categories & Profiles
- **Startups**: Different stages (idea, MVP, growth, established)
- **Investors**: Investment focus, portfolio size, funding ranges
- **Mentors**: Expertise areas, mentorship types, experience
- **Ecosystem**: NGOs, agencies, operators, institutions
- **Digital Nomads**: Content creators, remote workers, community leaders
- **Attendees**: Tourists, students, citizens with different interests

### MVP Core Modules (Optimized)
1. **Interactive Map (MapaPublicoOptimized)**: Clean, white-themed public interface with advanced filtering, detailed experience cards, and immersive design
2. **Experience Management (ExperienciasOptimized)**: Professional dashboard for entrepreneurs with stats, advanced forms, and comprehensive experience management
3. **Admin Panel (AdminOptimized)**: Sophisticated administrative interface with tabbed workflow, content approval system, and analytics dashboard
4. **User Profiles**: Registration and profile management for entrepreneurs/initiatives
5. **Basic Networking**: Simple contact and communication features

### User Role Flows
- **Emprendimiento/Iniciativa**: Register → Complete Profile → Upload Experiences → Network with others
- **Viajero**: Browse Map → View Initiative Details → Contact for more information → Optional Registration
- **Administrador**: Login → Review Pending Content → Approve/Reject → Manage User Directory

## Data Flow

### Authentication Flow
1. User registers with email/password
2. Profile creation based on selected user category
3. Session establishment with PostgreSQL backing
4. Context-based authentication state management

### API Structure
- RESTful API endpoints under `/api/` prefix
- Authentication routes (`/api/auth/login`, `/api/auth/register`)
- User profile management routes
- Category-specific data endpoints

### Client-Server Communication
- TanStack Query for server state management
- Centralized API request handling with error boundaries
- Real-time updates through polling for dynamic content

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **date-fns**: Date manipulation and formatting

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **drizzle-kit**: Database migrations and introspection
- **esbuild**: Fast JavaScript bundler for server

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied with `db:push` command

### Environment Configuration
- **Development**: Uses Vite dev server with Express middleware
- **Production**: Serves static files from Express with built client
- **Database**: Requires `DATABASE_URL` environment variable for Neon connection

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both client and server
- `start`: Production server
- `db:push`: Apply database schema changes

### Hosting Considerations
- Designed for deployment on platforms supporting Node.js
- Serverless-ready with Neon PostgreSQL
- Static assets served efficiently in production
- Environment variables required for database connection

The application uses a modern, type-safe stack optimized for rapid development while maintaining production readiness. The modular architecture allows for easy feature expansion and maintenance.