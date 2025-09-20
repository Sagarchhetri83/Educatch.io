# Complete Firebase Google Authentication Setup Guide for EduCatch

This is a comprehensive, step-by-step guide to set up Firebase Authentication with Google Sign-In for the EduCatch application.

## Prerequisites
- A Google account
- Access to the Firebase Console
- The EduCatch project files
- A modern web browser

## Step 1: Create Firebase Project

### 1.1 Access Firebase Console
1. **Open your web browser**
2. **Go to Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
3. **Sign in** with your Google account
4. **Click "Go to console"** if prompted

### 1.2 Create New Project
1. **Click "Create a project"** or "Add project" button
2. **Enter project name**: `educatch-app` (or your preferred name)
3. **Click "Continue"**
4. **Configure Google Analytics**:
   - Toggle ON if you want analytics (recommended)
   - Toggle OFF if you don't need it
5. **Click "Create project"**
6. **Wait for project creation** (30-60 seconds)
7. **Click "Continue"** when ready

### 1.3 Verify Project Creation
- You should see the Firebase project dashboard
- Note the project ID (you'll need this later)

## Step 2: Enable Authentication

### 2.1 Navigate to Authentication
1. **In the Firebase Console** (left sidebar)
2. **Click "Authentication"**
3. **Click "Get started"** button
4. **Wait for Authentication to initialize**

### 2.2 Access Sign-in Methods
1. **Click on "Sign-in method" tab**
2. **You'll see a list of authentication providers**
3. **Look for "Google" in the list**

## Step 3: Enable Google Authentication

### 3.1 Configure Google Provider
1. **Find "Google" in the provider list**
2. **Click on the "Google" row** (not the toggle switch yet)
3. **A configuration panel will open**

### 3.2 Enable Google Sign-In
1. **Toggle the "Enable" switch** to ON (right side)
2. **A form will appear below**

### 3.3 Configure Project Support Email
1. **In the "Project support email" field**
2. **Enter your email address** (e.g., yourname@gmail.com)
3. **This email will be shown to users during sign-in**

### 3.4 Save Configuration
1. **Click "Save"** button
2. **Wait for confirmation** (green checkmark)
3. **Google authentication is now enabled**

### 3.5 Verify Google Provider
- You should see "Google" with a green checkmark
- Status should show "Enabled"

## Step 4: Configure Authorized Domains

### 4.1 Access Authentication Settings
1. **In Firebase Console** → **Authentication**
2. **Click on "Settings" tab** (next to "Sign-in method")
3. **Scroll down to find "Authorized domains" section**

### 4.2 Add Local Development Domain
1. **Click "Add domain" button**
2. **Enter domain**: `localhost`
3. **Click "Add"**
4. **Verify it appears in the list**

### 4.3 Add Additional Domains (Optional)
1. **For testing on different ports**: `localhost:3000`, `localhost:5173`
2. **For production**: `yourdomain.com`, `www.yourdomain.com`
3. **For staging**: `staging.yourdomain.com`

### 4.4 Verify Domain Configuration
- All domains should appear in the "Authorized domains" list
- Each domain should have a green checkmark

## Step 5: Get Firebase Configuration

### 5.1 Access Project Settings
1. **In Firebase Console** (top left)
2. **Click the gear icon (⚙️)** next to "Project Overview"
3. **Select "Project settings"** from dropdown

### 5.2 Add Web App
1. **Scroll down to "Your apps" section**
2. **Click the web icon (</>)** to add a web app
3. **If you already have a web app, skip to Step 5.4**

### 5.3 Register New Web App
1. **Enter app nickname**: `EduCatch Web App`
2. **Check "Also set up Firebase Hosting"** (optional, for deployment)
3. **Click "Register app"**
4. **Wait for app registration**

### 5.4 Get Configuration Code
1. **You'll see a configuration object** like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyBBE0avQNvYmpJx6FHSCd2BxuYLvkAxSuo",
     authDomain: "educatch-app.firebaseapp.com",
     projectId: "educatch-app",
     storageBucket: "educatch-app.firebasestorage.app",
     messagingSenderId: "36767394482",
     appId: "1:36767394482:web:0f6aaaa2d2140fa1e937ab",
     measurementId: "G-T0W1ESPZEQ"
   }
   ```

### 5.5 Copy Configuration
1. **Copy the entire configuration object**
2. **Keep this window open** for reference

### 5.6 Update Your Code Files
1. **Open `public/dashboard.html`**
2. **Find the firebaseConfig object** (around line 142)
3. **Replace with your actual configuration**
4. **Open `src/firebase.js`**
5. **Replace the configuration there too**
6. **Save both files**

## Step 6: Configure OAuth Consent Screen

### 6.1 Access Google Cloud Console
1. **Open new tab** in your browser
2. **Go to Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
3. **Sign in** with the same Google account
4. **Select your Firebase project** from the dropdown (top left)

### 6.2 Navigate to OAuth Consent Screen
1. **In the left sidebar**, click "APIs & Services"
2. **Click "OAuth consent screen"**
3. **You'll see the consent screen configuration**

### 6.3 Configure User Type
1. **Choose "External"** user type
2. **Click "Create"**
3. **This allows any Google user to sign in**

### 6.4 Fill Required Information
1. **App name**: `EduCatch`
2. **User support email**: Select your email from dropdown
3. **App logo**: (optional, can skip for now)
4. **App domain**: (optional, can skip for now)
5. **Developer contact information**: Enter your email
6. **Click "Save and Continue"**

### 6.5 Configure Scopes
1. **Click "Add or Remove Scopes"**
2. **Add these scopes**:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`
3. **Click "Update"**
4. **Click "Save and Continue"**

### 6.6 Add Test Users
1. **Click "Add Users"**
2. **Enter your email address**
3. **Click "Add"**
4. **Click "Save and Continue"**

### 6.7 Review and Submit
1. **Review all information**
2. **Click "Back to Dashboard"**
3. **Your OAuth consent screen is configured**

## Step 7: Test Google Authentication

### 7.1 Start Development Server
1. **Open terminal/command prompt**
2. **Navigate to your project directory**:
   ```bash
   cd "D:\Vs code\Educatch"
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Wait for server to start** (you'll see "Local: http://localhost:5173/")

### 7.2 Open Dashboard
1. **Open your browser**
2. **Go to**: `http://localhost:5173/dashboard.html`
3. **You should see the sign-in modal**

### 7.3 Test Google Sign-In
1. **Click "Continue with Google"** button
2. **Google sign-in popup will open**
3. **Select your Google account**
4. **Click "Allow"** to grant permissions
5. **Popup will close automatically**
6. **You should be redirected to the dashboard**

### 7.4 Verify Success
- **Dashboard should be visible**
- **Welcome message should show your name**
- **No error messages in console**

## Step 8: Troubleshooting Common Issues

### 8.1 "This app is not verified" Warning
**What it means**: Google shows this for unverified apps
**Solution**:
1. **Click "Advanced"** in the warning popup
2. **Click "Go to [app name] (unsafe)"**
3. **This is normal for development**

### 8.2 "Error 400: redirect_uri_mismatch"
**What it means**: Domain not authorized
**Solution**:
1. **Go to Firebase Console** → **Authentication** → **Settings**
2. **Check "Authorized domains"**
3. **Make sure `localhost` is listed**
4. **Add `localhost:5173` if needed**

### 8.3 "Error 403: access_denied"
**What it means**: OAuth consent screen issue
**Solution**:
1. **Go to Google Cloud Console** → **OAuth consent screen**
2. **Verify all required fields are filled**
3. **Check that scopes are added**
4. **Add your email as test user**

### 8.4 Google Sign-In Button Not Working
**What it means**: JavaScript error or configuration issue
**Solution**:
1. **Open browser console** (F12)
2. **Look for error messages**
3. **Check Firebase configuration**
4. **Verify Google provider is enabled**

### 8.5 "Firebase: Error (auth/popup-closed-by-user)"
**What it means**: User closed the popup
**Solution**:
1. **This is normal user behavior**
2. **No action needed**
3. **User can try again**

## Step 9: Debug Steps

### 9.1 Check Browser Console
1. **Open Developer Tools** (F12)
2. **Go to "Console" tab**
3. **Look for red error messages**
4. **Check "Network" tab for failed requests**

### 9.2 Verify Firebase Configuration
1. **Check `public/dashboard.html`** (around line 142)
2. **Verify all config values match Firebase Console**
3. **Ensure project ID is correct**

### 9.3 Test in Incognito Mode
1. **Open incognito/private window**
2. **Go to `http://localhost:5173/dashboard.html`**
3. **Try Google sign-in**
4. **This eliminates cache issues**

### 9.4 Check Firebase Console
1. **Go to Firebase Console** → **Authentication** → **Users**
2. **Look for your test user**
3. **Check if user was created successfully**

## Step 10: Production Deployment

### 10.1 Add Production Domains
1. **Firebase Console** → **Authentication** → **Settings**
2. **Add your production domain** (e.g., `yourdomain.com`)
3. **Add `www.yourdomain.com` if needed**

### 10.2 Update OAuth Consent Screen
1. **Google Cloud Console** → **OAuth consent screen**
2. **Add production domain to authorized domains**
3. **Submit for verification** (optional)

### 10.3 Environment Variables
1. **Create `.env` file** in project root
2. **Add Firebase config**:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   ```
3. **Update code to use environment variables**

## Step 11: Final Verification Checklist

### ✅ Firebase Console Setup
- [ ] Project created successfully
- [ ] Authentication enabled
- [ ] Google provider enabled
- [ ] Authorized domains configured
- [ ] Web app registered

### ✅ Google Cloud Console Setup
- [ ] OAuth consent screen configured
- [ ] Required scopes added
- [ ] Test users added
- [ ] App information filled

### ✅ Code Configuration
- [ ] Firebase config updated in `dashboard.html`
- [ ] Firebase config updated in `firebase.js`
- [ ] Google authentication code added
- [ ] All files saved

### ✅ Testing
- [ ] Development server running
- [ ] Dashboard page loads
- [ ] Google sign-in button visible
- [ ] Google popup opens
- [ ] Authentication successful
- [ ] Dashboard shows after sign-in
- [ ] No console errors

## Support and Additional Help

### If You Still Have Issues:
1. **Check Firebase Console** for error logs
2. **Review browser console** for JavaScript errors
3. **Verify all configuration steps** are completed
4. **Test with a fresh browser profile**
5. **Try different browsers** (Chrome, Firefox, Edge)

### Useful Resources:
- [Firebase Documentation](https://firebase.google.com/docs/auth/web/google-signin)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**🎉 Congratulations!** If you've completed all steps successfully, your Google authentication should be working perfectly. Users can now sign in with their Google accounts and access the EduCatch dashboard.

**Note**: This setup is optimized for development. For production deployment, ensure you follow security best practices and configure appropriate security rules.