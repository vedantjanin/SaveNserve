"use client";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Zap, Users } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-teal-50 to-emerald-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern-light.svg')]"></div>
      </div>
      <motion.div 
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-teal-100 rounded-full filter blur-3xl opacity-30"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-100 rounded-full filter blur-3xl opacity-30"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative z-10 text-center">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to <span className="text-teal-600">make a difference</span> in your community?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of individuals and businesses already creating impact through food redistribution.
            </p>
          </motion.div>

          {/* Impact stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          >
            {[
              { icon: <Leaf className="h-6 w-6 text-teal-600" />, value: "5M+", label: "Pounds saved" },
              { icon: <Zap className="h-6 w-6 text-teal-600" />, value: "2.1M", label: "Meals provided" },
              { icon: <Users className="h-6 w-6 text-teal-600" />, value: "850+", label: "Partners" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-teal-300 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-teal-50 rounded-lg mx-auto">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-200 flex items-center justify-center gap-2"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:bg-gray-50"
            >
              Schedule a Demo
            </motion.button>
          </motion.div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm"
          >
            <p>No credit card required • Setup in minutes • Cancel anytime</p>
          </motion.div>
        </div>

        {/* Floating food icons */}
        <motion.div
          className="absolute bottom-10 left-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center"
          variants={{
            initial: { y: 0 },
            animate: {
              y: [0, -15, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          <span className="text-2xl">🍎</span>
        </motion.div>
        
        <motion.div
          className="absolute top-20 right-16 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
          variants={{
            initial: { y: 0 },
            animate: {
              y: [0, -20, 0],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          <span className="text-xl">🥖</span>
        </motion.div>
        
        <motion.div
          className="absolute bottom-24 right-24 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
          variants={{
            initial: { y: 0 },
            animate: {
              y: [0, -10, 0],
              transition: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          <span className="text-lg">🥦</span>
        </motion.div>
      </div>
    </section>
  );
}