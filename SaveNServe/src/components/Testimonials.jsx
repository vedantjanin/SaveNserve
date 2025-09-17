"use client";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Bank Director, NYC Food Rescue",
    content: "SaveNServe has transformed how we source food donations. We're now receiving 40% more fresh produce with 30% less effort from our team. The automated matching system is a game-changer.",
    rating: 5,
    image: "/images/testimonial-1.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Sustainability Manager, FreshMart Grocers",
    content: "In just 3 months using SaveNServe, we've reduced our food waste by 65%. The reporting tools help us demonstrate our sustainability impact to stakeholders.",
    rating: 5,
    image: "/images/testimonial-2.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Community Coordinator, Meals for All",
    content: "The real-time notifications mean we never miss an opportunity to claim surplus food. We're serving 200 more meals per week thanks to this platform.",
    rating: 4,
    image: "/images/testimonial-3.jpg"
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Operations Director, Urban Eats",
    content: "The logistics coordination features have saved us countless hours. Pickups are now seamless with all documentation handled through the app.",
    rating: 5,
    image: "/images/testimonial-4.jpg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from organizations making real impact with our platform
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 p-2 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 p-2 rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Testimonial cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-teal-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-emerald-100"></div>
                          {/* Replace with actual image */}
                          <div className="absolute inset-0 flex items-center justify-center text-teal-600 font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <Quote className="h-6 w-6 text-teal-400 mb-4" />
                        <p className="text-lg text-gray-700 mb-6 italic">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-teal-600' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-center text-gray-500 mb-6">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity">
            {[
              { name: "Food Rescue Alliance", logo: "/logos/food-rescue.svg" },
              { name: "Urban Harvest", logo: "/logos/urban-harvest.svg" },
              { name: "Community Meals", logo: "/logos/community-meals.svg" },
              { name: "Green Grocers", logo: "/logos/green-grocers.svg" },
              { name: "Feed the Future", logo: "/logos/feed-future.svg" }
            ].map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="h-10 grayscale hover:grayscale-0 transition-all"
              >
                <div className="h-full flex items-center">
                  {/* Replace with actual logo images */}
                  <span className="text-gray-400 font-medium">{partner.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}