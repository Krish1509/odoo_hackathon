'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Mock data for featured items with emojis
const featuredItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    emoji: '👕',
    category: 'Jackets',
    condition: 'Like New',
    points: 50,
  },
  {
    id: 2,
    title: 'Floral Summer Dress',
    emoji: '👗',
    category: 'Dresses',
    condition: 'Gently Used',
    points: 40,
  },
  {
    id: 3,
    title: 'Leather Boots',
    emoji: '👢',
    category: 'Footwear',
    condition: 'Excellent',
    points: 60,
  },
  {
    id: 4,
    title: 'Wool Sweater',
    emoji: '🧥',
    category: 'Sweaters',
    condition: 'Like New',
    points: 45,
  },
];

export default function FeaturedItemsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    setIsAutoPlaying(false);
  };

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (deltaX > 50) handlePrev();
    if (deltaX < -50) handleNext();
    touchStartX.current = null;
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-forest text-center mb-8"
      >
        <span className="mr-2">♻️</span> Featured Items
      </motion.h2>

      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex justify-center"
          >
            <Link href={`/items/${featuredItems[currentIndex].id}`}>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-mint/50"
              >
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 bg-mint/20 flex items-center justify-center">
                  <span className="text-8xl">{featuredItems[currentIndex].emoji}</span>
                  <div className="absolute top-2 right-2 bg-sun text-charcoal text-xs font-semibold px-2 py-1 rounded-full">
                    {featuredItems[currentIndex].condition}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-forest mb-2">
                  {featuredItems[currentIndex].title}
                </h3>
                <p className="text-gray-700 mb-2">{featuredItems[currentIndex].category}</p>
                <p className="text-sun font-bold">
                  <span className="mr-1">🎯</span>
                  {featuredItems[currentIndex].points} Points
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-4 bg-gradient-to-r from-forest to-mint text-white px-6 py-2 rounded-full font-semibold"
                >
                  Swap Now
                </motion.button>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-forest/80 text-white p-3 rounded-full backdrop-blur-sm"
          aria-label="Previous item"
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-forest/80 text-white p-3 rounded-full backdrop-blur-sm"
          aria-label="Next item"
        >
          →
        </motion.button>

        <div className="flex justify-center gap-2 mt-4">
          {featuredItems.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.3 }}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-forest' : 'bg-mint/50'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}