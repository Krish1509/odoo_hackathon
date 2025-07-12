'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow z-50 px-6 py-4 flex justify-between items-center">
      <Link href="/">
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
      <div className="flex gap-4">
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-forest px-4 py-2 rounded-lg hover:bg-mint transition font-semibold"
          >
            Login
          </motion.button>
        </Link>
        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-forest text-white px-4 py-2 rounded-lg hover:bg-green-800 transition font-semibold"
          >
            Sign Up
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}