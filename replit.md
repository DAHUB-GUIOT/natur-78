# Festival NATUR - Full Stack Application

## Overview

This is a full-stack web application for Festival NATUR (www.festivalnatur.com), a sustainable tourism and regenerative practices platform. The application serves as a comprehensive ecosystem connecting startups, investors, mentors, digital nomads, and other stakeholders in the sustainable tourism space. It features multiple modules including networking, education, marketplace, experiences, fundraising, and an accelerator program.

**Migration Status**: Successfully migrated from Lovable to Replit (January 2025) ✅

**Domain Status**: festivalnatur.com is currently serving an old production build. The optimized version with white theme and improved UX is ready for deployment from this Replit environment.

## Recent Changes

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