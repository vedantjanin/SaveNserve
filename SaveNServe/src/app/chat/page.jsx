// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Bot, User, Leaf, ShoppingBasket, Send, Loader2, Languages, Mic, MicOff } from "lucide-react";

// export default function ChatPage() {
//   const [activeTab, setActiveTab] = useState("farmer");
//   const [userInput, setUserInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [language, setLanguage] = useState("english"); // 'english' or 'hindi'
//   const [isListening, setIsListening] = useState(false);
//   const [speechSupported, setSpeechSupported] = useState(false);
//   const [interimTranscript, setInterimTranscript] = useState("");
//   const recognitionRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Initialize speech recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       setSpeechSupported(true);
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
      
//       recognitionRef.current.onresult = (event) => {
//         let interim = '';
//         let final = '';
        
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             final += transcript;
//           } else {
//             interim += transcript;
//           }
//         }
        
//         if (final) {
//           setUserInput(prev => prev + (prev ? ' ' : '') + final);
//           setInterimTranscript("");
//         } else {
//           setInterimTranscript(interim);
//         }
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error', event.error);
//         setIsListening(false);
//         setInterimTranscript("");
//       };

//       recognitionRef.current.onend = () => {
//         if (isListening) {
//           recognitionRef.current.start();
//         }
//       };
//     } else {
//       console.warn("Speech recognition not supported in this browser");
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, [isListening]);

//   // Welcome messages for each user type and language
//   const welcomeMessages = {
//     farmer: {
//       english: "👋 Hello farmer! I can help with crop management, market prices, weather forecasts, and sustainable farming practices. What would you like to know today?",
//       hindi: "👋 नमस्ते किसान भाई! मैं फसल प्रबंधन, बाजार भाव, मौसम पूर्वानुमान और टिकाऊ खेती के बारे में मदद कर सकता हूँ। आज आप क्या जानना चाहेंगे?"
//     },
//     retailer: {
//       english: "🛒 Welcome food retailer! I can assist with food donation logistics, inventory management, tax benefits, and connecting with local food banks."
//     }
//   };

//   // Common questions for quick start
//   const quickQuestions = {
//     farmer: {
//       english: [
//         "What's the best crop for my region this season?",
//         "How can I improve soil fertility?",
//         "Current market prices for tomatoes?"
//       ],
//       hindi: [
//         "इस सीजन में मेरे क्षेत्र के लिए सबसे अच्छी फसल कौन सी है?",
//         "मैं मिट्टी की उर्वरता कैसे सुधार सकता हूँ?",
//         "टमाटर के वर्तमान बाजार भाव क्या हैं?"
//       ]
//     },
//     retailer: {
//       english: [
//         "How do I get tax benefits for food donations?",
//         "Where can I donate excess food in my area?",
//         "Best practices for food preservation?"
//       ]
//     }
//   };

//   // Scroll to bottom of chat
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Initialize with welcome message
//   useEffect(() => {
//     const welcomeMessage = activeTab === "farmer" 
//       ? welcomeMessages.farmer[language] 
//       : welcomeMessages.retailer.english;
    
//     setMessages([{ text: welcomeMessage, sender: "bot" }]);
//   }, [activeTab, language]);

//   const toggleListening = () => {
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       setInterimTranscript("");
//     } else {
//       try {
//         recognitionRef.current.lang = language === "hindi" ? "hi-IN" : "en-US";
//         recognitionRef.current.start();
//         setIsListening(true);
//       } catch (error) {
//         console.error("Speech recognition failed:", error);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Combine final input with any interim results
//     const finalInput = userInput + (interimTranscript ? ' ' + interimTranscript : '');
//     if (!finalInput.trim() || loading) return;
    
//     const newMessage = { text: finalInput, sender: "user" };
//     setMessages(prev => [...prev, newMessage]);
//     setUserInput("");
//     setInterimTranscript("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/gemini", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           userInput: finalInput,
//           context: `You are an agricultural assistant helping ${activeTab === "farmer" ? "a farmer" : "a food retailer"}. 
//           ${language === "hindi" ? "Respond in Hindi unless asked to switch to English." : "Respond in English unless asked to switch to Hindi."}` 
//         }),
//       });

//       const data = await res.json();
//       setMessages(prev => [...prev, { text: data.reply || (language === "hindi" ? "मैं उस अनुरोध को संसाधित नहीं कर पाया।" : "I couldn't process that request."), sender: "bot" }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { text: language === "hindi" ? "प्रतिक्रिया प्राप्त करने में त्रुटि। कृपया पुनः प्रयास करें।" : "Error getting response. Please try again.", sender: "bot" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuickQuestion = (question) => {
//     setUserInput(question);
//     setInterimTranscript("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey && !loading) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const toggleLanguage = () => {
//     setLanguage(prev => prev === "english" ? "hindi" : "english");
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       setInterimTranscript("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto mt-12">
//         {/* Header with Logo */}
//         <header className="text-center mb-8">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
//               AgriConnect<span className="text-teal-300">AI</span>
//             </h1>
//           </div>
//           <p className="text-lg text-emerald-200">
//             Smart agricultural solutions powered by Gemini
//           </p>
//         </header>

//         {/* Tab Navigation */}
//         <div className="flex justify-center mb-8">
//           <div className="inline-flex rounded-xl bg-gray-800 shadow-lg overflow-hidden border border-gray-700">
//             <button
//               onClick={() => setActiveTab("farmer")}
//               className={`px-6 py-3 flex items-center gap-2 font-medium transition-all ${activeTab === "farmer" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
//             >
//               <Leaf className="h-5 w-5" />
//               Farmer Mode
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab("retailer");
//                 setLanguage("english");
//               }}
//               className={`px-6 py-3 flex items-center gap-2 font-medium transition-all ${activeTab === "retailer" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
//             >
//               <ShoppingBasket className="h-5 w-5" />
//               Retailer Mode
//             </button>
//           </div>
//         </div>

//         {/* Main Chat Container */}
//         <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
//           {/* Chat Header */}
//           <div className={`p-4 ${activeTab === "farmer" ? "bg-gradient-to-r from-emerald-700 to-teal-700" : "bg-gradient-to-r from-teal-700 to-emerald-700"} text-white flex justify-between items-center`}>
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-full ${activeTab === "farmer" ? "bg-emerald-800" : "bg-teal-800"}`}>
//                 {activeTab === "farmer" ? (
//                   <Leaf className="h-6 w-6 text-emerald-200" />
//                 ) : (
//                   <ShoppingBasket className="h-6 w-6 text-teal-200" />
//                 )}
//               </div>
//               <div>
//                 <h2 className="font-bold text-lg">
//                   {activeTab === "farmer" ? "Farmer Assistant" : "Food Retailer Assistant"}
//                 </h2>
//                 <p className="text-sm opacity-90">
//                   {activeTab === "farmer" 
//                     ? language === "hindi" 
//                       ? "फसलों, मौसम या बाजार भाव के बारे में पूछें" 
//                       : "Ask about crops, weather, or market prices"
//                     : "Ask about donations, logistics, or partnerships"}
//                 </p>
//               </div>
//             </div>
            
//             {/* Language Toggle Button (only for farmer mode) */}
//             {activeTab === "farmer" && (
//               <button
//                 onClick={toggleLanguage}
//                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm transition-colors backdrop-blur-sm"
//               >
//                 <Languages className="h-4 w-4" />
//                 {language === "english" ? "हिंदी" : "English"}
//               </button>
//             )}
//           </div>

//           {/* Messages Area */}
//           <div className="h-[400px] overflow-y-auto p-4 bg-gray-900">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-xl p-4 ${message.sender === "user" 
//                     ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-br-none shadow-lg" 
//                     : "bg-gray-800 text-gray-100 shadow-md rounded-bl-none border border-gray-700"}`}
//                 >
//                   <div className="flex items-start gap-3">
//                     {message.sender === "bot" ? (
//                       <div className="p-1.5 bg-emerald-900/50 rounded-full mt-0.5">
//                         <Bot className="h-4 w-4 text-emerald-300" />
//                       </div>
//                     ) : (
//                       <div className="p-1.5 bg-teal-700 rounded-full mt-0.5">
//                         <User className="h-4 w-4 text-white" />
//                       </div>
//                     )}
//                     <div className="whitespace-pre-wrap flex-1">{message.text}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex justify-start mb-4">
//                 <div className="bg-gray-800 rounded-xl rounded-bl-none p-4 shadow-md border border-gray-700 max-w-[80%]">
//                   <div className="flex items-center gap-3">
//                     <div className="p-1.5 bg-emerald-900/50 rounded-full">
//                       <Bot className="h-4 w-4 text-emerald-300" />
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
//                       <span className="text-gray-400">
//                         {language === "hindi" ? "प्रतिक्रिया तैयार की जा रही है..." : "Generating response..."}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Quick Questions */}
//           <div className="px-4 pt-2 pb-3 bg-gray-800 border-t border-gray-700">
//             <div className="flex flex-wrap gap-2">
//               {(activeTab === "farmer" ? quickQuestions.farmer[language] : quickQuestions.retailer.english).map((question, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleQuickQuestion(question)}
//                   className="text-xs px-3 py-1.5 bg-gray-700 text-emerald-200 rounded-full border border-gray-600 hover:bg-gray-600 hover:text-white transition-colors"
//                 >
//                   {question}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Input Area */}
//           <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800">
//             <div className="relative">
//               {/* Only show listening status when actively listening */}
//               {(isListening || interimTranscript) && (
//                 <div className="absolute bottom-full left-0 right-0 bg-gray-700 rounded-t-lg px-3 py-2 text-sm text-gray-300 border border-gray-600 border-b-0">
//                   {isListening && (
//                     <div className="text-emerald-400">
//                       {language === "hindi" ? "सुन रहा हूँ..." : "Listening..."}
//                     </div>
//                   )}
//                   {interimTranscript && (
//                     <div className="italic text-gray-300 truncate">
//                       {interimTranscript}
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               <div className="flex items-center gap-2">
//                 {speechSupported && (
//                   <button
//                     type="button"
//                     onClick={toggleListening}
//                     className={`p-3 rounded-lg flex items-center justify-center ${isListening 
//                       ? "bg-red-600 text-white animate-pulse" 
//                       : "bg-gray-700 text-gray-300 hover:bg-gray-600"} transition-all`}
//                     disabled={loading}
//                   >
//                     {isListening ? (
//                       <MicOff className="h-5 w-5" />
//                     ) : (
//                       <Mic className="h-5 w-5" />
//                     )}
//                   </button>
//                 )}
                
//                 <input
//                   type="text"
//                   value={userInput}
//                   onChange={(e) => {
//                     setUserInput(e.target.value);
//                     setInterimTranscript(""); // Clear interim when typing manually
//                   }}
//                   onKeyDown={handleKeyDown}
//                   placeholder={
//                     activeTab === "farmer" 
//                       ? language === "hindi"
//                         ? "फसलों, मौसम या बाजार भाव के बारे में पूछें..."
//                         : "Ask about crops, weather, or market prices..."
//                       : "Ask about food donations, logistics, or partnerships..."
//                   }
//                   className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
//                   disabled={loading}
//                 />
                
//                 <button
//                   type="submit"
//                   disabled={loading || (!userInput && !interimTranscript)}
//                   className={`p-3 rounded-lg flex items-center justify-center ${loading || (!userInput && !interimTranscript)
//                     ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
//                     : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg"} transition-all`}
//                 >
//                   {loading ? (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   ) : (
//                     <Send className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>
            
//             <p className="text-xs text-gray-500 mt-2 text-center">
//               {activeTab === "farmer"
//                 ? language === "hindi"
//                   ? "सुझाव: जैविक खेती तकनीक या कीट नियंत्रण विधियों के बारे में पूछें"
//                   : "Tip: Ask about organic farming techniques or pest control methods"
//                 : "Tip: Ask about food safety regulations for donations"}
//             </p>
//           </form>
//         </div>

//         {/* Feature Highlights */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all hover:border-emerald-500/30">
//             <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <Leaf className="text-emerald-400" />
//             </div>
//             <h3 className="font-bold text-lg text-emerald-300 mb-2">Farm Optimization</h3>
//             <p className="text-gray-400">
//               Get personalized advice on crop rotation, soil health, irrigation, and sustainable farming practices.
//             </p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all hover:border-emerald-500/30">
//             <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <ShoppingBasket className="text-emerald-400" />
//             </div>
//             <h3 className="font-bold text-lg text-emerald-300 mb-2">Donation Network</h3>
//             <p className="text-gray-400">
//               Connect with local food banks, understand regulations, and optimize your donation process.
//             </p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all hover:border-emerald-500/30">
//             <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <Bot className="text-emerald-400" />
//             </div>
//             <h3 className="font-bold text-lg text-emerald-300 mb-2">Real-time Insights</h3>
//             <p className="text-gray-400">
//               Access market prices, weather forecasts, and demand trends specific to your location.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User, Leaf, ShoppingBasket, Send, Loader2, Languages, Mic, MicOff } from "lucide-react";

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("farmer");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english"); // 'english' or 'hindi'
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const initialLoadRef = useRef(true);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let interim = '';
        let final = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }
        
        if (final) {
          setUserInput(prev => prev + (prev ? ' ' : '') + final);
          setInterimTranscript("");
        } else {
          setInterimTranscript(interim);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setInterimTranscript("");
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    } else {
      console.warn("Speech recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  // Welcome messages for each user type and language
  const welcomeMessages = {
    farmer: {
      english: "👋 Hello farmer! I can help with crop management, market prices, weather forecasts, and sustainable farming practices. What would you like to know today?",
      hindi: "👋 नमस्ते किसान भाई! मैं फसल प्रबंधन, बाजार भाव, मौसम पूर्वानुमान और टिकाऊ खेती के बारे में मदद कर सकता हूँ। आज आप क्या जानना चाहेंगे?"
    },
    retailer: {
      english: "🛒 Welcome food retailer! I can assist with food donation logistics, inventory management, tax benefits, and connecting with local food banks."
    }
  };

  // Common questions for quick start
  const quickQuestions = {
    farmer: {
      english: [
        "What's the best crop for my region this season?",
        "How can I improve soil fertility?",
        "Current market prices for tomatoes?"
      ],
      hindi: [
        "इस सीजन में मेरे क्षेत्र के लिए सबसे अच्छी फसल कौन सी है?",
        "मैं मिट्टी की उर्वरता कैसे सुधार सकता हूँ?",
        "टमाटर के वर्तमान बाजार भाव क्या हैं?"
      ]
    },
    retailer: {
      english: [
        "How do I get tax benefits for food donations?",
        "Where can I donate excess food in my area?",
        "Best practices for food preservation?"
      ]
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }
    
    // Only scroll if we're near the bottom
    const container = messagesContainerRef.current;
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = activeTab === "farmer" 
      ? welcomeMessages.farmer[language] 
      : welcomeMessages.retailer.english;
    
    setMessages([{ text: welcomeMessage, sender: "bot" }]);
  }, [activeTab, language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript("");
    } else {
      try {
        recognitionRef.current.lang = language === "hindi" ? "hi-IN" : "en-US";
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Speech recognition failed:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Combine final input with any interim results
    const finalInput = userInput + (interimTranscript ? ' ' + interimTranscript : '');
    if (!finalInput.trim() || loading) return;
    
    const newMessage = { text: finalInput, sender: "user" };
    setMessages(prev => [...prev, newMessage]);
    setUserInput("");
    setInterimTranscript("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userInput: finalInput,
          context: `You are an agricultural assistant helping ${activeTab === "farmer" ? "a farmer" : "a food retailer"}. 
          ${language === "hindi" ? "Respond in Hindi unless asked to switch to English." : "Respond in English unless asked to switch to Hindi."}` 
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply || (language === "hindi" ? "मैं उस अनुरोध को संसाधित नहीं कर पाया।" : "I couldn't process that request."), sender: "bot" }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: language === "hindi" ? "प्रतिक्रिया प्राप्त करने में त्रुटि। कृपया पुनः प्रयास करें।" : "Error getting response. Please try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setUserInput(question);
    setInterimTranscript("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "english" ? "hindi" : "english");
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto mt-12">
        {/* Header with Logo */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              AgriConnect<span className="text-teal-300">AI</span>
            </h1>
          </div>
          <p className="text-lg text-emerald-200">
            Smart agricultural solutions powered by Gemini
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-gray-800 shadow-lg overflow-hidden border border-gray-700">
            <button
              onClick={() => setActiveTab("farmer")}
              className={`px-6 py-3 flex items-center gap-2 font-medium transition-all ${activeTab === "farmer" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
              <Leaf className="h-5 w-5" />
              Farmer Mode
            </button>
            <button
              onClick={() => {
                setActiveTab("retailer");
                setLanguage("english");
              }}
              className={`px-6 py-3 flex items-center gap-2 font-medium transition-all ${activeTab === "retailer" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
              <ShoppingBasket className="h-5 w-5" />
              Retailer Mode
            </button>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Chat Header */}
          <div className={`p-4 ${activeTab === "farmer" ? "bg-gradient-to-r from-emerald-700 to-teal-700" : "bg-gradient-to-r from-teal-700 to-emerald-700"} text-white flex justify-between items-center`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activeTab === "farmer" ? "bg-emerald-800" : "bg-teal-800"}`}>
                {activeTab === "farmer" ? (
                  <Leaf className="h-6 w-6 text-emerald-200" />
                ) : (
                  <ShoppingBasket className="h-6 w-6 text-teal-200" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg">
                  {activeTab === "farmer" ? "Farmer Assistant" : "Food Retailer Assistant"}
                </h2>
                <p className="text-sm opacity-90">
                  {activeTab === "farmer" 
                    ? language === "hindi" 
                      ? "फसलों, मौसम या बाजार भाव के बारे में पूछें" 
                      : "Ask about crops, weather, or market prices"
                    : "Ask about donations, logistics, or partnerships"}
                </p>
              </div>
            </div>
            
            {/* Language Toggle Button (only for farmer mode) */}
            {activeTab === "farmer" && (
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm transition-colors backdrop-blur-sm"
              >
                <Languages className="h-4 w-4" />
                {language === "english" ? "हिंदी" : "English"}
              </button>
            )}
          </div>

          {/* Messages Area */}
          <div 
            ref={messagesContainerRef}
            className="h-[400px] overflow-y-auto p-4 bg-gray-900"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${message.sender === "user" 
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-br-none shadow-lg" 
                    : "bg-gray-800 text-gray-100 shadow-md rounded-bl-none border border-gray-700"}`}
                >
                  <div className="flex items-start gap-3">
                    {message.sender === "bot" ? (
                      <div className="p-1.5 bg-emerald-900/50 rounded-full mt-0.5">
                        <Bot className="h-4 w-4 text-emerald-300" />
                      </div>
                    ) : (
                      <div className="p-1.5 bg-teal-700 rounded-full mt-0.5">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="whitespace-pre-wrap flex-1">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-800 rounded-xl rounded-bl-none p-4 shadow-md border border-gray-700 max-w-[80%]">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-emerald-900/50 rounded-full">
                      <Bot className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                      <span className="text-gray-400">
                        {language === "hindi" ? "प्रतिक्रिया तैयार की जा रही है..." : "Generating response..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-4 pt-2 pb-3 bg-gray-800 border-t border-gray-700">
            <div className="flex flex-wrap gap-2">
              {(activeTab === "farmer" ? quickQuestions.farmer[language] : quickQuestions.retailer.english).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-3 py-1.5 bg-gray-700 text-emerald-200 rounded-full border border-gray-600 hover:bg-gray-600 hover:text-white transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="relative">
              {/* Only show listening status when actively listening */}
              {(isListening || interimTranscript) && (
                <div className="absolute bottom-full left-0 right-0 bg-gray-700 rounded-t-lg px-3 py-2 text-sm text-gray-300 border border-gray-600 border-b-0">
                  {isListening && (
                    <div className="text-emerald-400">
                      {language === "hindi" ? "सुन रहा हूँ..." : "Listening..."}
                    </div>
                  )}
                  {interimTranscript && (
                    <div className="italic text-gray-300 truncate">
                      {interimTranscript}
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center gap-2">
                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-3 rounded-lg flex items-center justify-center ${isListening 
                      ? "bg-red-600 text-white animate-pulse" 
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"} transition-all`}
                    disabled={loading}
                  >
                    {isListening ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </button>
                )}
                
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    setInterimTranscript(""); // Clear interim when typing manually
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    activeTab === "farmer" 
                      ? language === "hindi"
                        ? "फसलों, मौसम या बाजार भाव के बारे में पूछें..."
                        : "Ask about crops, weather, or market prices..."
                      : "Ask about food donations, logistics, or partnerships..."
                  }
                  className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                  disabled={loading}
                />
                
                <button
                  type="submit"
                  disabled={loading || (!userInput && !interimTranscript)}
                  className={`p-3 rounded-lg flex items-center justify-center ${loading || (!userInput && !interimTranscript)
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg"} transition-all`}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              {activeTab === "farmer"
                ? language === "hindi"
                  ? "सुझाव: जैविक खेती तकनीक या कीट नियंत्रण विधियों के बारे में पूछें"
                  : "Tip: Ask about organic farming techniques or pest control methods"
                : "Tip: Ask about food safety regulations for donations"}
            </p>
          </form>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all hover:border-emerald-500/30">
            <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Leaf className="text-emerald-400" />
            </div>
            <h3 className="font-bold text-lg text-emerald-300 mb-2">Farm Optimization</h3>
            <p className="text-gray-400">
              Get personalized advice on crop rotation, soil health, irrigation, and sustainable farming practices.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all hover:border-emerald-500/30">
            <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ShoppingBasket className="text-emerald-400" />
            </div>
            <h3 className="font-bold text-lg text-emerald-300 mb-2">Donation Network</h3>
            <p className="text-gray-400">
              Connect with local food banks, understand regulations, and optimize your donation process.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all hover:border-emerald-500/30">
            <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Bot className="text-emerald-400" />
            </div>
            <h3 className="font-bold text-lg text-emerald-300 mb-2">Real-time Insights</h3>
            <p className="text-gray-400">
              Access market prices, weather forecasts, and demand trends specific to your location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}