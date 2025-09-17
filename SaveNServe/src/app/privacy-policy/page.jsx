'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  User, 
  Share2, 
  Key, 
  Cookie, 
  Mail, 
  RefreshCw, 
  ChevronDown, 
  Download, 
  Check 
} from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';
const privacySections = [
  {
    id: 1,
    title: 'Introduction',
    summary: 'Our commitment to your privacy',
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    content: 'At SaveNServe, your privacy is our top priority. This policy explains how we collect, use, and protect your information when you use our platform to donate, serve, or volunteer. We adhere to global privacy standards including GDPR and CCPA.',
    lastUpdated: '2025-04-15'
  },
  {
    id: 2,
    title: 'Information Collection',
    summary: 'What data we gather',
    icon: <User className="w-5 h-5 text-emerald-600" />,
    content: 'We collect: (1) Personal details (name, email, phone); (2) Location data for logistics; (3) Donation/volunteer activity; (4) Device & usage data for analytics. We minimize data collection to only what is necessary for service delivery.',
    sensitiveData: true
  },
  {
    id: 3,
    title: 'Data Usage',
    summary: 'How we apply your information',
    icon: <Lock className="w-5 h-5 text-emerald-600" />,
    content: 'Your data enables: (1) Food donation coordination; (2) Volunteer matching; (3) Platform improvements; (4) Security monitoring; (5) Compliance with legal obligations. We never use data for unrelated marketing without consent.',
    purposes: ['Service Delivery', 'Analytics', 'Security']
  },
  {
    id: 4,
    title: 'Data Sharing',
    summary: 'Third-party disclosures',
    icon: <Share2 className="w-5 h-5 text-emerald-600" />,
    content: 'We share data only with: (1) Verified NGO partners for donation fulfillment; (2) Payment processors for transactions; (3) Legal authorities when required. All partners undergo strict privacy reviews and sign data protection agreements.',
    partners: ['Food Banks', 'Payment Providers']
  },
  {
    id: 5,
    title: 'Security Measures',
    summary: 'Protecting your information',
    icon: <Key className="w-5 h-5 text-emerald-600" />,
    content: 'We implement: (1) AES-256 encryption; (2) Regular security audits; (3) Role-based access controls; (4) SOC 2 compliant infrastructure; (5) Employee training. Despite these measures, no system is 100% secure - we recommend strong passwords.',
    certifications: ['SOC 2', 'ISO 27001']
  },
  {
    id: 6,
    title: 'Cookies & Tracking',
    summary: 'Digital footprint management',
    icon: <Cookie className="w-5 h-5 text-emerald-600" />,
    content: 'We use: (1) Essential cookies for functionality; (2) Analytics cookies (Google Analytics); (3) Performance cookies. You can manage preferences via our cookie banner or browser settings. We do not sell tracking data.',
    cookieTypes: ['Necessary', 'Analytics']
  },
  {
    id: 7,
    title: 'Your Rights',
    summary: 'Control over your data',
    icon: <User className="w-5 h-5 text-emerald-600" />,
    content: 'You can: (1) Access your data; (2) Request corrections; (3) Delete your account; (4) Export your data; (5) Restrict processing; (6) Object to processing. Submit requests via your account settings or by emailing our DPO.',
    rights: ['Access', 'Deletion', 'Portability']
  },
  {
    id: 8,
    title: 'Policy Updates',
    summary: 'Notification of changes',
    icon: <RefreshCw className="w-5 h-5 text-emerald-600" />,
    content: 'We will: (1) Notify users of material changes; (2) Provide 30-day review periods for major updates; (3) Archive previous versions; (4) Highlight modifications. Continued use after updates constitutes acceptance.',
    notificationMethods: ['Email', 'In-App']
  },
  {
    id: 9,
    title: 'Contact Us',
    summary: 'Privacy inquiries',
    icon: <Mail className="w-5 h-5 text-emerald-600" />,
    content: 'For questions or to exercise rights: Email: privacy@savenserve.org | Phone: +1 (555) 123-4567 | Mail: Data Protection Officer, 123 Privacy Lane, Care City, CA 90210. We respond within 72 hours to all privacy requests.',
    contactMethods: ['Email', 'Phone', 'Post']
  }
];
export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showAcceptMessage, setShowAcceptMessage] = useState(false);
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);

  const handleAcceptPolicy = (e) => {
    e.preventDefault(); // Prevent default form behavior
    setPolicyAccepted(true);
    setShowAcceptMessage(true);
    
    setTimeout(() => setShowAcceptMessage(false), 3000);
  };

  const handleDownloadPDF = (e) => {
    e.preventDefault(); // Prevent default form behavior
    setDownloading(true);
    
    setTimeout(() => {
      setDownloading(false);
      setShowDownloadMessage(true);
      
      // Create a dummy PDF download
      const blob = new Blob(["Privacy Policy Content"], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SaveNServe-Privacy-Policy.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setTimeout(() => setShowDownloadMessage(false), 3000);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Privacy Policy | SaveNServe</title>
        <meta name="description" content="How we collect, use, and protect your personal data" />
      </Head>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-16 px-6 sm:px-12"
      >
        <div className="max-w-5xl mx-auto">
          {/* Header content */}
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
              <Lock className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-emerald-700 dark:text-emerald-300">Your Privacy Matters</span>
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>

          {/* Policy sections */}
          <div className="space-y-4">
            {privacySections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: section.id * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-start"
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{section.id}. {section.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{section.summary}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                    className="text-gray-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{section.content}</p>
                        {/* Additional section details if needed */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <motion.div
            className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {showAcceptMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-3 left-0 right-0 mx-auto w-max px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 rounded-full flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Policy Accepted!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showDownloadMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-3 left-0 right-0 mx-auto w-max px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Started!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              By using SaveNServe, you acknowledge you've read and understood this Privacy Policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleAcceptPolicy}
                disabled={policyAccepted}
                className={`px-6 py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
                  policyAccepted
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                whileTap={!policyAccepted ? { scale: 0.95 } : {}}
              >
                {policyAccepted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Accepted
                  </>
                ) : (
                  'Accept Policy'
                )}
              </motion.button>

              <motion.button
                onClick={handleDownloadPDF}
                className={`px-6 py-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
                  downloading ? 'cursor-wait' : ''
                }`}
                whileTap={!downloading ? { scale: 0.95 } : {}}
                disabled={downloading}
              >
                {downloading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}