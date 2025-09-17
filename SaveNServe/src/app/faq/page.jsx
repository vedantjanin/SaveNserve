'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const [categories, setCategories] = useState(['All', 'Donations', 'Volunteering', 'Technology']);
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs = [
    {
      question: 'How do I become a food donor?',
      answer: 'Sign up on our website, list your available food, and schedule a pickup. We handle the rest!',
      category: 'Donations'
    },
    {
      question: 'What technology powers your platform?',
      answer: 'We use AI for food matching, real-time tracking, and optimized routing to minimize food waste.',
      category: 'Technology'
    },
    {
      question: 'Can I volunteer to help with deliveries?',
      answer: 'Yes! We need drivers across all regions. Sign up through our volunteer portal and complete a brief orientation.',
      category: 'Volunteering'
    },
    {
      question: 'How do you ensure food safety?',
      answer: 'All donations are screened, and we provide handling guidelines. Recipients confirm quality upon receipt.',
      category: 'Donations'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, our iOS and Android apps allow real-time donation tracking and notifications.',
      category: 'Technology'
    },
    {
      question: 'What volunteer roles are available?',
      answer: 'We need drivers, warehouse helpers, community coordinators, and tech support volunteers.',
      category: 'Volunteering'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setActiveIndex(null); // Close all FAQs when searching
    }
  }, [searchQuery]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 mb-4">
        
          
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about donating, volunteering, and our technology.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search FAQs..."
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                    {faq.category}
                  </span>
                  <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                </div>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                    {faq.category === 'Donations' && (
                      <a 
                        href="/donate" 
                        className="inline-flex items-center mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Learn more about donating <ChevronDown className="h-4 w-4 ml-1 rotate-90" />
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-gray-500">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}