"use client";

import { motion } from "framer-motion";
import {
  FiHelpCircle,
  FiClock,
  FiPieChart,
  FiDollarSign,
  FiMail,
  FiHome,
  FiCalendar,
} from "react-icons/fi";

export default function HelpPage() {
  const helpItems = [
    {
      icon: <FiClock className="text-emerald-600" size={20} />,
      title: "Real-time Predictions",
      description: "Get instant demand forecasts based on current market data.",
    },
    {
      icon: <FiPieChart className="text-emerald-600" size={20} />,
      title: "Data-Driven Insights",
      description: "Our AI analyzes multiple factors to provide accurate predictions.",
    },
    {
      icon: <FiDollarSign className="text-emerald-600" size={20} />,
      title: "Pricing Impact",
      description: "See how price changes affect demand for your meals.",
    },
  ];

  const fieldExplanations = [
    {
      icon: <FiMail className="text-teal-500" size={18} />,
      name: "emailer_for_promotion",
      description: "Set to 1 if this meal is being promoted via email campaigns, 0 otherwise.",
    },
    {
      icon: <FiHome className="text-teal-500" size={18} />,
      name: "homepage_featured",
      description: "Set to 1 if this meal is featured on your homepage, 0 otherwise.",
    },
    {
      icon: <FiCalendar className="text-teal-500" size={18} />,
      name: "week",
      description: "Enter the week number (1-52) for which you want to predict demand.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-16 px-4 md:px-10 lg:px-24">
      {/* Heading Section */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-emerald-700 tracking-tight leading-tight"
        >
          <span className="inline-flex items-center gap-3 justify-center">
            <FiHelpCircle className="text-emerald-600 w-10 h-10" />
            Food Demand Predictor Help
          </span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          Learn how to use our AI-powered tool to reduce food waste and maximize efficiency.
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-800 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {helpItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white p-2 rounded-full shadow">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-emerald-800">{item.title}</h4>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Field Explanations */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-800 mb-8 text-center">
          Field Explanations
        </h2>
        <div className="space-y-5">
          {fieldExplanations.map((field, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-white border hover:shadow-sm transition-all"
            >
              <div className="mt-1">{field.icon}</div>
              <div>
                <h4 className="font-medium text-gray-800 capitalize">
                  {field.name.replaceAll("_", " ")}
                </h4>
                <p className="text-gray-600 text-sm">{field.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-800 mb-6 text-center">
          Tips for Best Results
        </h2>
        <ul className="space-y-4 max-w-2xl mx-auto">
          {[
            "Use recent data for more accurate predictions.",
            "Test multiple price points to optimize revenue.",
            "Combine homepage features with email promos for max exposure.",
          ].map((tip, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-3 bg-emerald-50 p-4 rounded-lg"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-emerald-600" />
              <p className="text-gray-700">{tip}</p>
            </motion.li>
          ))}
        </ul>
      </section>
    </main>
  );
}
