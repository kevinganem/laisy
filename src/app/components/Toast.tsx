"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

// Toast context for global access
const ToastContext = createContext<{
  show: (msg: string) => void;
} | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        className={`fixed left-1/2 bottom-8 z-[9999] px-6 py-3 rounded-2xl shadow-lg font-semibold text-base transition-all pointer-events-none select-none
          ${visible ? 'bg-[#232946]/95 text-white opacity-100 translate-x-[-50%] scale-100' : 'opacity-0 scale-95 translate-x-[-50%]'}`}
        style={{ minWidth: 180, maxWidth: 320, textAlign: 'center' }}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}; 