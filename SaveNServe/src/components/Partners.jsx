"use client";
import { motion } from "framer-motion";
import { Handshake, Building2, Store, Utensils, ShoppingBag, Hotel } from "lucide-react";

const partnerTypes = [
  {
    icon: <Utensils className="h-6 w-6 text-teal-600" />,
    title: "Restaurants",
    description: "From local cafes to national chains"
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-teal-600" />,
    title: "Grocery Stores",
    description: "Supermarkets and specialty food retailers"
  },
  {
    icon: <Hotel className="h-6 w-6 text-teal-600" />,
    title: "Hotels & Caterers",
    description: "Event venues and hospitality providers"
  },
  {
    icon: <Building2 className="h-6 w-6 text-teal-600" />,
    title: "Corporate Cafeterias",
    description: "Office buildings and business campuses"
  },
  {
    icon: <Store className="h-6 w-6 text-teal-600" />,
    title: "Convenience Stores",
    description: "Quick-service food providers"
  }
];

const partnerLogos = [
  { name: "FreshMart", logo: "/images/partners/freshmart.svg" },
  { name: "UrbanEats", logo: "/images/partners/urbaneats.svg" },
  { name: "GreenGrocer", logo: "/images/partners/greengrocer.svg" },
  { name: "CafeHarmony", logo: "/images/partners/cafeharmony.svg" },
  { name: "PlatinumHotels", logo: "/images/partners/platinum.svg" },
  { name: "OfficeBites", logo: "/images/partners/officebites.svg" }
];

export default function Partners() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern-light.svg')]"></div>
      </div>
      <motion.div 
        className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-100 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 bg-teal-50 rounded-full border border-teal-100">
            <Handshake className="h-5 w-5 text-teal-600 mr-2" />
            <span className="text-teal-700 font-medium">Our Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-teal-600">850+ organizations</span> nationwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We work with businesses of all sizes across the food industry to redirect surplus food to communities in need.
          </p>
        </motion.div>

        {/* Partner types */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20"
        >
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-teal-300 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-teal-50 rounded-lg mx-auto">
                {partner.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">{partner.title}</h3>
              <p className="text-gray-600 text-center">{partner.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo cloud */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 items-center"
          >
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all"
              >
                {/* Replace with actual logo images */}
                <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-medium">
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Partner testimonials */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-8">
                "SaveNServe has transformed our food waste management while allowing us to give back to our community. It's a win-win solution that's easy to implement."
              </blockquote>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 mr-6"></div>
                <div>
                  <p className="font-semibold text-lg text-gray-900">Michael Rodriguez</p>
                  <p className="text-gray-600">Director of Operations, FreshMart</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits for our partners</h3>
              <ul className="space-y-4">
                {[
                  "Tax deductions for donated food",
                  "Reduced waste disposal costs",
                  "Enhanced corporate social responsibility",
                  "Streamlined donation process",
                  "Real-time impact reporting",
                  "Positive community recognition"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a SaveNServe Partner</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of businesses making a difference while improving your bottom line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-200"
            >
              Sign Up Your Business
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:bg-gray-50"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}