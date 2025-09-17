"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      // Simulate form submission (replace this with actual backend call)
      console.log("Form data:", formData);
      setTimeout(() => {
        setStatus("Your message has been sent successfully!");
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" }); // Reset form
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - SaveNServe</title>
        <meta
          name="description"
          content="Contact SaveNServe to learn more or get involved."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-r from-teal-100 to-teal-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            We’d love to hear from you! Please fill out the form below to get in touch with us.
          </p>

          {/* Contact Form */}
          <motion.form
            className="max-w-xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-lg"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-800">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-800">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-800">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-500"
                ></textarea>
              </div>
            </div>

            {/* Status Message */}
            {status && (
              <p
                className={`text-sm mt-2 ${
                  status.includes("success") ? "text-teal-600" : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 transition-all duration-300 disabled:bg-teal-300"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>
        </div>
      </main>
    </>
  );
}
