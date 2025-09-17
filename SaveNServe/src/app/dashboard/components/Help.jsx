import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  LifeBuoy, Phone, Mail, MessageSquare, AlertCircle, 
  FileText, Calendar, Droplet, Sun, CloudRain, 
  Thermometer, Zap, Shield, Database, BarChart2,
  ChevronDown, ChevronUp, Search, X, User, Settings,
  HelpCircle, Clipboard, TrendingUp, Globe, Truck
} from 'lucide-react';

const FarmerHelpCenter = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [suggestion, setSuggestion] = useState('');
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
    { id: 'getting-started', label: 'Getting Started', icon: <User size={18} className="mr-2" /> },
    { id: 'surplus', label: 'Surplus Management', icon: <TrendingUp size={18} className="mr-2" /> },
    { id: 'resources', label: 'Farming Resources', icon: <Database size={18} className="mr-2" /> },
    { id: 'emergency', label: 'Emergency Help', icon: <AlertCircle size={18} className="mr-2" /> },
    { id: 'contact', label: 'Contact Support', icon: <HelpCircle size={18} className="mr-2" /> }
  ];

  // FAQ Categories for Farmers
  const faqCategories = [
    {
      id: 'account',
      title: 'Account & Profile',
      icon: <Shield size={18} className="mr-2" />,
      questions: [
        {
          id: 1,
          question: 'How do I update my farm details?',
          answer: 'You can update your farm details by going to your profile page and clicking the "Edit Profile" button. Make sure to save your changes before exiting.'
        },
        {
          id: 2,
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page. You\'ll receive an email with instructions to reset your password.'
        }
      ]
    },
    {
      id: 'surplus',
      title: 'Surplus Listings',
      icon: <Clipboard size={18} className="mr-2" />,
      questions: [
        {
          id: 3,
          question: 'How do I add a new surplus listing?',
          answer: 'Navigate to the "Add Surplus" page from the sidebar. Fill in all required details about your produce and submit the form.'
        },
        {
          id: 4,
          question: 'Can I edit a listing after posting?',
          answer: 'Yes, go to "My Listings" and click the edit icon next to the listing you want to modify. Note that some fields may be locked after receiving offers.'
        }
      ]
    },
    {
      id: 'donations',
      title: 'Donations',
      icon: <LifeBuoy size={18} className="mr-2" />,
      questions: [
        {
          id: 5,
          question: 'How does the donation process work?',
          answer: 'When you mark produce as available for donation, local organizations can request it. You\'ll receive notifications and can approve or decline requests.'
        },
        {
          id: 6,
          question: 'Do I get any benefits for donations?',
          answer: 'Yes! Donations qualify you for tax deductions and our "Community Champion" rewards program with exclusive benefits.'
        }
      ]
    },
    {
      id: 'weather',
      title: 'Weather & Alerts',
      icon: <CloudRain size={18} className="mr-2" />,
      questions: [
        {
          id: 7,
          question: 'How do weather alerts work?',
          answer: 'Our system monitors local weather and sends you alerts for conditions that may affect your crops (frost, heavy rain, etc.) based on your location.'
        },
        {
          id: 8,
          question: 'Can I customize alert preferences?',
          answer: 'Yes, go to Settings > Notifications to select which alerts you want to receive and how (email, SMS, or app notification).'
        }
      ]
    }
  ];

  // Emergency contacts for farmers
  const emergencyContacts = [
    {
      name: 'Agricultural Emergency',
      number: '1800-AG-HELP',
      description: '24/7 support for crop diseases, pest outbreaks'
    },
    {
      name: 'Weather Hotline',
      number: '1800-WEATHER',
      description: 'Real-time weather updates and advisories'
    },
    {
      name: 'Market Price Info',
      number: '1800-MARKET',
      description: 'Daily commodity prices and trends'
    },
    {
      name: 'Soil Testing',
      number: '1800-SOIL-LAB',
      description: 'Schedule soil sample pickups and get results'
    }
  ];

  // Resources for farmers
  const resources = {
    guides: [
      {
        id: 1,
        title: 'Organic Farming Handbook',
        description: 'Complete guide to transitioning to organic practices',
       
      },
      {
        id: 2,
        title: 'Pest Management Guide',
        description: 'Identify and control common agricultural pests',
        
      },
      {
        id: 3,
        title: 'Market Pricing Trends',
        description: 'Annual report on commodity price fluctuations',
        
      }
    ],
    programs: [
      {
        id: 1,
        title: 'Subsidy Applications',
        description: 'Current agricultural subsidy programs and application deadlines'
      },
      {
        id: 2,
        title: 'Disaster Relief',
        description: 'Financial assistance programs for weather-related crop losses'
      },
      {
        id: 3,
        title: 'Conservation Programs',
        description: 'Incentives for implementing sustainable farming practices'
      }
    ],
    tools: [
      {
        id: 1,
        title: 'Seasonal Guides',
        description: 'Month-by-month farming calendars tailored to your region and crops.',
        icon: <Calendar className="h-6 w-6 text-teal-600" />
      },
      {
        id: 2,
        title: 'Irrigation Calculator',
        description: 'Tools to optimize water usage based on your crops and soil type.',
        icon: <Droplet className="h-6 w-6 text-blue-600" />
      },
    
    ]
  };

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();
    toast.success('Thank you for your suggestion! We\'ll review it shortly.');
    setSuggestion('');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
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
        text: 'Hello! Thank you for reaching out to Farmer Support. How can we help you today?',
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
    
    // Simulate response after 1 second
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Help Center</h1>
          <p className="mt-2 text-gray-600">Everything you need to succeed with our farming platform</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
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
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Getting Started */}
          {activeTab === 'getting-started' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Getting Started with FarmConnect</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="bg-teal-100 text-teal-600 p-2 rounded-full mr-3">
                      <User size={20} />
                    </span>
                    Registration Process
                  </h3>
                  <ol className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">1</span>
                      <span>Click on "Register as Farmer" on our homepage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">2</span>
                      <span>Fill in your farm details and verification documents</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">3</span>
                      <span>Our team will verify your details within 24-48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">4</span>
                      <span>Once approved, you can start listing your surplus produce</span>
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                      <TrendingUp size={20} />
                    </span>
                    Farmer Benefits
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Reach new markets for your surplus produce</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Get fair prices while reducing food waste</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Connect directly with buyers and NGOs</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Access farming resources and market insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Surplus Management */}
          {activeTab === 'surplus' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Managing Your Surplus Produce</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Create Listings</h3>
                    <p className="text-gray-600">Easily list your surplus produce with details like quantity, quality, and preferred pricing.</p>
                  </div>
                  
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Receive Offers</h3>
                    <p className="text-gray-600">Get offers from buyers and NGOs. Review details and accept the best offers for your produce.</p>
                  </div>
                  
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Arrange Logistics</h3>
                    <p className="text-gray-600">Coordinate pickup or delivery with the buyer. Our platform helps facilitate smooth transactions.</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Pro Tip</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          List your surplus as soon as possible to maximize visibility and potential offers. Include clear photos and accurate descriptions for best results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    onClick={() => toast.success('Download started')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Surplus Management Guide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Farming Resources */}
          {activeTab === 'resources' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Farming Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Documentation</h3>
                  <ul className="space-y-3">
                    {resources.guides.map((doc, i) => (
                      <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
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
                          className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                        >
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Government Programs</h3>
                  <ul className="space-y-3">
                    {resources.programs.map((program, i) => (
                      <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-lg mr-3">
                            <Globe className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">{program.title}</p>
                            <p className="text-xs text-gray-500">{program.description}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => toast.success(`Opening ${program.title}`)}
                          className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                        >
                          Learn More
                        </button>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4 border-b pb-2">Interactive Tools</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {resources.tools.map((tool, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white transition">
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
                          className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                        >
                          Open Tool →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Help */}
          {activeTab === 'emergency' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Emergency Assistance</h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
                  <div className="p-6 bg-red-50 border-b border-red-200">
                    <h3 className="text-xl font-bold text-red-800 flex items-center">
                      <AlertCircle className="mr-3" size={24} />
                      Emergency Contacts
                    </h3>
                    <p className="text-red-700 mt-2">
                      Immediate assistance for critical farming situations
                    </p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {emergencyContacts.map((contact, index) => (
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
                      <Thermometer className="mr-3 text-yellow-600" size={24} />
                      Crop Emergency Guide
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-2">Pest Outbreak</h4>
                        <p className="text-yellow-700 text-sm mb-2">
                          Identify common pests and immediate containment measures to protect your crops.
                        </p>
                        <button 
                          onClick={() => toast.success('Opening Pest Guide')}
                          className="text-yellow-700 hover:text-yellow-800 text-sm font-medium"
                        >
                          View Guide →
                        </button>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-medium text-red-800 mb-2">Disease Control</h4>
                        <p className="text-red-700 text-sm mb-2">
                          Steps to isolate and treat common plant diseases to prevent spread.
                        </p>
                        <button 
                          onClick={() => toast.success('Opening Disease Guide')}
                          className="text-red-700 hover:text-red-800 text-sm font-medium"
                        >
                          View Guide →
                        </button>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2">Weather Damage</h4>
                        <p className="text-blue-700 text-sm mb-2">
                          Recovery procedures after hail, frost, or flood damage to your fields.
                        </p>
                        <button 
                          onClick={() => toast.success('Opening Weather Guide')}
                          className="text-blue-700 hover:text-blue-800 text-sm font-medium"
                        >
                          View Guide →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="mr-3 text-purple-600" size={24} />
                      
                    </h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toast.success('Opening Pest Report')}
                          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
                        >
                          <span className="font-medium">Report Crop Disease</span>
                          <ChevronDown size={20} />
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toast.success('Opening Soil Test')}
                          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
                        >
                          <span className="font-medium">Request Soil Test</span>
                          <ChevronDown size={20} />
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toast.success('Opening Irrigation Support')}
                          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
                        >
                          <span className="font-medium">Emergency Irrigation Support</span>
                          <ChevronDown size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Support */}
          {activeTab === 'contact' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Farmer Support</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <form onSubmit={handleContactSubmit}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
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
                        <div className="flex-shrink-0 bg-teal-100 rounded-lg p-3 mr-4">
                          <Phone className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Phone Support</h4>
                          <p className="text-gray-600 mt-1">Call our farmer support line</p>
                          <a href="tel:18003277435" className="text-teal-600 font-medium mt-2 hover:text-teal-700">1-800-FARM-HELP</a>
                          <p className="text-sm text-gray-500 mt-1">Monday-Friday, 7am-7pm EST</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-teal-100 rounded-lg p-3 mr-4">
                                                    <Mail className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Email Us</h4>
                          <p className="text-gray-600 mt-1">Send us an email anytime</p>
                          <a href="mailto:support@farmconnect.com" className="text-teal-600 font-medium mt-2 hover:text-teal-700">support@farmconnect.com</a>
                          <p className="text-sm text-gray-500 mt-1">Typically respond within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-teal-100 rounded-lg p-3 mr-4">
                          <MessageSquare className="h-6 w-6 text-teal-600" />
                        </div>
                        {/* <div>
                          <h4 className="font-medium text-gray-900">Live Chat</h4>
                          <p className="text-gray-600 mt-1">Chat with a support agent</p>
                          <button 
                            onClick={startLiveChat}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium mt-2 hover:bg-gray-200 transition"
                          >
                            Start Chat
                          </button>
                          <p className="text-sm text-gray-500 mt-1">Available 9am-5pm EST</p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Farmer Community Forum</h3>
                    <p className="text-gray-600 mb-4">
                      Connect with other farmers, share tips, and get advice from agricultural experts in our community forum.
                    </p>
                    <button 
                      onClick={() => toast.success('Redirecting to Farmer Forum')}
                      className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
                    >
                      Visit Farmer Forum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Chat Modal
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
          <div className="bg-teal-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="font-medium">Farmer Support Chat</h3>
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
                      ? 'bg-teal-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-teal-200' : 'text-gray-500'}`}>
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )} */}

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        <div key={q.id} className="border border-gray-200 rounded-lg overflow-hidden">
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

      
    </div>
  );
};

export default FarmerHelpCenter;