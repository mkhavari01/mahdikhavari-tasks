'use client';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className }: Props) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }} // Subtle grow on hover
    whileTap={{ scale: 0.95, backgroundColor: '#2563eb' }} // Slight shrink with color change on click
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={twMerge(
      'px-4 py-2 md:px-6 md:py-3 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 font-semibold',
      className
    )}
  >
    {children}
  </motion.button>
);

export { Button };
