# Google OAuth Fix Instructions

## Current Issue
Error 400: redirect_uri_mismatch - The callback URL in Google Cloud Console doesn't match your current Replit domain.

## Your Google OAuth Client ID
`10396090422-muuum7g15jqpen49hrauipchr836jtes.apps.googleusercontent.com`

## Required Callback URL (Current Replit Domain)
```
https://377c8a7a-2e8b-4984-a78e-326b650e3978-00-3hhd6ygsrp585.picard.replit.dev/api/auth/google/callback
```

## Steps to Fix

1. **Open Google Cloud Console**
   - Go to: https://console.cloud.google.com/

2. **Navigate to Credentials**
   - Click: APIs & Services → Credentials

3. **Find Your OAuth Client**
   - Look for: `10396090422-muuum7g15jqpen49hrauipchr836jtes.apps.googleusercontent.com`
   - Click the **Edit** button (pencil icon)

4. **Update Authorized Redirect URIs**
   - In the "Authorized redirect URIs" section
   - Add or replace with: `https://377c8a7a-2e8b-4984-a78e-326b650e3978-00-3hhd6ygsrp585.picard.replit.dev/api/auth/google/callback`
   - Click **SAVE**

5. **Test the Fix**
   - Return to your app and try Google OAuth login again
   - The redirect_uri_mismatch error should be resolved

## Alternative: Use Your Own Google Project
If you prefer to use your own Google Cloud project:
1. Create a new OAuth 2.0 Client ID in your Google Cloud Console
2. Use the callback URL above
3. Provide the new Client ID and Client Secret as environment variables

## Current Status
- OAuth infrastructure is properly configured in the app
- Only the Google Cloud Console redirect URI needs updating
- All other authentication methods work correctly