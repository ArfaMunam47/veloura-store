import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111111] text-[#FAF9F5] px-4 py-3 shadow-xl max-w-md text-xs font-sans tracking-wide"
        >
          <div className="w-4 h-4 rounded-full bg-[#FAF9F5] text-[#111111] flex items-center justify-center shrink-0">
            <Check size={10} strokeWidth={2.5} />
          </div>
          <span className="leading-snug">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ToastContainer = Toast;
