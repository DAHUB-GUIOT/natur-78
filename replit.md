# Festival NATUR - Full Stack Application

## Overview
Festival NATUR is a full-stack web application designed to be a comprehensive ecosystem for sustainable tourism and regenerative practices. It connects startups, investors, mentors, digital nomads, and other stakeholders, featuring modules for networking, education, a marketplace, experiences, fundraising, and an accelerator program. The platform aims to be the leading resource for sustainable tourism, fostering connections and facilitating growth within the sector.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **Styling**: Tailwind CSS with custom design system, including `font-gasoek` and `Unbounded` fonts.
- **UI Components**: Radix UI components with shadcn/ui.
- **State Management**: React Context for authentication, TanStack Query for server state.
- **Form Handling**: React Hook Form with Zod validation.
- **Design Philosophy**: Emphasizes brutalist and glassmorphism aesthetics, white themes for marketplace and dashboards, and dark themes for immersive experiences. Features include organic background textures, interactive cards, and consistent typography.
- **Color System**: Minimal two-mode design token system extracted from homepage colors - light mode uses cream background (#FCF8EE), dark mode uses dark green (#0a1a0a), with consistent NATUR brand green (#cad95e) accent across both modes.

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Development**: Hot reload with Vite middleware integration
- **Security**: Proper client/server separation with API authentication and session management.

### Project Structure
- `client/`: Frontend React application
- `server/`: Backend Express API
- `shared/`: Shared types and schemas
- `migrations/`: Database migrations

### Key Features and Design Decisions
- **Unified Authentication**: A single system allowing users to access both "Portal Empresas" (businesses) and "Portal Viajeros" (travelers) with the same credentials, featuring distinct themed login/registration flows for each portal.
- **Interactive Map**: Features a Mapbox-based 3D map with natural terrain and custom markers for businesses and experiences, serving as a central navigation element.
- **Comprehensive Directories**:
    - **Portal Empresas (B2B)**: A completely redesigned minimalist, mobile-first dashboard with full-screen interactive map as the home view. Features transparent header navigation with single hamburger button for Portal navigation (blue theme), completely removed sidebar, eliminated all floating overlays on map, and optimized all views for mobile-first experience with improved cards and touch-friendly interfaces.
    - **Portal Viajeros (B2C)**: A marketplace for travelers to browse, filter, and book sustainable tourism experiences.
- **Experience Management**: A detailed 6-step wizard for businesses to create and manage their offerings, including complex pricing and operational details.
- **Messaging System**: A simple, B2B-focused chat system allowing direct communication between users and companies.
- **Event Agenda**: A two-division agenda (VIVE NATUR and NATUR PRO) integrating cultural activities, with customizable filtering and brutalist design.
- **Ticket Sales**: A dedicated tickets page with different access tiers (VIVE NATUR, NATUR PRO) and clear feature differentiation.
- **User Categories**: Robust classification for users, including Agencias u Operadores Turísticos, Alojamientos Sostenibles, Gastronomía Sostenible, Movilidad y Transporte Ecológico, ONG y Fundaciones, Educación y Sensibilización Ambiental, Tecnología para el Turismo Sostenible, and Aliados y Patrocinadores, each with specialized subcategories.
- **Admin Dashboard**: A comprehensive panel for user management, experience approval, and platform statistics.
- **Accessibility Enhancement**: Comprehensive accessibility features including high contrast modes (normal, high, ultra, inverted), font size adjustment, reduced motion options, link underlining, enhanced focus visibility, and keyboard navigation support with WCAG 2.1 compliance.
- **Visuals & UX**: Consistent application of glassmorphism, brutalist design elements, and a white/dark theme contrast, with a focus on high contrast and simplified typography for improved readability and user experience.
- **7-Step User Flow System**: Complete user journey from registration to traveler map visibility with automatic feature activation, progress tracking, and verification levels (basic, verified, certified, premium).

## External Dependencies

### Core Dependencies
- `@neondatabase/serverless`: Serverless PostgreSQL connection
- `drizzle-orm`: Type-safe database ORM
- `@tanstack/react-query`: Server state management
- `wouter`: Lightweight routing
- `@radix-ui/*`: Accessible UI primitives
- `tailwindcss`: Utility-first CSS framework
- `react-hook-form`: Form state management
- `zod`: Schema validation
- `date-fns`: Date manipulation and formatting
- `ws`: WebSocket server for real-time messaging
- `uuid`: For generating unique IDs

### Development Dependencies
- `vite`: Build tool and dev server
- `typescript`: Type safety
- `drizzle-kit`: Database migrations and introspection
- `esbuild`: Fast JavaScript bundler for server

## Recent Implementation (2025-08-08)

### Portal Empresas UI Optimization with Compact Sidebar
Successfully implemented ultra-compact sidebar design with full-page map:

1. **Ultra-Compact Sidebar**: Reduced from 280px to 200px width with collapsible design (60px when collapsed)
2. **Full-Screen Map**: Map view now uses full viewport height with absolute positioning for immersive experience
3. **Enhanced Desktop/Mobile Differentiation**: Clear separation between mobile hamburger navigation and desktop sidebar
4. **Green-Only Color Scheme**: Completely removed all blue accents, replaced with green gradients throughout interface
5. **Improved Performance**: Optimized sidebar toggle animations and full-page map rendering
6. **Responsive Breakpoints**: Better mobile-first design with enhanced touch-friendly interfaces

### Navigation Consistency Enhancement
Added unified HeaderButtons menu to Agenda page:

1. **Consistent Navigation**: Agenda page now includes the same HeaderButtons component as homepage
2. **Portal Access**: Users can access both Portal Empresas and Portal Viajeros from any page
3. **Ticket Integration**: Festival ticket purchasing available throughout the platform
4. **Enhanced UX**: Seamless navigation between all public pages and portal access points

### Complete Platform Optimization (2025-08-07)
Successfully optimized the entire platform for production:

1. **Portal Structure**: Both portals now use identical HeaderButtons navigation with consistent design
2. **Code Cleanup**: Removed obsolete files (PortalViajerosOptimized.tsx, PortalViajeros.tsx, PortalEmpresasDashboard.tsx)
3. **Performance**: Increased cache times, reduced unnecessary re-renders, optimized queries
4. **Architecture**: Unified navigation system between Portal Empresas and Portal Viajeros
5. **Build Optimization**: Clean builds with optimized bundle sizes

### Complete 7-Step User Flow System
Successfully implemented comprehensive user journey tracking:

1. **Registro**: Account creation with automatic setup and feature activation
2. **Perfil**: Auto-generated profile with completion tracking (80%+ for verification)
3. **Tarjeta de contacto**: Automatic contact card creation in directory
4. **Mapa**: User appears as geolocated point with visibility controls
5. **Mensajería**: Send/receive messages with user search functionality
6. **Experiencias**: Create experiences/activities with 6-step wizard
7. **Mapa de viajeros**: Experiences visible to travelers when approved

### User Management & Complete Access Testing (2025-08-08)
- **Unified Authentication**: All empresa users can access Portal Viajeros with the same credentials
- **Primary Test User**: dahub.tech@gmail.com (password: 12345678) - full access to all 28+ routes
- **Cross-Portal Access**: Business users seamlessly switch between managing business and exploring as travelers
- **Complete Profile Setup**: Auto-generated profiles with all required fields
- **Identical Navigation**: Both portals use HeaderButtons navigation with same structure and design

### Complete Route Coverage & User Access
Successfully implemented and tested comprehensive access system:

**Public Routes (9)**: Homepage, News, Blog, About, Contact, Services, Tickets, Events, Categories
**Auth Routes (6)**: Registration, Login flows for different portals and user types  
**Business Portal (6)**: Dashboard, Profile, Experiences, Networking, Company management
**Traveler Portal (3)**: Marketplace, Map, Experience booking
**User Management (5)**: Profile editing, public profiles, user management
**Admin/Special (3)**: Admin dashboard, educational content, session management

**Total**: 32+ fully functional routes with seamless cross-portal navigation and unified authentication

### Technical Implementation
- **UserFlowManager Component**: Real-time progress tracking with visual indicators and completion percentages
- **Database Schema Enhancements**: Added user flow columns and experience visibility controls
- **Automatic Profile Setup**: Upon registration, users get complete profiles and map locations
- **Enhanced Messaging System**: Added searchUsers functionality with full-text search
- **Optimized ExperienceForm**: Sheet-based 6-step creation process with validation
- **Dark Theme Implementation**: Updated AuthViajeros page to match Portal Empresas dark theme with glassmorphism effects
- **Unified Portal Structure**: Portal Viajeros now uses identical HeaderButtons navigation and layout as Portal Empresas
- **Cross-Portal Authentication**: All empresa users can access Portal Viajeros seamlessly with same credentials