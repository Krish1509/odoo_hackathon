# Backend Setup Guide for ReWear

This guide will help you set up the complete backend authentication system with MongoDB for your ReWear application.

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install mongodb mongoose bcryptjs @types/bcryptjs
```

### Step 2: Set Up Environment Variables
Create a `.env.local` file in your project root:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/rewear
# For MongoDB Atlas (cloud): mongodb+srv://username:password@cluster.mongodb.net/rewear

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Secret (for password reset tokens)
JWT_SECRET=your-jwt-secret-key-change-this-in-production
```

### Step 3: Set Up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create database: `rewear`

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env.local`

### Step 4: Generate Secrets
```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate JWT secret
openssl rand -base64 32
```

## 📁 File Structure

```
rewear/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts          # NextAuth configuration
│   │       ├── signup/
│   │       │   └── route.ts          # User registration API
│   │       └── check-username/
│   │           └── route.ts          # Username availability check
│   ├── login/
│   │   └── page.tsx                  # Login page
│   ├── signup/
│   │   └── page.tsx                  # Signup page
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard page
│   ├── providers.tsx                 # NextAuth SessionProvider
│   └── layout.tsx                    # Root layout
├── lib/
│   └── mongodb.ts                    # MongoDB connection utility
├── models/
│   └── User.ts                       # User model with Mongoose
├── types/
│   └── next-auth.d.ts               # NextAuth type extensions
└── .env.local                        # Environment variables
```

## 🔧 Configuration Details

### MongoDB Connection (`lib/mongodb.ts`)
- Handles database connection with connection pooling
- Prevents multiple connections in development
- Error handling and logging

### User Model (`models/User.ts`)
- Mongoose schema with validation
- Password hashing with bcrypt
- Username and email uniqueness
- Support for OAuth and credentials providers

### NextAuth Configuration (`app/api/auth/[...nextauth]/route.ts`)
- Google OAuth provider
- Custom credentials provider
- User creation and management
- Session and JWT callbacks

## 🔐 Authentication Features

### ✅ Implemented
- **User Registration**: Email, username, password
- **User Login**: Username/email + password
- **Google OAuth**: Sign in with Google
- **Password Hashing**: Secure bcrypt hashing
- **Username Validation**: Real-time availability checking
- **Session Management**: JWT-based sessions
- **Form Validation**: Client and server-side validation

### 🔄 API Endpoints

#### POST `/api/auth/signup`
Creates a new user account
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### POST `/api/auth/check-username`
Checks username availability
```json
{
  "username": "johndoe"
}
```

#### POST `/api/auth/[...nextauth]`
NextAuth endpoints for login, logout, and OAuth

## 🛠️ Development Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Authentication Flow
1. Visit `http://localhost:3000`
2. Click "Sign Up" to create account
3. Fill out the form and submit
4. You'll be automatically logged in and redirected to dashboard

### 3. Test Google OAuth (Optional)
1. Set up Google OAuth credentials
2. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env.local`
3. Test "Sign in with Google" button

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Mongoose ODM
- **XSS Protection**: Next.js built-in protection
- **CSRF Protection**: NextAuth built-in protection
- **Session Security**: JWT with secure configuration

## 🚀 Production Deployment

### 1. Environment Variables
Update `.env.local` for production:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rewear
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
```

### 2. MongoDB Atlas Setup
1. Create production cluster
2. Set up network access (IP whitelist)
3. Create database user with read/write permissions
4. Get connection string

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `https://yourdomain.com/api/auth/callback/google`
4. Update environment variables

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or check connection string

#### 2. NextAuth Secret Error
```
Error: Please define the NEXTAUTH_SECRET environment variable
```
**Solution**: Add `NEXTAUTH_SECRET` to `.env.local`

#### 3. Google OAuth Error
```
Error: Invalid client
```
**Solution**: Check Google OAuth credentials and redirect URIs

#### 4. Username Already Taken
```
Error: Username is already taken
```
**Solution**: Choose a different username or check database

### Debug Mode
Add to `.env.local`:
```env
DEBUG=next-auth:*
```

## 📚 Next Steps

1. **Email Verification**: Add email verification flow
2. **Password Reset**: Implement password reset functionality
3. **Profile Management**: Add user profile CRUD operations
4. **Role-Based Access**: Implement user roles and permissions
5. **Rate Limiting**: Add API rate limiting
6. **Logging**: Add comprehensive logging
7. **Testing**: Add unit and integration tests

## 🆘 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running and accessible
4. Check NextAuth documentation for advanced configuration

## 📖 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) 