import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { storage } from './storage';
import type { Express } from 'express';

export function setupGoogleAuth(app: Express) {
  // Only setup if credentials are available
  const clientId = process.env.GOOGLE_CLIENT_ID || '10396090422-ttmfc1n33sfq35522k6tmeod9b1s6gnc.apps.googleusercontent.com';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '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';
  
  if (!clientId || !clientSecret) {
    console.log('Google OAuth credentials not found, skipping Google authentication setup');
    return;
  }

  passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await storage.getUserByEmail(profile.emails?.[0]?.value || '');
      
      if (!user) {
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
      }
      
      return done(null, user);
    } catch (error) {
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
    passport.authenticate('google', { failureRedirect: '/auth/empresas' }),
    (req, res) => {
      // Successful authentication, redirect to Portal Empresas dashboard
      res.redirect('/portal-empresas');
    }
  );

  console.log('Google OAuth authentication configured successfully');
}