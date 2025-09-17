"use client";
import { motion } from "framer-motion";
import { 
  Truck, 
  ShieldCheck, 
  BarChart2, 
  Clock, 
  Smartphone, 
  Globe,
  Zap,
  Bell
} from "lucide-react";

const features = [
  {
    icon: <Truck className="h-8 w-8 text-teal-600" />,
    title: "Real-Time Matching",
    description: "Our AI instantly connects food donors with nearby recipients based on type, quantity, and timing needs.",
    delay: 0.1
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
    title: "Safety Compliance",
    description: "Built-in food safety guidelines and handling instructions for every donation.",
    delay: 0.2
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-teal-600" />,
    title: "Impact Analytics",
    description: "Track your environmental and community impact with detailed reporting.",
    delay: 0.3
  },
  {
    icon: <Clock className="h-8 w-8 text-emerald-600" />,
    title: "24/7 Availability",
    description: "Platform available around the clock to list or claim surplus food.",
    delay: 0.4
  },
  {
    icon: <Smartphone className="h-8 w-8 text-teal-600" />,
    title: "Mobile Friendly",
    description: "Full functionality on any device - manage donations on the go.",
    delay: 0.5
  },
  {
    icon: <Globe className="h-8 w-8 text-emerald-600" />,
    title: "Wide Network",
    description: "Access to hundreds of verified food banks and community organizations.",
    delay: 0.6
  }
];

const highlightFeature = {
  icon: <Zap className="h-10 w-10 text-white" />,
  title: "Instant Notifications",
  description: "Get real-time alerts when matching surplus becomes available in your area.",
  stats: [
    { value: "30s", label: "Average match time" },
    { value: "95%", label: "Claim rate" }
  ]
};

export default function Features() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">Features</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to efficiently redistribute surplus food and maximize your impact
          </p>
        </motion.div>

        {/* Main features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal-50 border border-teal-100">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10">
                  {highlightFeature.icon}
                </div>
                <span className="text-white font-medium tracking-wider">HIGHLIGHT FEATURE</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{highlightFeature.title}</h3>
              <p className="text-teal-100 mb-6">{highlightFeature.description}</p>
              
              <div className="flex gap-6">
                {highlightFeature.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-teal-100 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block relative bg-[url('/images/notification-ui.png')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-l from-teal-600/50 to-emerald-600/50"></div>
              <div className="absolute bottom-6 right-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="p-3 bg-white rounded-full shadow-lg"
                >
                  <Bell className="h-6 w-6 text-teal-600" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <span className="text-teal-600 font-medium">Ready to make an impact?</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Join hundreds of organizations reducing waste
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-200"
          >
            Get Started for Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}