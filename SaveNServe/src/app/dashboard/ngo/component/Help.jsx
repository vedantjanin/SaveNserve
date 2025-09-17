import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const NGOHelpPage = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [suggestion, setSuggestion] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const tabs = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'donation-process', label: 'Donation Process' },
    { id: 'resources', label: 'Resources' },
    { id: 'suggestions', label: 'Suggestions' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">NGO Support Center</h1>
          <p className="mt-2 text-gray-600">Everything you need to make the most of our platform</p>
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
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Getting Started with Our Platform</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Registration Process
                  </h3>
                  <ol className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">1</span>
                      <span>Click on "Register as NGO" on our homepage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">2</span>
                      <span>Fill in your organization details and verification documents</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">3</span>
                      <span>Our team will verify your details within 24-48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 bg-gray-100 text-gray-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3">4</span>
                      <span>Once approved, you'll receive login credentials via email</span>
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    NGO Benefits
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Access to fresh, high-quality farm surplus</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Discounted rates compared to market prices</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Direct communication with farmers</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Regular updates on available produce</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Donation Process */}
          {activeTab === 'donation-process' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How Our Donation Process Works</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Available Surplus</h3>
                    <p className="text-gray-600">View real-time listings of farm surplus from our network of verified farmers. Filter by produce type, quantity, and location.</p>
                  </div>
                  
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Place Your Request</h3>
                    <p className="text-gray-600">Select the items you need and specify quantity. Our system will calculate the total cost including any delivery fees.</p>
                  </div>
                  
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Schedule Collection</h3>
                    <p className="text-gray-600">Coordinate pickup or delivery directly with the farmer. Most collections happen within 48 hours of request.</p>
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
                      <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          All donations must be collected within 72 hours of confirmation. Perishable items will be prioritized for same-day distribution.
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
                    Download Donation Process PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Resources */}
          {activeTab === 'resources' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Resources for NGOs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Documentation</h3>
                  <ul className="space-y-3">
                    {[
                      { name: 'NGO Partnership Agreement', type: 'PDF', size: '2.4 MB' },
                      { name: 'Food Safety Guidelines', type: 'PDF', size: '1.8 MB' },
                      { name: 'Distribution Best Practices', type: 'PDF', size: '3.1 MB' },
                      { name: 'Tax Deduction Information', type: 'DOC', size: '0.9 MB' },
                    ].map((doc, i) => (
                      <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => toast.success(`Downloading ${doc.name}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Useful Links</h3>
                  <ul className="space-y-3">
                    {[
                      { name: 'Food Distribution Network Map', url: '#' },
                      { name: 'Upcoming Training Webinars', url: '#' },
                      { name: 'Community Impact Stories', url: '#' },
                      { name: 'Partner NGO Directory', url: '#' },
                    ].map((link, i) => (
                      <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-700">{link.name}</p>
                        </div>
                        <button 
                          onClick={() => toast.success(`Opening ${link.name}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Visit
                        </button>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4 border-b pb-2">Training Videos</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden w-24 h-16 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-800">Food Safety Handling Procedures</p>
                        <p className="text-sm text-gray-500 mt-1">15 min • Beginner</p>
                        <button 
                          onClick={() => toast.success('Video playback started')}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Watch Now
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden w-24 h-16 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-800">Maximizing Impact with Limited Resources</p>
                        <p className="text-sm text-gray-500 mt-1">22 min • Intermediate</p>
                        <button 
                          onClick={() => toast.success('Video playback started')}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {activeTab === 'suggestions' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Suggestions</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">We Value Your Input</h3>
                  <p className="text-gray-600 mb-6">
                    Your suggestions help us improve the platform for all NGOs. Whether it's a feature request, process improvement, 
                    or general feedback, we'd love to hear from you.
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-3">Recent Implemented Suggestions</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Bulk request functionality added (July 2023)</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Mobile app notification system (May 2023)</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Advanced filtering options (March 2023)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <form onSubmit={handleSubmitSuggestion}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Suggestion
                        </label>
                        <textarea
                          id="suggestion"
                          name="suggestion"
                          rows={5}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Describe your suggestion in detail..."
                          value={suggestion}
                          onChange={(e) => setSuggestion(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="contact-permission"
                          name="contact-permission"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="contact-permission" className="ml-2 block text-sm text-gray-700">
                          Allow us to contact you about this suggestion
                        </label>
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit Suggestion
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Contact Us */}
          {activeTab === 'contact' && (
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Our Support Team</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>
                  <p className="text-gray-600 mb-6">
                    Have questions or need assistance? Our dedicated support team is here to help NGOs make the most of our platform.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Email Support</p>
                        <p className="text-sm text-gray-500">ngo-support@farmconnect.org</p>
                        <button 
                          onClick={() => toast.success('Email client opened')}
                          className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Phone Support</p>
                        <p className="text-sm text-gray-500">+1 (800) 555-0199</p>
                        <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am-5pm EST</p>
                        <button 
                          onClick={() => toast.success('Call initiated')}
                          className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Call Now
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Live Chat</p>
                        <p className="text-sm text-gray-500">Available during business hours</p>
                        <button 
                          onClick={() => toast.success('Connecting to live chat')}
                          className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Start Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Send Us a Message</h3>
                  <form onSubmit={handleContactSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                  
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Regional Support Centers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">North Region</h4>
                        <p className="text-sm text-gray-600 mt-1">support-north@farmconnect.org</p>
                        <p className="text-sm text-gray-600">+1 (800) 555-0200</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">South Region</h4>
                        <p className="text-sm text-gray-600 mt-1">support-south@farmconnect.org</p>
                        <p className="text-sm text-gray-600">+1 (800) 555-0201</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">East Region</h4>
                        <p className="text-sm text-gray-600 mt-1">support-east@farmconnect.org</p>
                        <p className="text-sm text-gray-600">+1 (800) 555-0202</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">West Region</h4>
                        <p className="text-sm text-gray-600 mt-1">support-west@farmconnect.org</p>
                        <p className="text-sm text-gray-600">+1 (800) 555-0203</p>
                      </div>
                    </div>
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
            
            <div className="space-y-6">
              {[
                {
                  question: "How do I verify my NGO status?",
                  answer: "You'll need to submit your NGO registration certificate and tax exemption documents during the signup process. Our team verifies these documents within 24-48 hours."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, bank transfers, and digital payment platforms. Some regions may have additional payment options available."
                },
                {
                  question: "Can I schedule recurring donations?",
                  answer: "Yes! Our platform supports recurring donations. You can set up weekly, bi-weekly, or monthly donations in your account settings."
                },
                {
                  question: "How is food quality ensured?",
                  answer: "All farm partners follow strict quality control measures. We also conduct random quality checks and maintain detailed records of all produce sources."
                },
                {
                  question: "What if I need to cancel a donation request?",
                  answer: "You can cancel requests up to 12 hours before scheduled pickup without penalty. Later cancellations may incur a small processing fee."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <button 
                    className="flex justify-between items-start w-full text-left"
                    onClick={() => toast.success(`Expanding FAQ: ${faq.question}`)}
                  >
                    <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="mt-2 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => toast.success('Loading more FAQs')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Load More Questions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default NGOHelpPage;