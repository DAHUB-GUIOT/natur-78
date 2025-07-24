import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { storage } from './storage';
import type { Express } from 'express';

export function setupGoogleAuth(app: Express) {
  // Check for Google OAuth credentials
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.log('Google OAuth credentials not found, skipping Google authentication setup');
    console.log('To enable Google login, please provide GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
    return;
  }

  const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000';
  const callbackURL = domain.includes('localhost') 
    ? `http://${domain}/api/auth/google/callback`
    : `https://${domain}/api/auth/google/callback`;

  console.log(`Google OAuth Callback URL: ${callbackURL}`);
  console.log(`Add this URL to your Google Cloud Console authorized redirect URIs: ${callbackURL}`);

  passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google OAuth profile received:', {
        id: profile.id,
        email: profile.emails?.[0]?.value,
        name: profile.displayName
      });
      
      // Check if user already exists
      let user = await storage.getUserByEmail(profile.emails?.[0]?.value || '');
      
      if (!user) {
        console.log('Creating new Google user');
        // Create new user with Google OAuth data
        const userData = {
          email: profile.emails?.[0]?.value || '',
          googleId: profile.id,
          firstName: profile.name?.givenName || null,
          lastName: profile.name?.familyName || null,
          profilePicture: profile.photos?.[0]?.value || null,
          authProvider: 'google' as const
        };
        
        user = await storage.createGoogleUser(userData);
        console.log('New Google user created:', user.id);
      } else {
        console.log('Existing user found:', user.id);
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, false);
    }
  }));

  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google auth routes
  app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/empresas?error=auth_failed' }),
    (req, res) => {
      console.log('Google OAuth callback successful, user authenticated');
      console.log('User:', req.user);
      // Successful authentication, redirect to Portal Empresas dashboard
      res.redirect('/portal-empresas?auth=success');
    }
  );

  console.log('Google OAuth authentication configured successfully');
}