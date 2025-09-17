"use client";
import { motion } from "framer-motion";
import { Users, Heart, Globe, Smile } from "lucide-react";

const impactStats = [
  {
    icon: <Users className="h-8 w-8 text-teal-600" />,
    value: "150K+",
    label: "People served monthly",
    description: "Providing nutritious meals to families and individuals in need"
  },
  {
    icon: <Heart className="h-8 w-8 text-teal-600" />,
    value: "85%",
    label: "Reduction in waste",
    description: "For partner businesses implementing our solutions"
  },
  {
    icon: <Globe className="h-8 w-8 text-teal-600" />,
    value: "1.2M",
    label: "CO₂ lbs saved",
    description: "By diverting food waste from landfills annually"
  },
  {
    icon: <Smile className="h-8 w-8 text-teal-600" />,
    value: "92%",
    label: "Satisfaction rate",
    description: "Among both donors and recipient organizations"
  }
];

const testimonials = [
  {
    quote: "SaveNServe has transformed how we handle our surplus food. We're feeding more people while reducing our waste costs.",
    author: "Maria Gonzalez",
    role: "Restaurant Owner"
  },
  {
    quote: "As a food bank, we've doubled our fresh produce distribution thanks to the reliable connections through this platform.",
    author: "David Chen",
    role: "Food Bank Director"
  },
  {
    quote: "Our school lunch program now includes fresh fruits and vegetables we couldn't afford before. The kids are healthier and happier.",
    author: "Sarah Johnson",
    role: "School Nutrition Director"
  }
];

export default function CommunityImpact() {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern-light.svg')]"></div>
      </div>
      <motion.div 
        className="absolute top-1/4 left-10 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
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
            <Heart className="h-5 w-5 text-teal-600 mr-2" />
            <span className="text-teal-700 font-medium">Community Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Creating <span className="text-teal-600">measurable change</span> in our communities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform bridges the gap between surplus and need, creating a ripple effect of positive impact across environmental, social, and economic dimensions.
          </p>
        </motion.div>

        {/* Impact stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-teal-50 rounded-lg">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-lg font-semibold text-center text-gray-800 mb-3">{stat.label}</p>
              <p className="text-gray-600 text-center">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`p-8 ${index < 2 ? 'border-b lg:border-b-0 lg:border-r border-gray-200' : ''}`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to make an impact in your community?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations already creating positive change through food redistribution.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-200"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}