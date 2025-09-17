'use client';
import { motion } from 'framer-motion';
import { Leaf, Truck, Zap, Clock, MapPin, Users, Package, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-teal-600" />,
    title: "Food Surplus Matching",
    description: "AI-powered system connects food donors with nearby NGOs in real-time based on type, quantity, and expiration.",
    stats: "Matches made within 15 mins avg."
  },
  {
    icon: <Truck className="h-8 w-8 text-teal-600" />,
    title: "Smart Logistics",
    description: "Optimized routing for food pickups and deliveries to minimize waste and maximize efficiency.",
    stats: "Reduces transit time by 40%"
  },
  {
    icon: <Zap className="h-8 w-8 text-teal-600" />,
    title: "Real-Time Tracking",
    description: "Monitor food from source to recipient with GPS-enabled tracking and temperature monitoring.",
    stats: "98% on-time delivery rate"
  },
  {
    icon: <Clock className="h-8 w-8 text-teal-600" />,
    title: "Expiration Alerts",
    description: "Automated notifications when food is nearing expiry to prioritize redistribution.",
    stats: "Reduces spoilage by 65%"
  },
  {
    icon: <MapPin className="h-8 w-8 text-teal-600" />,
    title: "Community Mapping",
    description: "Visual heatmaps show areas with highest need based on our demand forecasting AI.",
    stats: "Covers 72+ communities"
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-teal-600" />,
    title: "Impact Analytics",
    description: "Detailed reports on food saved, meals provided, and environmental impact metrics.",
    stats: "5M+ lbs tracked monthly"
  }
];

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

export default function Features() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-emerald-100 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 bg-teal-50 rounded-full border border-teal-100">
            <Package className="h-5 w-5 text-teal-600 mr-2" />
            <span className="text-teal-700 font-medium">Core Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Technology-Driven Food Redistribution
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform combines AI, real-time data, and community networks to create the most efficient
            food rescue system available.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="relative bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-teal-300 transition-all hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dot-pattern-light.svg')] opacity-5"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-teal-50 rounded-xl border border-teal-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-sm text-teal-600 font-medium">
                  <span className="inline-block w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                  {feature.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "95%", label: "Reduction in food waste", icon: <Leaf className="h-6 w-6" /> },
              { value: "4.2K", label: "Hours saved weekly", icon: <Clock className="h-6 w-6" /> },
              { value: "72", label: "Communities served", icon: <MapPin className="h-6 w-6" /> },
              { value: "1.2M", label: "Meals/month", icon: <Users className="h-6 w-6" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}