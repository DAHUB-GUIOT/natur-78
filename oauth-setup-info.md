# Google OAuth Setup Information

## Required Callback URI:
```
https://377c8a7a-2e8b-4984-a78e-326b650e3978-00-3hhd6ygsrp585.picard.replit.dev/api/auth/google/callback
```

## Google Cloud Console Setup Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application type: "Web application"
6. Add Authorized redirect URI: (copy the callback URI above)
7. Save and copy your Client ID and Client Secret

## Current JavaScript Implementation:

### Backend (server/googleAuth.ts):
- Passport.js Google OAuth 2.0 strategy
- Session-based user authentication
- Automatic user creation/login
- Redirects to Portal Empresas dashboard after login

### Frontend (client/src/pages/Auth.tsx):
- Google OAuth button in Portal Empresas login
- Fallback to email/password authentication
- Loading states and error handling
- Clean white button design with Google branding

### Routes:
- `/api/auth/google` - Initiates OAuth flow
- `/api/auth/google/callback` - Handles OAuth callback
- Successful login redirects to `/portal-empresas?auth=success`

## Environment Variables Needed:
- GOOGLE_CLIENT_ID: [Your new Client ID]
- GOOGLE_CLIENT_SECRET: [Your new Client Secret]

## Current Status:
- OAuth infrastructure ready
- Waiting for new credentials
- Email/password authentication working as backup