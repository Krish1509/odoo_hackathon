'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import FeaturedItemsCarousel from './components/FeaturedItemsCarousel';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setLoading(false);
      } catch (error) {
        console.error('Failed to load initial data:', error);
        setLoadError('Failed to load page content. Please try again.');
        setLoading(false);
      }
    };

    fetchInitialData();
    return () => {};
  }, []);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center min-h-screen bg-basewhite"
          >
            <div className="text-forest text-3xl font-bold flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ♻️
              </motion.span>
              Loading ReWear...
            </div>
          </motion.div>
        ) : loadError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 font-bold text-lg"
          >
            <span className="mr-2">❌</span> {loadError}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main className="pt-28 pb-20 px-4 md:px-10 bg-basewhite text-charcoal min-h-screen overflow-x-hidden">
              {/* Hero Section */}
              <section className="text-center max-w-4xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-6xl font-extrabold text-forest leading-tight mb-6"
                >
                  ReWear: Swap. Save. Sustain.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.9 }}
                  className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed"
                >
                  ReWear is your eco-powered fashion exchange. Swap unused clothes, earn points, and refresh your wardrobe sustainably.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link href="/signup">
                    <button className="bg-gradient-to-r from-forest to-mint text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
                      Get Started
                    </button>
                  </Link>
                </motion.div>
              </section>

              {/* Featured Items Carousel */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="max-w-5xl mx-auto mt-16"
              >
                <FeaturedItemsCarousel />
              </motion.section>

              {/* Divider */}
              <motion.hr
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="border-0 h-[2px] bg-mint my-16 max-w-xs mx-auto"
              />

              {/* Why ReWear Section */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-2"
              >
                <InfoCard
                  title="♻️ Circular Fashion"
                  text="Every swap reduces textile waste, keeping clothes out of landfills and refreshing your style sustainably."
                />
                <InfoCard
                  title="🧑‍🤝‍🧑 Community-Powered"
                  text="Join a trusted community of swappers who share your passion for sustainable fashion."
                />
                <InfoCard
                  title="🎯 Points & Rewards"
                  text="List items to earn points and redeem them for clothes you love from others."
                />
                <InfoCard
                  title="📸 List in Seconds"
                  text="Snap a photo, add details, and list your items quickly to start swapping."
                />
              </motion.section>

              {/* Footer */}
              <footer className="mt-24 text-center text-sm text-gray-500">
                © 2025 ReWear — Built with 💚 for the planet
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white shadow rounded-xl p-6 hover:shadow-md transition-all"
    >
      <h3 className="text-xl font-semibold text-forest mb-2">{title}</h3>
      <p className="text-gray-700">{text}</p>
    </motion.div>
  );
}

function ErrorFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 font-bold text-lg">
      <span className="mr-2">❌</span> Something went wrong. Please refresh the page.
    </div>
  );
}