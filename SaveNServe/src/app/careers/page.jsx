"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Users } from "lucide-react";
import { useState } from "react";

const careerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      title: "Food Redistribution Coordinator",
      location: "Remote / Flexible",
      description:
        "We are looking for a coordinator to manage food redistribution logistics. The role requires excellent organizational and communication skills.",
      qualifications: [
        "Experience in logistics or supply chain management.",
        "Passionate about sustainability and food security.",
        "Strong communication skills.",
      ],
    },
    {
      title: "Community Engagement Manager",
      location: "San Francisco, CA",
      description:
        "This role involves managing relationships with community organizations and ensuring the smooth distribution of food to underserved populations.",
      qualifications: [
        "Experience in community engagement or nonprofit work.",
        "Strong interpersonal and networking skills.",
        "Familiarity with food insecurity issues.",
      ],
    },
    {
      title: "Software Engineer (Backend)",
      location: "Remote",
      description:
        "Join our development team to build and maintain the platform that connects surplus food with communities in need. We’re looking for a backend developer with a strong understanding of Node.js and MongoDB.",
      qualifications: [
        "Proficient in Node.js, MongoDB, and Express.",
        "Experience with RESTful APIs and microservices.",
        "Strong problem-solving skills and attention to detail.",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Careers - SaveNServe</title>
        <meta
          name="description"
          content="Join the SaveNServe team and help us fight food insecurity. Explore our career opportunities and make an impact."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-gray-50 text-gray-900 py-16">
        <section className="text-center max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.h1
            variants={careerVariants}
            initial="initial"
            animate="animate"
            transition="transition"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
          >
            Join Our Team at SaveNServe
          </motion.h1>

          <motion.p
            variants={careerVariants}
            initial="initial"
            animate="animate"
            transition="transition"
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Be part of a movement to reduce food waste and fight hunger. Check out our current career opportunities.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                variants={careerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8, delay: 0.3 * index }}
                className="bg-white border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6"
              >
                <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.location}</p>
                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="text-sm text-gray-600">
                  <h4 className="font-semibold text-gray-800 mb-2">Qualifications:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {job.qualifications.map((qual, i) => (
                      <li key={i}>{qual}</li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mt-6 px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-300 transition-all duration-300"
                  onClick={() => setSelectedJob(job)}
                >
                  Check Elegiblity
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl max-w-2xl w-full">
              <motion.div
                variants={careerVariants}
                initial="initial"
                animate="animate"
                transition="transition"
                className="space-y-4"
              >
                <h2 className="text-3xl font-semibold text-gray-800">
                  {selectedJob.title} - Apply Now
                </h2>
                <p className="text-gray-700">{selectedJob.description}</p>

                <div className="text-sm text-gray-600">
                  <h4 className="font-semibold text-gray-800 mb-2">Qualifications:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedJob.qualifications.map((qual, i) => (
                      <li key={i}>{qual}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-6">
                 
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-400 transition-all duration-300"
                    onClick={() => setSelectedJob(null)}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
