# Authentication System

This document describes the authentication system implemented in the ReWear application.

## Pages

### 1. Login Page (`/login`)
- **Location**: `app/(pages)/Login.tsx`
- **Features**:
  - Username/email and password login
  - Google OAuth integration (mock implementation)
  - Form validation
  - Loading states with animations
  - Link to signup page

### 2. Signup Page (`/signup`)
- **Location**: `app/(pages)/Signup.tsx`
- **Features**:
  - Username, email, password, and confirm password fields
  - Real-time form validation
  - Username availability checking
  - Google OAuth signup (mock implementation)
  - Link to login page

### 3. Setup Username Page (`/setup-username`)
- **Location**: `app/(pages)/SetupUsername.tsx`
- **Features**:
  - Username confirmation/modification after signup
  - Real-time availability checking with debouncing
  - Pre-filled with suggested username from email
  - Skip option for users who want to use email as identifier

### 4. Dashboard (`/dashboard`)
- **Location**: `app/(pages)/Dashboard.tsx`
- **Features**:
  - Welcome page for authenticated users
  - Quick action cards for main features
  - Community impact statistics
  - Responsive design with animations

## Navigation Components

### Public Navbar (`app/components/Navbar.tsx`)
- Shows login and signup buttons
- Used on public pages

### Authenticated Navbar (`app/components/AuthNavbar.tsx`)
- Shows user menu with profile options
- Navigation links for browse, sell, trade
- Mobile-responsive with hamburger menu
- Used on authenticated pages

## Authentication Flow

1. **User visits the site** → Public navbar with login/signup buttons
2. **User clicks signup** → Signup form with validation
3. **User completes signup** → Redirected to setup username page
4. **User confirms username** → Redirected to dashboard
5. **User is now authenticated** → Authenticated navbar with user menu

## Current Implementation Status

### ✅ Implemented
- Complete UI for all authentication pages
- Form validation and error handling
- Loading states and animations
- Responsive design
- Navigation between pages
- Mock Google OAuth integration

### 🔄 Mock/Placeholder
- Google OAuth (currently mocked)
- Backend API calls (currently simulated)
- User session management
- Database operations

### 🚧 To Be Implemented
- Real Google OAuth integration
- Backend API endpoints
- User session management with NextAuth.js
- Database schema and operations
- Password hashing and security
- Email verification
- Password reset functionality

## Styling

The authentication pages use:
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Custom color palette**:
  - `forest`: #2E7D32 (primary green)
  - `mint`: #A5D6A7 (light green)
  - `charcoal`: #212121 (dark text)
  - `basewhite`: #F5F5F5 (background)

## Next Steps

1. **Integrate NextAuth.js** for real authentication
2. **Set up Google OAuth** credentials
3. **Create backend API** endpoints for user management
4. **Implement database** schema for users
5. **Add email verification** flow
6. **Implement password reset** functionality
7. **Add session management** and protected routes

## Usage

To test the authentication flow:

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Sign Up" to test the signup flow
4. Click "Login" to test the login flow
5. Navigate through the setup username process
6. View the dashboard with authenticated navigation

All forms currently use mock data and will log to the console instead of making real API calls. 