'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import AuthNavbar from '../components/AuthNavbar';

export default function Dashboard() {
  const [username, setUsername] = useState('User'); // This would come from auth context

  return (
    <div className="min-h-screen bg-basewhite">
      <AuthNavbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-forest mb-4">
            Welcome to ReWear! 🎉
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your sustainable fashion marketplace. Buy, sell, and trade pre-loved clothing to reduce waste and save money.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-mint/50"
          >
            <div className="text-3xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-forest mb-2">Browse Items</h3>
            <p className="text-gray-600 mb-4">Discover unique pre-loved fashion items from our community.</p>
            <Link href="/browse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-gradient-to-r from-forest to-mint text-white py-2 rounded-full font-semibold"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-mint/50"
          >
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-forest mb-2">Sell Items</h3>
            <p className="text-gray-600 mb-4">List your gently used clothing and accessories for sale.</p>
            <Link href="/sell">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-gradient-to-r from-forest to-mint text-white py-2 rounded-full font-semibold"
              >
                List Item
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-mint/50"
          >
            <div className="text-3xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-forest mb-2">Trade Items</h3>
            <p className="text-gray-600 mb-4">Exchange items with other members of the community.</p>
            <Link href="/trade">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-gradient-to-r from-forest to-mint text-white py-2 rounded-full font-semibold"
              >
                Start Trading
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-mint/50"
        >
          <h3 className="text-2xl font-bold text-forest mb-6 text-center">Community Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-forest">1,234</div>
              <div className="text-gray-600">Items Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-forest">567</div>
              <div className="text-gray-600">Successful Sales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-forest">89</div>
              <div className="text-gray-600">Items Traded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-forest">2.3k</div>
              <div className="text-gray-600">CO₂ Saved (kg)</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 