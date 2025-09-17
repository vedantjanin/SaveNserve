'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, Lock, CreditCard, UserX, Copyright, AlertTriangle, RefreshCw, Scale } from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';

const termsData = [
  { 
    title: 'Introduction', 
    summary: 'Agreement to our Terms of Service',
    icon: <FileText className="w-5 h-5 text-emerald-600" />,
    details: 'By accessing or using SaveNServe, you agree to be bound by these Terms. If you disagree with any part, you may not access the service.'
  },
  { 
    title: 'User Responsibilities', 
    summary: 'Proper use of our platform',
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    details: 'You agree to use SaveNServe lawfully and not engage in harmful activities. You are responsible for maintaining the confidentiality of your account.'
  },
  { 
    title: 'Privacy', 
    summary: 'How we handle your data',
    icon: <Lock className="w-5 h-5 text-emerald-600" />,
    details: 'Your privacy is important. Our Privacy Policy explains how we collect, use, and protect your personal information.'
  },
  { 
    title: 'Donations', 
    summary: 'Financial transactions',
    icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
    details: 'All donations are processed through secure third-party providers. We do not store your payment information on our servers.'
  },
  { 
    title: 'Account Termination', 
    summary: 'Service access rights',
    icon: <UserX className="w-5 h-5 text-emerald-600" />,
    details: 'We reserve the right to suspend or terminate accounts violating these Terms. You may delete your account at any time.'
  },
  { 
    title: 'Content Ownership', 
    summary: 'Intellectual property',
    icon: <Copyright className="w-5 h-5 text-emerald-600" />,
    details: 'You retain rights to your content but grant us a license to use it for platform operations and improvements.'
  },
  { 
    title: 'Liability', 
    summary: 'Limitations of responsibility',
    icon: <AlertTriangle className="w-5 h-5 text-emerald-600" />,
    details: 'SaveNServe is not liable for indirect damages. While we strive for uninterrupted service, we cannot guarantee perfection.'
  },
  { 
    title: 'Changes', 
    summary: 'Updates to these Terms',
    icon: <RefreshCw className="w-5 h-5 text-emerald-600" />,
    details: 'We may modify these Terms periodically. Continued use after changes constitutes acceptance of the new Terms.'
  },
  { 
    title: 'Governing Law', 
    summary: 'Legal jurisdiction',
    icon: <Scale className="w-5 h-5 text-emerald-600" />,
    details: 'These Terms are governed by the laws of our operating jurisdiction. Disputes will be resolved in local courts.'
  }
];

export default function TermsPage() {
  const [expandedTerm, setExpandedTerm] = useState(null);

  return (
    <>
      <Head>
        <title>Terms & Conditions | SaveNServe</title>
        <meta name="description" content="Legal terms governing use of SaveNServe platform" />
      </Head>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-16 px-6 sm:px-12"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FileText className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-emerald-700 dark:text-emerald-300">Legal Terms</span>
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <div className="space-y-4">
            {termsData.map((term, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-start"
                  onClick={() => setExpandedTerm(expandedTerm === idx ? null : idx)}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                      {term.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{term.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{term.summary}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedTerm === idx ? 180 : 0 }}
                    className="text-gray-400"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedTerm === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300">{term.details}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              By using SaveNServe, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
            
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}