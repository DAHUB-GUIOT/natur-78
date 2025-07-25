# Festival NATUR - User Roles & Permissions Documentation

## 1. User Types (Roles)

### A. Usuario Viajero (Traveler)
- **Role**: `viajero`
- **Main Purpose**: Browse and book sustainable tourism experiences
- **Access**: Portal Viajeros marketplace interface

### B. Usuario Empresa (Business/Company)
- **Role**: `empresa`
- **Main Purpose**: Create and manage sustainable tourism experiences
- **Access**: Portal Empresas business dashboard

### C. Usuario Admin (Administrator)
- **Role**: `admin`
- **Main Purpose**: Platform management and oversight
- **Access**: Portal Empresas + Admin Panel

## 2. User Categories & Subtypes

### For All User Types:
- **Startups**: idea stage, MVP, growth, established
- **Investors**: angel, VC, impact investor, corporate
- **Mentors**: business, technical, marketing, sustainability
- **Ecosystem**: NGOs, agencies, operators, institutions
- **Digital Nomads**: content creators, remote workers, community leaders
- **Attendees**: tourists, students, citizens

## 3. Functions by Role

### Usuario Viajero Functions:
1. **Browse Experiences**
   - View map with experience markers
   - Filter by category (aventura, naturaleza, cultura, gastronomía, etc.)
   - Search experiences by location, price, duration
   
2. **Manage Favorites**
   - Save experiences to favorites list
   - Remove from favorites
   
3. **Make Reservations**
   - Book experiences
   - View booking history
   - Cancel reservations (based on policies)
   
4. **Messaging**
   - Contact experience providers
   - Ask questions about experiences
   
5. **Profile Management**
   - Update personal information
   - Set preferences
   - View purchase history

### Usuario Empresa Functions:
1. **Experience Management**
   - Create new experiences (6-step wizard)
   - Edit existing experiences
   - Duplicate experiences
   - Archive/delete experiences
   
2. **Company Profile**
   - Create/update company information
   - Add certifications
   - Upload logo and cover images
   
3. **Sales Dashboard**
   - View booking statistics
   - Track revenue
   - Monitor performance metrics
   
4. **Messaging Center**
   - Respond to traveler inquiries
   - Manage conversations
   - Send promotional messages
   
5. **Analytics**
   - View experience performance
   - Track conversion rates
   - Monitor customer ratings

### Usuario Admin Functions:
1. **User Management**
   - View all users
   - Change user roles (viajero ↔ empresa ↔ admin)
   - Activate/deactivate accounts
   - View user activity logs
   
2. **Experience Moderation**
   - Approve pending experiences
   - Reject inappropriate content
   - Archive old experiences
   - Edit any experience
   
3. **Platform Statistics**
   - Total users, new users today
   - Active companies
   - Experience metrics
   - Revenue reports
   
4. **Company Verification**
   - Verify business legitimacy
   - Approve certifications
   - Manage verified badges

## 4. Permissions Matrix

| Feature | Viajero | Empresa | Admin |
|---------|---------|---------|-------|
| Browse public experiences | ✓ | ✓ | ✓ |
| Book experiences | ✓ | ✓ | ✓ |
| Create experiences | ✗ | ✓ | ✓ |
| Edit own experiences | ✗ | ✓ | ✓ |
| Edit any experience | ✗ | ✗ | ✓ |
| View all users | ✗ | ✗ | ✓ |
| Change user roles | ✗ | ✗ | ✓ |
| Access admin panel | ✗ | ✗ | ✓ |
| Create company profile | ✗ | ✓ | ✓ |
| Send messages | ✓ | ✓ | ✓ |
| View platform stats | ✗ | ✗ | ✓ |
| Approve experiences | ✗ | ✗ | ✓ |
| Access sales data | ✗ | Own only | All |

## 5. API Endpoints by Role

### Public Endpoints (All Users):
- `GET /api/experiences/public` - Browse experiences
- `GET /api/experiences/:id` - View experience details
- `POST /api/auth/register` - Register new account
- `POST /api/auth/login` - Login

### Authenticated Endpoints (Logged-in Users):
- `GET /api/auth/me` - Get current user
- `PUT /api/users/profile` - Update profile
- `GET /api/messages` - View messages
- `POST /api/messages` - Send message

### Empresa Endpoints:
- `POST /api/experiences` - Create experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience
- `GET /api/companies/me` - Get company profile
- `PUT /api/companies/me` - Update company

### Admin Endpoints:
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user (role, status)
- `GET /api/admin/experiences` - List all experiences
- `PUT /api/admin/experiences/:id` - Moderate experience
- `GET /api/admin/logs` - View admin actions

## 6. Authentication Flow

1. **Registration**:
   - Email/password or Google OAuth
   - Default role: `viajero`
   - Select user category and subcategory
   - Complete profile information

2. **Role Upgrade**:
   - Viajero → Empresa: Via registration or admin
   - Any → Admin: Only by existing admin

3. **Session Management**:
   - Server-side sessions
   - PostgreSQL session storage
   - Secure cookie-based

## 7. Testing Credentials

- **Admin**: admin@festivalnatur.com / admin123
- **Empresa**: empresa@test.com / test123
- **Viajero**: viajero@test.com / test123

## 8. Security Considerations

- Role-based middleware protection
- Admin actions are logged
- Sensitive operations require re-authentication
- API rate limiting per role
- Input validation on all endpoints