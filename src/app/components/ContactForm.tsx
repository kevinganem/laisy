"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

/**
 * ContactForm component
 * Renders a contact form for user inquiries, integrated with Formspree for email delivery.
 * Shows animated success/error messages using Framer Motion.
 * All fields are required. Button is disabled during sending.
 * Accessible and fully translatable.
 *
 * Props:
 *   - className: Optional additional TailwindCSS classes
 *   - selectedPlan: Optional pre-filled message
 *   - onClose: Optional callback to call after successful submission
 */
interface ContactFormProps {
  className?: string;
  selectedPlan?: string;
  onClose?: () => void;
  selectedPacks?: string[];
  prefillPlan?: string | null;
  prefillPacks?: string[];
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "", selectedPlan, onClose, selectedPacks, prefillPlan, prefillPacks }) => {
  // Use prefillPlan/prefillPacks if provided, otherwise fallback to selectedPlan/selectedPacks
  const effectivePlan = prefillPlan !== undefined ? prefillPlan : selectedPlan;
  const effectivePacks = prefillPacks !== undefined ? prefillPacks : selectedPacks;
  const [form, setForm] = useState({ name: "", email: "", companySize: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  // Handle input changes for all fields (controlled inputs)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission: send data to Formspree, show animated feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("https://formspree.io/f/manbwoor", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target as HTMLFormElement)
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", companySize: "", message: "" });
        // Auto-close after 2s if onClose is provided
        if (onClose) {
          setTimeout(() => { onClose(); }, 2000);
        }
      } else {
        setError(t('contact.error') as string);
      }
    } catch {
      setError(t('contact.error') as string);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.form
      className={`bg-[#23272a] rounded-xl w-full max-w-md mx-auto p-4 md:p-8 flex flex-col gap-3 md:gap-4 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      {/* Hidden fields for plan and packs */}
      {effectivePlan && (
        <input type="hidden" name="plan" value={effectivePlan} />
      )}
      {effectivePacks && effectivePacks.length > 0 && (
        <input type="hidden" name="packs" value={effectivePacks.join(', ')} />
      )}
      {/* Recap selected packs (if any) */}
      {effectivePacks && effectivePacks.length > 0 && (
        <div className="mb-2 w-full flex flex-wrap gap-2 items-center justify-center">
          {effectivePacks.map((pack) => (
            <span key={pack} className="bg-[#8B5CF6]/20 text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-semibold">{pack}</span>
          ))}
        </div>
      )}
      <AnimatePresence>
        {success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex flex-col items-center justify-center text-green-400 font-semibold text-center mb-2 gap-2"
          >
            <motion.svg
              width="48" height="48" viewBox="0 0 48 48" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 20, -10, 0] }}
              transition={{ type: "tween", duration: 0.7, delay: 0.1 }}
            >
              <circle cx="24" cy="24" r="22" stroke="#22c55e" strokeWidth="4" fill="#23272a" />
              <motion.path
                d="M16 25L22 31L33 19"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.svg>
            <span>{t('contact.success') as string}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-red-400 font-semibold text-center mb-2"
        >
          {error}
        </motion.div>
      )}
      <label className="text-white font-medium text-sm md:text-base">{t('contact.name') as string}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 w-full text-sm px-3 py-2 rounded bg-[#313338] text-white border border-[#5865f2] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
          aria-label={t('contact.name') as string}
          disabled={sending}
        />
      </label>
      <label className="text-white font-medium text-sm md:text-base">{t('contact.email') as string}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 w-full text-sm px-3 py-2 rounded bg-[#313338] text-white border border-[#5865f2] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
          aria-label={t('contact.email') as string}
          disabled={sending}
        />
      </label>
      {/* Company size field */}
      <label className="text-white font-medium text-sm md:text-base">{t('contact.companySize') as string}
        <select
          name="companySize"
          value={form.companySize}
          onChange={handleChange}
          required
          className="mt-1 w-full text-sm px-3 py-2 rounded bg-[#313338] text-white border border-[#5865f2] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
          aria-label={t('contact.companySize') as string}
          disabled={sending}
        >
          <option value="">{t('contact.companySizePlaceholder') as string}</option>
          <option value="0-9">0-9 {t('contact.employees') as string}</option>
          <option value="10-49">10-49 {t('contact.employees') as string}</option>
          <option value="50-199">50-199 {t('contact.employees') as string}</option>
          <option value="200+">200+ {t('contact.employees') as string}</option>
          <option value="unknown">{t('contact.companySizeUnknown') as string}</option>
        </select>
      </label>
      <label className="text-white font-medium text-sm md:text-base">{t('contact.message') as string}
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 w-full text-sm px-3 py-2 rounded bg-[#313338] text-white border border-[#5865f2] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
          aria-label={t('contact.message') as string}
          disabled={sending}
        />
      </label>
      <button
        type="submit"
        className="mt-2 w-full bg-[#5865f2] text-white font-semibold py-2 rounded hover:bg-[#4752c4] transition-colors disabled:opacity-60 text-sm md:text-base"
        disabled={sending}
      >
        {sending ? t('contact.sending') as string : t('contact.send') as string}
      </button>
    </motion.form>
  );
};

export default ContactForm; 