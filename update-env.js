const fs = require('fs');
const path = require('path');

const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/rewear
# For MongoDB Atlas (cloud): mongodb+srv://username:password@cluster.mongodb.net/rewear

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=UDu9PKauEwiVvPhL1bj7wQ8xotjQQim6bPCXBa46KOY=

# Google OAuth (Optional - for Google sign-in)
# Get these from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Secret (for password reset tokens)
JWT_SECRET=OOGXQMpNoh96HSrkcshIEeSipW+SS1w8GfSNKPisua0=
`;

const envPath = path.join(__dirname, '.env.local');
fs.writeFileSync(envPath, envContent);

console.log('✅ .env.local file updated with proper secrets!');
console.log('\n📋 Next steps:');
console.log('1. Install MongoDB locally or set up MongoDB Atlas');
console.log('2. Update MONGODB_URI in .env.local with your connection string');
console.log('3. (Optional) Set up Google OAuth credentials');
console.log('4. Run: npm run dev'); 