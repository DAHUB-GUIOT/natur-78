# Festival NATUR - Full Stack Application

## Overview
Festival NATUR is a full-stack web application creating an ecosystem for sustainable tourism and regenerative practices. It connects startups, investors, mentors, digital nomads, and other stakeholders. The platform offers modules for networking, education, a marketplace, experiences, fundraising, and an accelerator program, aiming to be the leading resource for sustainable tourism, fostering connections and facilitating growth within the sector.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, Vite build tool, Wouter for routing.
- **Styling**: Tailwind CSS with a custom design system, `font-gasoek` and `Unbounded` fonts.
- **UI Components**: Radix UI and shadcn/ui.
- **State Management**: React Context for authentication, TanStack Query for server state.
- **Form Handling**: React Hook Form with Zod validation.
- **Design Philosophy**: Emphasizes brutalist and glassmorphism aesthetics. Features include organic background textures, interactive cards, and consistent typography. White themes are used for marketplace and dashboards, with dark themes for immersive experiences.
- **Color System**: Two-mode design token system using cream (#FCF8EE) for light mode, dark green (#0a1a0a) for dark mode, and NATUR brand green (#cad95e) as an accent.

### Backend Architecture
- **Runtime**: Node.js with TypeScript.
- **Framework**: Express.js for RESTful API.
- **Database ORM**: Drizzle ORM with PostgreSQL.
- **Security**: Proper client/server separation with API authentication and session management.

### Project Structure
- `client/`: Frontend React application
- `server/`: Backend Express API
- `shared/`: Shared types and schemas
- `migrations/`: Database migrations

### Key Features and Design Decisions
- **Unified Authentication**: Single system for "Portal Empresas" (businesses) and "Portal Viajeros" (travelers) with distinct login flows.
- **Interactive Map**: Mapbox-based 3D map with natural terrain and custom markers for businesses and experiences, serving as a central navigation element. Includes interactive company bubbles with real data and filtering.
- **Comprehensive Directories**:
    - **Portal Empresas (B2B)**: Minimalist, mobile-first dashboard with full-screen interactive map, transparent header navigation, and optimized mobile views. Includes a 6-step wizard for businesses to create and manage offerings.
    - **Portal Viajeros (B2C)**: Marketplace for browsing, filtering, and booking sustainable tourism experiences.
- **Messaging System**: Simple, B2B-focused chat system.
- **Event Agenda**: Two-division agenda (VIVE NATUR and NATUR PRO) with filtering and brutalist design.
- **Ticket Sales**: Dedicated page with different access tiers.
- **User Categories**: Robust classification for various tourism sector roles with specialized subcategories.
- **Admin Dashboard**: Comprehensive panel for user management, experience approval, and platform statistics.
- **Accessibility Enhancement**: Comprehensive features including high contrast modes, font size adjustment, reduced motion, link underlining, enhanced focus, and keyboard navigation (WCAG 2.1 compliant).
- **Visuals & UX**: Consistent application of glassmorphism, brutalist design elements, and white/dark theme contrast, focusing on high contrast and simplified typography.
- **7-Step User Flow System**: Complete user journey from registration to traveler map visibility with automatic feature activation, progress tracking, and verification levels.
- **Facebook-Style Profile System**: Redesigned profile view with cover photo, circular profile picture, and Facebook-inspired layout. Includes a 4-tab edit profile system and a dedicated configuration page for account management, notifications, and privacy settings.

## Recent Changes

### Registration System Expansion (September 2025)
- **New Tourism Categories**: Added Guía de turismo, Intérprete de idiomas, and DMC (Destination Management Company) to expand professional coverage
- **Enhanced Subcategories**: Integrated Turismo comunitario, Turismo regenerativo, and Turismo de naturaleza as specialized tourism types
- **Streamlined Registration Flow**: Reduced from 10+ steps to 4 essential steps:
  1. Basic Information
  2. Company Information  
  3. Complete Profile Configuration
  4. Location & Emergency Contact
- **Smart Address Input**: Created MapboxAddressInput component with coordinate integration for Colombian cities
- **Regional City Selector**: Implemented CitySelector with Colombian cities organized by regions (Andina, Caribe, Pacífica, Orinoquía, Amazónica)
- **Enhanced Country Selection**: Updated CountrySelector with focus on Spanish-speaking countries and major tourism markets
- **Form Validation**: Integrated all new components with proper form validation and error handling

### Technical Improvements
- Comprehensive UX/UI optimization across all Portal Empresas views with proper spacing and mobile responsiveness
- Fixed overlapping elements and layout issues between sidebar, pages, and cards
- Enhanced map view with improved mobile map point visibility and coordinate validation
- Automated default values for removed registration steps to maintain data integrity

## External Dependencies

- `@neondatabase/serverless`: Serverless PostgreSQL connection
- `drizzle-orm`: Type-safe database ORM
- `@tanstack/react-query`: Server state management
- `wouter`: Lightweight routing
- `@radix-ui/*`: Accessible UI primitives
- `tailwindcss`: Utility-first CSS framework
- `react-hook-form`: Form state management
- `zod`: Schema validation
- `date-fns`: Date manipulation and formatting
- `ws`: WebSocket server
- `uuid`: Unique ID generation