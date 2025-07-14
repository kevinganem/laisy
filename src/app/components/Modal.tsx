import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.18 } },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = "" }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseDown={handleBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={modalRef}
            className={`relative bg-[#23272a] rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2 sm:mx-4 p-0 sm:p-0 min-h-[120px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] max-h-[90vh] overflow-y-auto flex flex-col ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            tabIndex={-1}
            style={{ overflow: 'auto' }}
          >
            {/* Close button always present */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white bg-transparent rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[#5865f2] z-20"
              aria-label="Fermer le formulaire"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="pt-8 sm:pt-10 px-2 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 w-full flex-1 flex flex-col justify-center">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal; 