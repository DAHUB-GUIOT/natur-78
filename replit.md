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
- **Unified Authentication**: A single system for both "Empresas" (businesses) and "Con-Sentidos" (travelers), with distinct themed login/registration flows.
- **Interactive Map**: Features a Mapbox-based 3D map with natural terrain and custom markers for businesses and experiences, serving as a central navigation element.
- **Comprehensive Directories**:
    - **Portal Empresas (B2B)**: A dashboard for businesses to manage profiles, experiences, and network. Features include enhanced profiles (Twitter/X-style), real-time search, and a streamlined contact directory.
    - **Portal Viajeros (B2C)**: A marketplace for travelers to browse, filter, and book sustainable tourism experiences.
- **Experience Management**: A detailed 6-step wizard for businesses to create and manage their offerings, including complex pricing and operational details.
- **Messaging System**: A simple, B2B-focused chat system allowing direct communication between users and companies.
- **Event Agenda**: A two-division agenda (VIVE NATUR and NATUR PRO) integrating cultural activities, with customizable filtering and brutalist design.
- **Ticket Sales**: A dedicated tickets page with different access tiers (VIVE NATUR, NATUR PRO) and clear feature differentiation.
- **User Categories**: Robust classification for users, including Agencias u Operadores Turísticos, Alojamientos Sostenibles, Gastronomía Sostenible, Movilidad y Transporte Ecológico, ONG y Fundaciones, Educación y Sensibilización Ambiental, Tecnología para el Turismo Sostenible, and Aliados y Patrocinadores, each with specialized subcategories.
- **Admin Dashboard**: A comprehensive panel for user management, experience approval, and platform statistics.
- **Accessibility Enhancement**: Comprehensive accessibility features including high contrast modes (normal, high, ultra, inverted), font size adjustment, reduced motion options, link underlining, enhanced focus visibility, and keyboard navigation support with WCAG 2.1 compliance.
- **Visuals & UX**: Consistent application of glassmorphism, brutalist design elements, and a white/dark theme contrast, with a focus on high contrast and simplified typography for improved readability and user experience.

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