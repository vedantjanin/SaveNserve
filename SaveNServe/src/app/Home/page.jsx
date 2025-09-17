"use client";
import { motion } from "framer-motion";
import Features from "./features/page";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500">
      {/* Hero Section */}
      <section className="relative py-32 px-6 text-white text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Join the Fight Against Food Waste
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            SaveNServe connects businesses, NGOs, and communities to redistribute surplus food
            efficiently. Together, we can help create a sustainable, waste-free future.
          </p>
          <motion.a
            href="/get-started"
            className="inline-block text-lg font-semibold py-3 px-8 bg-teal-600 hover:bg-teal-700 rounded-full shadow-lg transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Get Started
          </motion.a>
        </motion.div>
      </section>

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At SaveNServe, we believe that food is too valuable to go to waste. Our platform
              empowers businesses and communities to make sure that surplus food reaches those who
              need it most, with a focus on efficiency, sustainability, and impact.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to make a difference?
            </h3>
            <motion.a
              href="/get-started"
              className="inline-block text-lg font-semibold py-3 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg transition-colors"
            >
              Join Our Network
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
