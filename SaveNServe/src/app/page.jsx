"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Truck, Leaf, Zap, Clock, DollarSign, BarChart2 } from "lucide-react";
import HowItWorks from "@/components/Howitworks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CommunityImpact from "@/components/CommunityImpact ";
import Partners from "@/components/Partners";
import FinalCTA from "@/components/FinalCTA";
const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>SaveNServe - Connecting Food Surplus with Community Needs</title>
        <meta name="description" content="Reduce food waste by connecting businesses with surplus food to communities in need. Our platform makes food redistribution efficient and impactful." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-gray-50 text-gray-900 overflow-hidden ">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern-light.svg')] opacity-5"></div>
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-40"
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
          <motion.div 
            className="absolute bottom-10 right-20 w-80 h-80 bg-emerald-100 rounded-full filter blur-3xl opacity-30"
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
        </div>

        {/* Hero Section */}
        <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-32 lg:py-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-2xl text-center lg:text-left mb-16 lg:mb-0"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-teal-50 rounded-full border border-teal-100">
              <Truck className="h-5 w-5 text-teal-600 mr-2" />
              <span className="text-teal-700 font-medium">Sustainable Food Redistribution</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                <Typewriter
                  options={{
                    strings: ["SaveNServe", "Reduce Waste", "Feed Communities", "Create Impact"],
                    autoStart: true,
                    loop: true,
                    delay: 70,
                    deleteSpeed: 40,
                  }}
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Connecting businesses with surplus food to communities in need. Our platform makes food redistribution efficient, 
              transparent, and impactful for a more sustainable future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-200"
              >
                Join Our Network
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:bg-gray-50"
              >
                How It Works
              </motion.button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"></div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">500+ Partners</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">4.9/5 (1,200+ reviews)</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 w-full max-w-xl"
          >
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-20">
              <div className="absolute inset-0 bg-[url('/images/dot-pattern-light.svg')] opacity-5"></div>
              
              <div className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-teal-600" />
                    <span className="text-lg font-semibold text-gray-800">Food Redistribution Dashboard</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <Leaf className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Today's Surplus</h3>
                        <p className="text-gray-600 text-sm">Fresh produce available for redistribution</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {['Vegetables', 'Bakery', 'Dairy', 'Prepared Meals'].map((category) => (
                            <span key={category} className="px-3 py-1 bg-white text-teal-700 rounded-full text-xs font-medium border border-teal-100">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="h-4 w-4 text-emerald-500" />
                        <span className="text-xs font-medium text-gray-700">IMPACT</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">1.2M lbs</p>
                      <p className="text-xs text-gray-500">Food saved this month</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-4 w-4 text-teal-500" />
                        <span className="text-xs font-medium text-gray-700">TIME SAVED</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">4,200+ hrs</p>
                      <p className="text-xs text-gray-500">For our partners</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <BarChart2 className="h-4 w-4 text-teal-500" />
                        <span className="text-xs font-medium text-gray-700">COMMUNITY IMPACT</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Live</span>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {[30, 60, 90, 120, 90, 60, 30].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={`flex-1 rounded-t-sm ${
                            i % 2 === 0 ? 'bg-teal-400' : 'bg-teal-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Meals distributed last week</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center">
                <div className="text-xs text-gray-500">SaveNServe Platform v3.2</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-lg transition-all"
                >
                  View Available Surplus
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "5M+", label: "Pounds of food saved", icon: <Leaf className="h-6 w-6 text-teal-600" /> },
                { value: "2.1M", label: "Meals provided", icon: <DollarSign className="h-6 w-6 text-teal-600" /> },
                { value: "850+", label: "Partner organizations", icon: <Truck className="h-6 w-6 text-teal-600" /> },
                { value: "72", label: "Communities served", icon: <Zap className="h-6 w-6 text-teal-600" /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-teal-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-teal-50 rounded-lg">
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Rest of your components */}
        <HowItWorks />
        <Features />
        <Testimonials />
        <CommunityImpact />
        <Partners />
        <FinalCTA />

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
