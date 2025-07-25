// =====================================================
// COMPLETE GOOGLE OAUTH JAVASCRIPT IMPLEMENTATION
// =====================================================

// ===== BACKEND CODE (Node.js/Express) =====

// 1. Dependencies (already installed)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const session = require('express-session');

// 2. Google OAuth Strategy Setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://377c8a7a-2e8b-4984-a78e-326b650e3978-00-3hhd6ygsrp585.picard.replit.dev/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth profile received:', {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName
    });
    
    // Check if user already exists in your database
    let user = await getUserByEmail(profile.emails?.[0]?.value);
    
    if (!user) {
      // Create new user with Google OAuth data
      const userData = {
        email: profile.emails?.[0]?.value || '',
        googleId: profile.id,
        firstName: profile.name?.givenName || null,
        lastName: profile.name?.familyName || null,
        profilePicture: profile.photos?.[0]?.value || null,
        authProvider: 'google'
      };
      
      user = await createGoogleUser(userData);
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

// 3. Passport Session Setup
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    console.error('Session deserialization error:', error);
    done(null, false);
  }
});

// 4. Express Routes
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Google auth routes
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
    
    // Successful authentication, redirect to Portal Empresas dashboard
    res.redirect('/portal-empresas?auth=success');
  }
);

// ===== FRONTEND CODE (React) =====

// 1. Google OAuth Button Component
import React, { useState } from 'react';

const GoogleAuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    try {
      // Direct redirect to Google OAuth
      window.location.href = '/api/auth/google';
    } catch (error) {
      console.error('Auth redirect error:', error);
      setIsLoading(false);
    }
  };

  return (
    <button 
      type="button"
      className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm py-4 px-6 font-medium text-lg transition-all duration-200 rounded-lg flex items-center justify-center"
      onClick={handleGoogleAuth}
      disabled={isLoading}
    >
      {/* Google Icon SVG */}
      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {isLoading ? 'Conectando...' : 'Continuar con Google'}
    </button>
  );
};

// 2. Login Form with Google OAuth
const LoginForm = () => {
  return (
    <div className="space-y-6">
      {/* Regular email/password form */}
      <form className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border rounded-lg"
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="w-full p-3 border rounded-lg"
          required 
        />
        <button 
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">O continúa con</span>
        </div>
      </div>

      {/* Google OAuth Button */}
      <GoogleAuthButton />
    </div>
  );
};

// ===== ENVIRONMENT VARIABLES NEEDED =====
/*
GOOGLE_CLIENT_ID=your-new-client-id-here
GOOGLE_CLIENT_SECRET=your-new-client-secret-here
*/

// ===== GOOGLE CLOUD CONSOLE SETUP =====
/*
1. Go to: https://console.cloud.google.com/
2. Create new project or select existing
3. Enable Google+ API and Google OAuth2 API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Application type: Web application
6. Authorized redirect URIs: 
   https://377c8a7a-2e8b-4984-a78e-326b650e3978-00-3hhd6ygsrp585.picard.replit.dev/api/auth/google/callback
7. Save and copy Client ID and Client Secret
*/

export { GoogleAuthButton, LoginForm };