"use client";
import { motion } from "framer-motion";
import { Truck, ClipboardList, Search, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <ClipboardList className="h-8 w-8 text-teal-600" />,
    title: "List Surplus",
    description: "Businesses easily list their surplus food with details about type, quantity, and pickup time.",
    borderColor: "border-teal-200",
    bgColor: "bg-teal-50"
  },
  {
    icon: <Search className="h-8 w-8 text-emerald-600" />,
    title: "Match Needs",
    description: "Our algorithm matches surplus with nearby community organizations based on needs and capacity.",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50"
  },
  {
    icon: <Truck className="h-8 w-8 text-teal-600" />,
    title: "Coordinate Pickup",
    description: "We facilitate communication and logistics for efficient food pickup and delivery.",
    borderColor: "border-teal-200",
    bgColor: "bg-teal-50"
  },
  {
    icon: <Users className="h-8 w-8 text-emerald-600" />,
    title: "Distribute",
    description: "Community partners receive and distribute food to those who need it most.",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50"
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
    title: "Track Impact",
    description: "All parties receive reporting on pounds saved, meals provided, and environmental impact.",
    borderColor: "border-teal-200",
    bgColor: "bg-teal-50"
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white to-transparent z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">SaveNServe</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes food redistribution simple, efficient, and impactful for all parties involved.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-teal-200 to-emerald-200 transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                {/* Step number for mobile */}
                <div className="absolute -top-2 -left-2 md:hidden z-10">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step number for desktop */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-teal-100 z-10">
                  <span className="text-teal-600 font-bold">{index + 1}</span>
                </div>
                
                <div className={`h-full p-6 rounded-xl border ${step.borderColor} ${step.bgColor} shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-lg bg-white border border-gray-200">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-200"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}