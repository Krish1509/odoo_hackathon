#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 ReWear Backend Setup\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env.local already exists. Backing up to .env.local.backup');
  fs.copyFileSync(envPath, envPath + '.backup');
}

// Generate secrets
const nextAuthSecret = crypto.randomBytes(32).toString('base64');
const jwtSecret = crypto.randomBytes(32).toString('base64');

// Create .env.local content
const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/rewear
# For MongoDB Atlas (cloud): mongodb+srv://username:password@cluster.mongodb.net/rewear

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${nextAuthSecret}

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Secret (for password reset tokens)
JWT_SECRET=${jwtSecret}
`;

// Write .env.local
fs.writeFileSync(envPath, envContent);

console.log('✅ Environment variables created successfully!');
console.log('\n📋 Next steps:');
console.log('1. Install MongoDB locally or set up MongoDB Atlas');
console.log('2. Update MONGODB_URI in .env.local with your connection string');
console.log('3. (Optional) Set up Google OAuth credentials');
console.log('4. Run: npm run dev');
console.log('\n📖 For detailed instructions, see BACKEND_SETUP.md'); 