'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AuthNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('User'); // This would come from auth context

  return (
    <nav className="fixed w-full top-0 left-0 bg-white/80 backdrop-blur-md shadow-sm z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/dashboard">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-forest flex items-center gap-2"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              ♻️
            </motion.span>
            ReWear
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/browse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-charcoal px-4 py-2 rounded-lg hover:bg-mint/20 transition font-medium"
            >
              Browse
            </motion.button>
          </Link>
          <Link href="/sell">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-charcoal px-4 py-2 rounded-lg hover:bg-mint/20 transition font-medium"
            >
              Sell
            </motion.button>
          </Link>
          <Link href="/trade">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-charcoal px-4 py-2 rounded-lg hover:bg-mint/20 transition font-medium"
            >
              Trade
            </motion.button>
          </Link>
          
          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 bg-gradient-to-r from-forest to-mint text-white px-4 py-2 rounded-full font-semibold"
            >
              <span>👤</span>
              {username}
              <span className="text-sm">▼</span>
            </motion.button>

            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-mint/50 py-2"
              >
                <Link href="/profile">
                  <div className="px-4 py-2 text-charcoal hover:bg-mint/20 cursor-pointer">
                    Profile
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="px-4 py-2 text-charcoal hover:bg-mint/20 cursor-pointer">
                    Settings
                  </div>
                </Link>
                <div className="border-t border-gray-200 my-1"></div>
                <Link href="/">
                  <div className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">
                    Logout
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-charcoal p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-mint/50"
        >
          <div className="px-6 py-4 space-y-2">
            <Link href="/browse">
              <div className="text-charcoal py-2 hover:bg-mint/20 rounded-lg px-2">
                Browse
              </div>
            </Link>
            <Link href="/sell">
              <div className="text-charcoal py-2 hover:bg-mint/20 rounded-lg px-2">
                Sell
              </div>
            </Link>
            <Link href="/trade">
              <div className="text-charcoal py-2 hover:bg-mint/20 rounded-lg px-2">
                Trade
              </div>
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            <Link href="/profile">
              <div className="text-charcoal py-2 hover:bg-mint/20 rounded-lg px-2">
                Profile
              </div>
            </Link>
            <Link href="/settings">
              <div className="text-charcoal py-2 hover:bg-mint/20 rounded-lg px-2">
                Settings
              </div>
            </Link>
            <Link href="/">
              <div className="text-red-600 py-2 hover:bg-red-50 rounded-lg px-2">
                Logout
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 