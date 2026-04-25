import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [showTagline, setShowTagline] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show tagline after 600ms
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 600);

    // Start fade out after 2.2 seconds total
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2200);

    // Call onComplete after fade out completes (500ms)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-wider mb-8"
          >
            LUCID
          </motion.h1>
          
          <AnimatePresence>
            {showTagline && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-wide"
              >
                Cut the noise. Keep what's essential.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
