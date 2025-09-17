"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import { Users, Heart, ShieldCheck } from "lucide-react";

const aboutVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export default function About() {
  return (
    <>
      <Head>
        <title>About - SaveNServe</title>
        <meta
          name="description"
          content="Learn more about SaveNServe, our mission to fight food insecurity, and how you can be part of the change."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-gray-50 text-gray-900 py-16">
        {/* Hero Section */}
        <section className="text-center max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.h6
            variants={aboutVariants}
            initial="initial"
            animate="animate"
            transition="transition"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
          >
            About SaveNServe
          </motion.h6>

          <motion.p
            variants={aboutVariants}
            initial="initial"
            animate="animate"
            transition="transition"
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            At SaveNServe, we are dedicated to fighting food insecurity by redistributing surplus food to those in need.
            Join us in creating a more sustainable and equitable food system.
          </motion.p>
        </section>

        {/* Mission Section */}
        <section className="bg-gray-100 py-16">
          <div className="text-center max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.h2
              variants={aboutVariants}
              initial="initial"
              animate="animate"
              transition="transition"
              className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6"
            >
              Our Mission
            </motion.h2>

            <motion.p
              variants={aboutVariants}
              initial="initial"
              animate="animate"
              transition="transition"
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              We are committed to reducing food waste, improving food security, and building community connections by redistributing food
              where it’s needed the most. Our mission is simple: no food should go to waste when there are people in need.
            </motion.p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <motion.h2
              variants={aboutVariants}
              initial="initial"
              animate="animate"
              transition="transition"
              className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6"
            >
              Our Core Values
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                variants={aboutVariants}
                initial="initial"
                animate="animate"
                transition="transition"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Compassion</h3>
                <p className="text-gray-600">
                  We believe in treating everyone with kindness and empathy. Food is a basic human right, and we are here to ensure
                  everyone has access to it.
                </p>
              </motion.div>

              <motion.div
                variants={aboutVariants}
                initial="initial"
                animate="animate"
                transition="transition"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <ShieldCheck className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  We strive to build a sustainable food system where waste is minimized, and food resources are used efficiently to
                  support local communities.
                </p>
              </motion.div>

              <motion.div
                variants={aboutVariants}
                initial="initial"
                animate="animate"
                transition="transition"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Community</h3>
                <p className="text-gray-600">
                  We are committed to fostering strong community partnerships to create lasting impact and empower people to take action.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-teal-600 py-16">
          <div className="text-center max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.h2
              variants={aboutVariants}
              initial="initial"
              animate="animate"
              transition="transition"
              className="text-3xl md:text-4xl font-semibold text-white mb-6"
            >
              Join Us Today
            </motion.h2>

            <motion.p
              variants={aboutVariants}
              initial="initial"
              animate="animate"
              transition="transition"
              className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto"
            >
              Together, we can fight food insecurity and make a difference in the lives of many. Get involved and become part of
              the SaveNServe movement today.
            </motion.p>

            
          </div>
        </section>
      </main>
    </>
  );
}
