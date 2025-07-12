'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SetupUsernameContent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email and username from URL params
    const emailParam = searchParams.get('email');
    const usernameParam = searchParams.get('username');
    
    if (emailParam) setEmail(emailParam);
    if (usernameParam) setUsername(usernameParam);
  }, [searchParams]);

  // Mock function to check username uniqueness (replace with backend API)
  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    // Simulate DB check (e.g., username already exists)
    const takenUsernames = ['krishsoni1509', 'exampleuser', 'admin', 'test']; // Mock DB
    return new Promise((resolve) => {
      setTimeout(() => resolve(!takenUsernames.includes(username.toLowerCase())), 500);
    });
  };

  // Debounced username availability check
  useEffect(() => {
    if (!username || username.length < 3) {
      setIsAvailable(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsChecking(true);
      try {
        const available = await checkUsernameAvailability(username);
        setIsAvailable(available);
        setError(available ? null : 'Username is already taken');
      } catch (err) {
        setIsAvailable(null);
        setError('Failed to check username availability');
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (isAvailable === false) {
      setError('Please choose a different username.');
      return;
    }

    setLoading(true);

    try {
      // Mock API call to finalize user setup (replace with real API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Username setup complete:', { email, username });
      
      // Redirect to dashboard or main app
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to complete setup. Please try again.');
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Allow users to skip username setup and use email as identifier
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-basewhite flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-lg border border-mint/50"
      >
        <h1 className="text-3xl font-extrabold text-forest text-center mb-6">
          <span className="mr-2">♻️</span> Choose Your Username
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Welcome to ReWear! Choose a unique username for your profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-mint/50 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-charcoal">
              Username
            </label>
            <div className="relative mt-1">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-mint/50 focus:ring-2 focus:ring-forest bg-white/50 text-charcoal placeholder-gray-400"
                placeholder="Choose a username"
              />
              {isChecking && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-4 h-4 border-2 border-forest border-t-transparent rounded-full"
                  />
                </div>
              )}
              {isAvailable === true && !isChecking && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-green-500 text-xl">✓</span>
                </div>
              )}
              {isAvailable === false && !isChecking && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-red-500 text-xl">✗</span>
                </div>
              )}
            </div>
            
            {username.length > 0 && (
              <div className="mt-2 text-sm">
                {isChecking && <span className="text-gray-500">Checking availability...</span>}
                {isAvailable === true && <span className="text-green-600">Username is available!</span>}
                {isAvailable === false && <span className="text-red-600">Username is already taken</span>}
                {username.length < 3 && <span className="text-orange-600">Username must be at least 3 characters</span>}
              </div>
            )}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <div className="space-y-3">
            <motion.button
              type="submit"
              disabled={loading || isAvailable !== true || username.length < 3}
              whileHover={{ scale: 1.05 }}
              className={`w-full bg-gradient-to-r from-forest to-mint text-white py-3 rounded-full font-semibold shadow-md ${
                loading || isAvailable !== true || username.length < 3
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-lg'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="mr-2"
                  >
                    ♻️
                  </motion.span>
                  Setting up...
                </span>
              ) : (
                'Complete Setup'
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleSkip}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
            >
              Skip for now
            </motion.button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          You can always change your username later in your profile settings.
        </p>
      </motion.div>
    </div>
  );
}

export default function SetupUsername() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-basewhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SetupUsernameContent />
    </Suspense>
  );
} 