"use client";

import { 
  HelpCircle, LifeBuoy, Mail, MessageSquare, 
  FileText, ChevronDown, ChevronUp, Search, 
  X, Phone, Settings, Clipboard, TrendingUp, 
  Globe, Truck, CreditCard, Store, Users, 
  BarChart2, Package, ShieldAlert, Calendar,
  Zap, Shield, Database, User
} from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const RetailerHelpCenter = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: <Store size={18} className="mr-2" /> },
    { id: 'donations', label: 'Donation Management', icon: <Package size={18} className="mr-2" /> },
    { id: 'analytics', label: 'Data & Analytics', icon: <BarChart2 size={18} className="mr-2" /> },
    { id: 'emergency', label: 'Urgent Help', icon: <ShieldAlert size={18} className="mr-2" /> },
    { id: 'contact', label: 'Contact Support', icon: <HelpCircle size={18} className="mr-2" /> }
  ];

  // FAQ Categories for Retailers
  const faqCategories = [
    {
      id: 'account',
      title: 'Account & Profile',
      icon: <User size={18} className="mr-2" />,
      questions: [
        {
          id: 1,
          question: 'How do I update my store information?',
          answer: 'Navigate to Settings > Store Profile to update your details. Changes are reflected immediately.'
        },
        {
          id: 2,
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page. You\'ll receive an email with reset instructions.'
        }
      ]
    },
    {
      id: 'donations',
      title: 'Donation Process',
      icon: <Package size={18} className="mr-2" />,
      questions: [
        {
          id: 3,
          question: 'How do I report surplus inventory?',
          answer: 'Use the mobile app to scan items or manually enter quantities in the Surplus Dashboard.'
        },
        {
          id: 4,
          question: 'What items are eligible for donation?',
          answer: 'Most perishable and non-perishable food items are eligible. See our Donation Guidelines for details.'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Data & Reports',
      icon: <BarChart2 size={18} className="mr-2" />,
      questions: [
        {
          id: 5,
          question: 'How do I access my donation impact reports?',
          answer: 'Reports are available under Analytics > Impact Dashboard. You can export PDFs for your records.'
        },
        {
          id: 6,
          question: 'What metrics are tracked?',
          answer: 'We track items donated, waste reduction, tax benefits, and community impact metrics.'
        }
      ]
    },
    {
      id: 'benefits',
      title: 'Tax Benefits',
      icon: <CreditCard size={18} className="mr-2" />,
      questions: [
        {
          id: 7,
          question: 'How do I claim tax deductions?',
          answer: 'We provide annual donation reports that meet IRS requirements for charitable contributions.'
        },
        {
          id: 8,
          question: 'What documentation do I need?',
          answer: 'Save your monthly donation summaries and our year-end tax statement for your records.'
        }
      ]
    }
  ];

  // Urgent contacts for retailers
  const urgentContacts = [
    {
      name: 'Donation Pickup',
      number: '1800-PICK-UPS',
      description: 'Schedule immediate surplus collection'
    },
    {
      name: 'Technical Support',
      number: '1800-TECH-AID',
      description: '24/7 platform assistance'
    },
    {
      name: 'Food Safety',
      number: '1800-SAFE-FOOD',
      description: 'Report potential food safety issues'
    },
    {
      name: 'Account Help',
      number: '1800-ACCOUNT',
      description: 'Billing and account inquiries'
    }
  ];

  // Resources for retailers
  const resources = {
    guides: [
      {
        id: 1,
        title: 'Donation Process Guide',
        description: 'Step-by-step instructions for reporting and managing surplus',
        type: 'pdf'
      },
      {
        id: 2,
        title: 'Tax Benefit Handbook',
        description: 'Maximizing your deductions through donations',
        type: 'pdf'
      },
      {
        id: 3,
        title: 'Sustainability Report',
        description: 'Measuring your environmental impact',
        type: 'pdf'
      }
    ],
    tools: [
      {
        id: 1,
        title: 'Donation Calculator',
        description: 'Estimate tax savings from your donations',
        icon: <CreditCard className="h-6 w-6 text-indigo-600" />
      },
      {
        id: 2,
        title: 'Inventory Planner',
        description: 'Optimize ordering to reduce surplus',
        icon: <Clipboard className="h-6 w-6 text-green-600" />
      },
      {
        id: 3,
        title: 'Impact Dashboard',
        description: 'Track your community contributions',
        icon: <TrendingUp className="h-6 w-6 text-blue-600" />
      }
    ]
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll respond within 24 hours.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const startLiveChat = () => {
    setIsChatOpen(true);
    setChatMessages([
      {
        id: 1,
        sender: 'support',
        text: 'Hello! Thank you for reaching out to Retailer Support. How can we assist you today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim() === '') return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');
    
    setTimeout(() => {
      const responseMessage = {
        id: chatMessages.length + 2,
        sender: 'support',
        text: 'Thank you for your message. Let me check that for you...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const downloadResource = (title) => {
    toast.success(`Downloading ${title}.pdf...`);
  };

  // Filter FAQs based on search
  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Retailer Support Center</h1>
              <p className="mt-2 text-blue-100">Expert help for your donation operations</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={startLiveChat}
                className="flex items-center px-5 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                <MessageSquare className="mr-2" size={18} />
                Live Chat Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Getting Started */}
          {activeTab === 'getting-started' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Getting Started with Retail Donations</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-3">
                      <Store size={20} />
                    </span>
                    Onboarding Process
                  </h3>
                  <ol className="space-y-4 text-gray-600">
                    {[
                      "Complete your retailer profile with store details",
                      "Set up your inventory integration (optional)",
                      "Train staff on donation reporting procedures",
                      "Schedule your first donation pickup",
                      "Access your impact dashboard"
                    ].map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                      <TrendingUp size={20} />
                    </span>
                    Retailer Benefits
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    {[
                      "Reduce waste disposal costs",
                      "Qualify for tax deductions",
                      "Enhance community reputation",
                      "Meet sustainability goals",
                      "Access detailed analytics"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Donation Management */}
          {activeTab === 'donations' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Managing Your Donations</h2>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Reporting Surplus",
                      icon: <Clipboard size={20} />,
                      color: "purple",
                      steps: [
                        "Scan items or enter manually",
                        "Specify quantities and condition",
                        "Submit for pickup scheduling"
                      ]
                    },
                    {
                      title: "Pickup Process",
                      icon: <Truck size={20} />,
                      color: "blue",
                      steps: [
                        "Receive confirmation notification",
                        "Prepare items for collection",
                        "Get digital receipt after pickup"
                      ]
                    },
                    {
                      title: "Tracking Impact",
                      icon: <BarChart2 size={20} />,
                      color: "green",
                      steps: [
                        "View real-time dashboard",
                        "Access monthly reports",
                        "Download tax documentation"
                      ]
                    }
                  ].map((section, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-indigo-300 transition">
                      <div className={`bg-${section.color}-100 text-${section.color}-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                        {section.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h3>
                      <ul className="space-y-2 text-gray-600">
                        {section.steps.map((step, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 bg-white text-gray-800 font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
                    <Zap className="mr-2" size={20} />
                    Quick Start Video Guides
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    {[
                      { title: "Reporting Surplus", duration: "2:15" },
                      { title: "Using the Mobile App", duration: "3:45" },
                      { title: "Understanding Reports", duration: "4:30" }
                    ].map((video, i) => (
                      <button 
                        key={i}
                        onClick={() => toast.success(`Playing: ${video.title}`)}
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 text-left transition"
                      >
                        <div className="bg-gray-100 aspect-video rounded mb-3 flex items-center justify-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-800">{video.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{video.duration}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Analytics */}
          {activeTab === 'analytics' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Data & Analytics</h2>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Documentation</h3>
                    <ul className="space-y-3">
                      {resources.guides.map((doc, i) => (
                        <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
                          <div className="flex items-center">
                            <div className="p-2 bg-gray-100 rounded-lg mr-3">
                              <FileText className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">{doc.title}</p>
                              <p className="text-xs text-gray-500">{doc.type} • {doc.description}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => downloadResource(doc.title)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            Download
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Interactive Tools</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {resources.tools.map((tool, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white transition">
                          <div className="flex items-center">
                            <div className="mr-3">
                              {tool.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{tool.title}</h4>
                              <p className="text-sm text-gray-600">{tool.description}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => toast.success(`Opening ${tool.title}`)}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            Open Tool →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Analytics Dashboard Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                    <BarChart2 className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <h4 className="font-medium text-gray-700">Your Analytics Dashboard</h4>
                    <p className="text-gray-500 text-sm mt-1">View real-time metrics on your donation impact</p>
                    <button 
                      onClick={() => toast.success('Redirecting to Analytics Dashboard')}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Urgent Help */}
          {activeTab === 'emergency' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Urgent Assistance</h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
                  <div className="p-6 bg-red-50 border-b border-red-200">
                    <h3 className="text-xl font-bold text-red-800 flex items-center">
                      <ShieldAlert className="mr-3" size={24} />
                      Urgent Contacts
                    </h3>
                    <p className="text-red-700 mt-2">
                      Immediate assistance for critical donation situations
                    </p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {urgentContacts.map((contact, index) => (
                      <div key={index} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-red-100 rounded-full p-3 mr-4">
                            <Phone className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{contact.name}</h3>
                            <p className="text-gray-600 mt-1">{contact.description}</p>
                            <div className="mt-3 flex items-center">
                              <a 
                                href={`tel:${contact.number.replace(/-/g, '')}`}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                              >
                                Call {contact.number}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Package className="mr-3 text-indigo-600" size={24} />
                      Donation Issues
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Missed Pickup",
                          description: "Report a scheduled pickup that didn't occur",
                          color: "red"
                        },
                        {
                          title: "Item Rejection",
                          description: "Contest rejected donation items",
                          color: "yellow"
                        },
                        {
                          title: "Quantity Dispute",
                          description: "Resolve discrepancies in reported quantities",
                          color: "blue"
                        }
                      ].map((issue, i) => (
                        <div key={i} className={`p-4 bg-${issue.color}-50 rounded-lg border border-${issue.color}-200`}>
                          <h4 className={`font-medium text-${issue.color}-800 mb-2`}>{issue.title}</h4>
                          <p className={`text-${issue.color}-700 text-sm mb-2`}>
                            {issue.description}
                          </p>
                          <button 
                            onClick={() => toast.success(`Opening ${issue.title} Form`)}
                            className={`text-${issue.color}-700 hover:text-${issue.color}-800 text-sm font-medium`}
                          >
                            Report Issue →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="mr-3 text-purple-600" size={24} />
                      Quick Response Tools
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Request Emergency Pickup",
                        "Report Food Safety Concern",
                        "Technical Support Request"
                      ].map((tool, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toast.success(`Opening ${tool}`)}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
                          >
                            <span className="font-medium">{tool}</span>
                            <ChevronDown size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Support */}
          {activeTab === 'contact' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Retailer Support</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <form onSubmit={handleContactSubmit}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Other ways to reach us</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3 mr-4">
                          <Phone className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Phone Support</h4>
                          <p className="text-gray-600 mt-1">Call our dedicated retailer support line</p>
                          <a href="tel:18003277435" className="text-indigo-600 font-medium mt-2 hover:text-indigo-700">1-800-RETAIL-HELP</a>
                          <p className="text-sm text-gray-500 mt-1">Monday-Friday, 8am-8pm EST</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3 mr-4">
                          <Mail className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Email Us</h4>
                          <p className="text-gray-600 mt-1">Send us an email anytime</p>
                          <a href="mailto:retailers@donationplatform.com" className="text-indigo-600 font-medium mt-2 hover:text-indigo-700">retailers@donationplatform.com</a>
                          <p className="text-sm text-gray-500 mt-1">Typically respond within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Retailer Community</h3>
                    <p className="text-gray-600 mb-4">
                      Connect with other retailers, share best practices, and get advice from donation experts in our community forum.
                    </p>
                    <button 
                      onClick={() => toast.success('Redirecting to Retailer Forum')}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-blue-600 transition"
                    >
                      Join Retailer Community
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map(category => (
                  <div key={category.id} className="mb-8">
                    <div className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      {category.icon}
                      {category.title}
                    </div>
                    <div className="space-y-3">
                      {category.questions.map(q => (
                        <div key={q.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-300 transition">
                          <button
                            onClick={() => toggleFaq(q.id)}
                            className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
                          >
                            <span className="text-left font-medium text-gray-800">{q.question}</span>
                            {expandedFaq === q.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                          {expandedFaq === q.id && (
                            <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                              {q.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                    <Search size={24} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                  <p className="text-gray-500">Try different search terms or browse the categories</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 transform transition-all duration-300 ease-in-out">
          <div className="bg-indigo-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="font-medium">Retailer Support Chat</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {chatMessages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendChatMessage} className="p-3 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RetailerHelpCenter;