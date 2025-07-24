# Festival NATUR - Full Stack Application

## Overview

This is a full-stack web application for Festival NATUR, a sustainable tourism and regenerative practices platform. The application serves as a comprehensive ecosystem connecting startups, investors, mentors, digital nomads, and other stakeholders in the sustainable tourism space. It features multiple modules including networking, education, marketplace, experiences, fundraising, and an accelerator program.

**Migration Status**: Successfully migrated from Lovable to Replit (January 2025)

## Recent Changes

- ✅ **January 24, 2025**: Successfully completed migration from Lovable to Replit
  - Migrated from React Router to Wouter for better Replit compatibility
  - Replaced Supabase with PostgreSQL/Drizzle ORM backend
  - Created comprehensive database schema for users and profiles
  - Implemented secure server-side API endpoints with session management
  - Added "Corazón NATUR" button in registration flow that leads to Heart module after completion

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

### Platform Modules
1. **Platform Dashboard**: Impact indicators, news, quick access
2. **Networking**: User search, community features, forums
3. **Education**: Guides, workshops, certifications, collaborative content
4. **Marketplace**: Sustainable products from local communities
5. **Experiences**: Regenerative tourism experiences and custom trip planning
6. **Fundraising (Heart)**: Donation campaigns, subscription plans, regenerative projects
7. **Accelerator**: Startup acceleration program with tools and mentorship

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