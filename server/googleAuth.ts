import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { storage } from './storage';

export function setupGoogleAuth() {
  // Only setup Google OAuth if credentials are available
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('Google OAuth credentials not found, skipping Google authentication setup');
    return;
  }

  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this Google ID
      let user = await storage.getUserByGoogleId(profile.id);
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with this email (for linking accounts)
      user = await storage.getUserByEmail(profile.emails?.[0]?.value || '');
      
      if (user && user.authProvider === 'local') {
        // Link Google account to existing local account
        // For now, we'll create a new account - you can implement linking logic here
        return done(new Error('Email already exists with local account. Please sign in with email/password.'));
      }
      
      // Create new user
      const userData = {
        email: profile.emails?.[0]?.value || '',
        googleId: profile.id,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        profilePicture: profile.photos?.[0]?.value || '',
      };
      
      user = await storage.createGoogleUser(userData);
      return done(null, user);
      
    } catch (error) {
      return done(error);
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
      done(error);
    }
  });
}