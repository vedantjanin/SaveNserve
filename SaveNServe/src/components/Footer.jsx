"use client";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    { icon: <FaFacebookF />, color: "hover:text-blue-500", bg: "hover:bg-blue-500/10" },
    { icon: <FaInstagram />, color: "hover:text-pink-500", bg: "hover:bg-pink-500/10" },
    { icon: <FaTwitter />, color: "hover:text-sky-400", bg: "hover:bg-sky-400/10" },
    { icon: <FaYoutube />, color: "hover:text-red-500", bg: "hover:bg-red-500/10" },
    { icon: <FaLinkedinIn />, color: "hover:text-blue-400", bg: "hover:bg-blue-400/10" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Solutions", href: "/solutions" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "FAQ", href: "/faq" },
    { name: "Sustainability Report", href: "/sustainability" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gray-950 text-white pt-20 pb-12 px-4 sm:px-6 overflow-hidden border-t border-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl animate-float-delay-2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">
                SaveNServe
              </h2>
            </motion.div>
            
            <p className="text-gray-400 leading-relaxed">
              Transforming surplus into solutions for a sustainable tomorrow.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 ${social.color} ${social.bg} transition-all duration-300`}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <motion.span
                    animate={{
                      scale: hoveredLink === index ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {social.icon}
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <motion.a
                    href={link.href}
                    className="flex items-center gap-3 group text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.3 }}
                    />
                    <span>{link.name}</span>
                    <motion.span 
                      className="ml-auto opacity-0 group-hover:opacity-100 text-teal-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <motion.a
                    href={link.href}
                    className="flex items-center gap-3 group text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.3 }}
                    />
                    <span>{link.name}</span>
                    <motion.span 
                      className="ml-auto opacity-0 group-hover:opacity-100 text-teal-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Stay Updated
            </h3>
            
            <p className="text-gray-400 leading-relaxed">
              Join our newsletter for sustainability insights and updates.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg text-teal-400 text-center"
              >
                Thank you for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full p-4 pr-14 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 top-2 bg-gradient-to-br from-teal-500 to-emerald-600 p-2.5 rounded-lg shadow-lg hover:shadow-teal-500/20 transition-all"
                  >
                    <FiSend className="text-lg" />
                  </motion.button>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    required 
                    className="mt-1 accent-teal-500 focus:ring-teal-500 rounded border-gray-700" 
                  />
                  <label htmlFor="consent" className="text-gray-400 text-sm">
                    I agree to receive emails and accept the <a href="#" className="text-teal-400 hover:underline">privacy policy</a>
                  </label>
                </div>
              </form>
            )}

            <div className="pt-4 border-t border-gray-800 mt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Download Our App</h4>
              <div className="flex gap-3">
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-xs">
                    <span className="block text-gray-400">Get it on</span>
                    <span className="font-medium text-white">App Store</span>
                  </span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                    <path d="M4 4L11 4V11H4V4Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13 4H20V11H13V4Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 13H11V20H4V13Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13 13H20V20H13V13Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs">
                    <span className="block text-gray-400">Download on</span>
                    <span className="font-medium text-white">Google Play</span>
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12"
        ></motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
        >
          <div className="text-gray-500">
            © {new Date().getFullYear()} SaveNServe. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float 10s ease-in-out infinite 2s; }
        .animate-float-delay-2 { animation: float 12s ease-in-out infinite 4s; }
      `}</style>
    </footer>
  );
}