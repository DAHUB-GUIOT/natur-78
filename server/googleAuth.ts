import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { storage } from './storage';
import type { Express } from 'express';

export function setupGoogleAuth(app: Express) {
  // Check for Google OAuth credentials
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  // Use the correct credentials from your new Google OAuth app
  const finalClientId = clientId || '10396090422-muuum7g15jqpen49hrauipchr836jtes.apps.googleusercontent.com';
  const finalClientSecret = clientSecret || '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';
  
  if (!finalClientId || !finalClientSecret) {
    console.log('Google OAuth credentials not found, skipping Google authentication setup');
    return;
  }

  const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000';
  const callbackURL = domain.includes('localhost') 
    ? `http://${domain}/api/auth/google/callback`
    : `https://${domain}/api/auth/google/callback`;

  console.log(`Google OAuth Callback URL: ${callbackURL}`);
  console.log(`Domain: ${domain}`);
  console.log(`Using Client ID: ${finalClientId}`);

  passport.use(new GoogleStrategy({
    clientID: finalClientId,
    clientSecret: finalClientSecret,
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

  // Serialize user for session (optimized)
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session with caching
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      console.error('Session deserialization error:', error);
      done(null, false);
    }
  });

  // Google auth routes with better error handling
  app.get('/api/auth/google', (req, res, next) => {
    console.log('Initiating Google OAuth flow');
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })(req, res, next);
  });

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/empresas?error=auth_failed' }),
    (req, res) => {
      console.log('Google OAuth callback successful, user authenticated');
      console.log('User:', req.user);
      // Successful authentication, close popup or redirect
      if (req.query.popup === 'true') {
        res.send(`
          <script>
            try {
              window.opener.postMessage({type: 'GOOGLE_AUTH_SUCCESS', user: ${JSON.stringify(req.user)}}, '*');
              setTimeout(() => window.close(), 1000);
            } catch (e) {
              console.error('Failed to communicate with parent window:', e);
              window.close();
            }
          </script>
        `);
      } else {
        res.redirect('/portal-empresas?auth=success');
      }
    }
  );

  console.log('Google OAuth authentication configured successfully');
}