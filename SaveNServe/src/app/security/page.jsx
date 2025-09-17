"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Shield, Key, EyeOff, AlertCircle, Server, Fingerprint, Bell, ChevronDown, BadgeCheck } from "lucide-react";
import { useState } from "react";

const securityFeatures = [
  { 
    title: "Military-Grade Encryption", 
    icon: <Lock className="w-6 h-6" />,
    shortDesc: "AES-256 & TLS 1.3 encryption",
    longDesc: "All data is encrypted both in transit and at rest using industry-leading protocols. Our key management system uses hardware security modules for maximum protection.",
    stats: ["256-bit encryption", "Zero-knowledge architecture"],
    certification: "FIPS 140-2 validated"
  },
  { 
    title: "Payment Security", 
    icon: <Shield className="w-6 h-6" />,
    shortDesc: "PCI DSS Level 1 Certified",
    longDesc: "We never store your payment information. All transactions are processed through certified payment gateways with tokenization.",
    stats: ["PCI DSS compliant", "3D Secure 2.0"],
    certification: "SOC 2 Type II"
  },
  { 
    title: "Privacy Protection", 
    icon: <EyeOff className="w-6 h-6" />,
    shortDesc: "GDPR & CCPA compliant",
    longDesc: "Strict data minimization policies ensure we only collect what's necessary. You have full control over your data with easy export/delete options.",
    stats: ["Data anonymization", "Right to be forgotten"],
    certification: "EU-US Privacy Shield"
  },
  { 
    title: "Access Security", 
    icon: <Fingerprint className="w-6 h-6" />,
    shortDesc: "Biometric authentication",
    longDesc: "Multi-factor authentication with hardware keys support. Role-based access controls with activity logging for all sensitive operations.",
    stats: ["MFA enforcement", "JIT privilege access"],
    certification: "ISO 27001 certified"
  },
  { 
    title: "Network Defense", 
    icon: <Server className="w-6 h-6" />,
    shortDesc: "Enterprise-grade protection",
    longDesc: "Web application firewalls, DDoS mitigation, and intrusion prevention systems guard our infrastructure 24/7.",
    stats: ["DDoS protection", "Zero-trust network"],
    certification: "Cloud Security Alliance"
  },
  { 
    title: "Vulnerability Management", 
    icon: <AlertCircle className="w-6 h-6" />,
    shortDesc: "Continuous penetration testing",
    longDesc: "Regular security audits by independent firms plus our internal red team ensures vulnerabilities are found and patched before they can be exploited.",
    stats: ["Bug bounty program", "Automated scanning"],
    certification: "CIS Benchmarks"
  }
];

export default function SecurityPage() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-100/20 dark:bg-emerald-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-teal-100/20 dark:bg-teal-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 mb-6 bg-emerald-100 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800"
          >
            <Shield className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-emerald-700 dark:text-emerald-300">Enterprise Security</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-400 dark:to-teal-500"
          >
            Fort Knox-Level Protection
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Your data is shielded by multiple layers of cutting-edge security measures and compliance certifications.
          </motion.p>
        </motion.section>

        {/* Security Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {securityFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative overflow-hidden"
            >
              {/* Feature Card */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border ${
                  expandedIndex === idx 
                    ? "border-emerald-500 dark:border-emerald-400" 
                    : "border-gray-200 dark:border-gray-700"
                } transition-all duration-300 h-full flex flex-col`}
              >
                <div 
                  className="p-6 cursor-pointer flex-grow"
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      expandedIndex === idx || hoveredIndex === idx
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    } transition-colors`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.shortDesc}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                      className={`text-gray-400 ${
                        expandedIndex === idx ? "text-emerald-600 dark:text-emerald-400" : ""
                      }`}
                    >
                      <ChevronDown />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{feature.longDesc}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">KEY FEATURES</h4>
                          <ul className="space-y-2">
                            {feature.stats.map((stat, i) => (
                              <li key={i} className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                                <span className="text-sm">{stat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {feature.certification && (
                          <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                            <BadgeCheck className="mr-2" size={16} />
                            {feature.certification}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hover Glow Effect */}
              {hoveredIndex === idx && expandedIndex !== idx && (
                <motion.div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    background: 'radial-gradient(600px circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 80%)'
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
