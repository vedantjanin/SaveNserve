"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";


import { Truck, User, Utensils, Store, HeartHandshake } from "lucide-react";

export default function signup() {
  const [userType, setUserType] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, ...formData }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        // redirect or clear form
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Truck className="h-12 w-12 text-teal-600" />
        </motion.div>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >
          Join <span className="text-teal-600">SaveNServe</span>
        </motion.h2>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-2 text-center text-sm text-gray-600 max-w-md mx-auto"
        >
          Help us reduce food waste and feed communities by connecting surplus food with those in need
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl"
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">I am a:</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <UserTypeCard
                icon={<User className="h-6 w-6" />}
                title="Admin"
                description="Manage & Track"
                selected={userType === "individual"}
                onClick={() => setUserType("individual")}
              />
              <UserTypeCard
                icon={<Store className="h-6 w-6" />}
                title="Retailer"
                description="Supermarkets, restaurants"
                selected={userType === "retailer"}
                onClick={() => setUserType("retailer")}
              />
              <UserTypeCard
                icon={<Utensils className="h-6 w-6" />}
                title="Farmer"
                description="Farms, food producers"
                selected={userType === "farmer"}
                onClick={() => setUserType("farmer")}
              />
              <UserTypeCard
                icon={<HeartHandshake className="h-6 w-6" />}
                title="NGO"
                description="Food banks, charities"
                selected={userType === "ngo"}
                onClick={() => setUserType("ngo")}
              />
            </div>
          </div>

          {userType && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                {userType !== "individual" && (
                  <div className="md:col-span-2">
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                      {userType === "ngo" ? "Organization Name" : "Business Name"}
                    </label>
                    <div className="mt-1">
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    {userType === "individual" ? "Your Address" : "Business Address"}
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <Link href="/terms" className="text-teal-600 hover:text-teal-500">Terms of Service</Link> and <Link href="/privacy" className="text-teal-600 hover:text-teal-500">Privacy Policy</Link>
                </label>
              </div>

              <div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Create Account
                </motion.button>
              </div>
            </motion.form>
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Sign in instead
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function UserTypeCard({ icon, title, description, selected, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${selected ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-teal-300"}`}
    >
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${selected ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-600"}`}>
          {icon}
        </div>
        <h4 className="ml-3 font-medium text-gray-900">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </motion.div>
  );
}