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

  // Get the current domain from environment or headers
  const replitDomain = process.env.REPLIT_DOMAINS?.split(',')[0];
  const domain = replitDomain || 'localhost:5000';
  
  // Ensure we use the correct protocol and domain for Replit
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
          firstName: profile.name?.givenName || profile.displayName?.split(' ')[0] || 'User',
          lastName: profile.name?.familyName || profile.displayName?.split(' ')[1] || 'Google',
          profilePicture: profile.photos?.[0]?.value || null,
          authProvider: 'google' as const,
          role: 'empresa' as const, // Default to empresa for Google users
          isActive: true
        };
        
        user = await storage.createGoogleUser(userData);
        console.log('New Google user created:', user.id);
        
        // Auto-create user profile with Google data
        const profileData = {
          userId: user.id,
          fullName: profile.displayName || `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim(),
          userCategory: 'startup', // Default category
          phone: '', // User can update later
          whatsapp: '', // User can update later
          website: '', // User can update later
          linkedin: '', // User can update later
          bio: `${profile.displayName} - Nuevo miembro de Festival NATUR`, // Default bio
          description: '',
        };
        
        try {
          await storage.createUserProfile(profileData);
          console.log('Auto-created user profile from Google data');
        } catch (error) {
          console.error('Failed to create user profile:', error);
        }
      } else {
        console.log('Existing user found:', user.id);
        
        // Update user's Google ID and profile picture if missing
        if (!user.googleId || !user.profilePicture) {
          await storage.updateUser(user.id, {
            googleId: user.googleId || profile.id,
            profilePicture: user.profilePicture || profile.photos?.[0]?.value || null,
            firstName: user.firstName || profile.name?.givenName || null,
            lastName: user.lastName || profile.name?.familyName || null,
          });
        }
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
        // Redirect based on user role
        const user = req.user as any;
        const redirectUrl = user?.role === 'empresa' ? '/portal-empresas?auth=success' : '/portal-viajeros?auth=success';
        res.redirect(redirectUrl);
      }
    }
  );

  console.log('Google OAuth authentication configured successfully');
}