"use client";
import { motion } from "framer-motion";
import { Leaf, Globe, CheckCircle, ArrowRight, Target, Recycle, BatteryCharging } from "lucide-react";

const sustainabilityInitiatives = [
  {
    title: "Carbon Neutral Operations",
    icon: <Leaf className="w-6 h-6" />,
    shortDesc: "We have reduced our carbon emissions to zero by offsetting our impact.",
    longDesc: "Through carbon credits and renewable energy investments, we have fully offset our emissions, making our operations carbon-neutral. This helps ensure a cleaner future for all.",
    stats: ["Zero carbon footprint", "Investment in renewable energy"],
  },
  {
    title: "Sustainable Sourcing",
    icon: <Globe className="w-6 h-6" />,
    shortDesc: "We prioritize sourcing from ethical and sustainable suppliers.",
    longDesc: "We work with partners who share our commitment to sustainability, ensuring all of our materials and products are sourced responsibly and ethically.",
    stats: ["Ethical sourcing", "Fair trade certifications"],
  },
  {
    title: "Waste Reduction Initiatives",
    icon: <CheckCircle className="w-6 h-6" />,
    shortDesc: "We are committed to reducing waste through recycling and reusing materials.",
    longDesc: "We have implemented robust recycling and reusing programs at all levels of our business, aiming to minimize waste and keep the planet clean.",
    stats: ["Zero waste goal", "85% recycling rate"],
  },
  {
    title: "Sustainable Packaging",
    icon: <ArrowRight className="w-6 h-6" />,
    shortDesc: "We use 100% recyclable or biodegradable packaging for all products.",
    longDesc: "All of our packaging is designed with sustainability in mind, using eco-friendly materials and minimizing plastic waste.",
    stats: ["100% recyclable", "Plastic-free packaging"],
  },
  {
    title: "Energy Efficiency",
    icon: <BatteryCharging className="w-6 h-6" />,
    shortDesc: "Our operations and facilities run on energy-efficient systems.",
    longDesc: "We have optimized our energy usage by incorporating renewable energy sources, energy-efficient lighting, and smart HVAC systems, reducing our overall energy consumption.",
    stats: ["Energy-saving systems", "Solar-powered facilities"],
  },
  {
    title: "Sustainable Transportation",
    icon: <Target className="w-6 h-6" />,
    shortDesc: "We use electric vehicles and green transportation methods.",
    longDesc: "Our transportation initiatives focus on electric vehicle fleets and green logistics to minimize our carbon footprint in distribution and travel.",
    stats: ["Electric fleet", "Eco-friendly logistics"],
  }
];

export default function SustainabilityReport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-green-800">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl"></div>
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
            className="inline-flex items-center px-4 py-2 mb-6 bg-green-100 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800"
          >
            <Leaf className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-700 dark:text-green-300">Sustainability Report</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-700 dark:from-green-400 dark:to-teal-500"
          >
            Our Commitment to a Sustainable Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            We're dedicated to making a positive impact on the planet by incorporating sustainability across all aspects of our business.
          </motion.p>
        </motion.section>

        {/* Sustainability Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {sustainabilityInitiatives.map((initiative, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="relative overflow-hidden"
            >
              {/* Initiative Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 h-full flex flex-col">
                <div className="p-6 cursor-pointer flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-green-600 text-white">{initiative.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{initiative.shortDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{initiative.longDesc}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">KEY IMPACTS</h4>
                      <ul className="space-y-2">
                        {initiative.stats.map((stat, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm">{stat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
