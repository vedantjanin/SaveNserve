'use client';
import { motion } from 'framer-motion';
import { Leaf, Truck, Utensils, PieChart, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const solutions = [
  {
    id: 'surplus-detection',
    title: "Smart Surplus Detection",
    description: "Restaurants and grocery stores log surplus food through our intuitive dashboard, powered by real-time data tagging and image analysis.",
    icon: <PieChart className="w-6 h-6 text-emerald-600" />,
    features: [
      "AI-powered food recognition",
      "Real-time inventory tracking",
      "Automated expiry alerts",
      "Barcode scanning"
    ],
    stats: [
      { value: "78%", label: "Reduction in food logging time" },
      { value: "95%", label: "Accuracy in food categorization" }
    ]
  },
  {
    id: 'redistribution',
    title: "Efficient Redistribution",
    description: "We match surplus food with nearby shelters and food banks using optimized logistics and intelligent routing algorithms.",
    icon: <Truck className="w-6 h-6 text-emerald-600" />,
    features: [
      "Dynamic routing algorithms",
      "Real-time matching system",
      "Multi-stop optimization",
      "Driver tracking"
    ],
    stats: [
      { value: "40%", label: "Faster deliveries" },
      { value: "92%", label: "Match accuracy" }
    ]
  },
  {
    id: 'community',
    title: "Community Engagement",
    description: "Local volunteers and drivers help redistribute food, fostering stronger community bonds and collective impact.",
    icon: <Utensils className="w-6 h-6 text-emerald-600" />,
    features: [
      "Volunteer management portal",
      "Community impact dashboard",
      "Gamified participation",
      "Local event coordination"
    ],
    stats: [
      { value: "500+", label: "Active volunteers" },
      { value: "85%", label: "Volunteer retention" }
    ]
  },
  {
    id: 'environment',
    title: "Environmental Impact",
    description: "By reducing food waste, we cut methane emissions and support sustainability goals at both local and national levels.",
    icon: <Leaf className="w-6 h-6 text-emerald-600" />,
    features: [
      "Carbon footprint tracking",
      "Sustainability reporting",
      "Waste diversion analytics",
      "Compost partnerships"
    ],
    stats: [
      { value: "15K", label: "Tons CO₂ prevented" },
      { value: "1M+", label: "Meals redirected" }
    ]
  }
];

export default function Solution() {
  const router = useRouter();

  const handleSolutionClick = (id) => {
    router.push(`/solutions/${id}`);
  };

  const handleJoinClick = () => {
    router.push('/join');
  };

  return (
    <>
      <Head>
        <title>Our Solutions | SaveNServe</title>
        <meta name="description" content="Discover how SaveNServe tackles food waste through technology and community" />
      </Head>

      <main className="bg-gray-50 text-gray-900">
        {/* Hero Section */}
        <section className="py-24 px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center px-4 py-2 mb-4 bg-emerald-50 border border-emerald-100 rounded-full"
            >
              <Leaf className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-emerald-700 font-medium">Our Approach</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tackling Food Waste with <span className="text-emerald-600">Purpose and Tech</span>
            </h1>
            <p className="text-lg text-gray-600">
              SaveNServe is built around a simple but powerful idea: redirect food from waste to where it's needed — fast, efficiently, and sustainably.
            </p>
          </motion.div>
        </section>

        {/* Solution Grid */}
        <section className="pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {solutions.map((sol, index) => (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleSolutionClick(sol.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    {sol.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{sol.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{sol.description}</p>
                <div className="flex items-center text-emerald-600 font-medium text-sm">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white border-t border-gray-200 py-16 px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-3">Be Part of the Solution</h2>
            <p className="text-gray-600 text-lg mb-6">
              Whether you're a business, volunteer, or donor — there's a place for you at SaveNServe.
            </p>
         
          </motion.div>
        </section>
      </main>
    </>
  );
}