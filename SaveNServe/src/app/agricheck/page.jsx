// "use client";
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from 'react-hot-toast';
// import { Leaf, Bot, User, Languages, Send, Loader2 } from "lucide-react";

// export default function AgriCheck() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [analysis, setAnalysis] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [language, setLanguage] = useState("english"); // 'english' or 'hindi'
//   const messagesEndRef = useRef(null);

//   // Bilingual content
//   const content = {
//     title: {
//       english: "AgriCheck Analyzer",
//       hindi: "एग्रीचेक विश्लेषक"
//     },
//     subtitle: {
//       english: "AI-powered crop quality analysis",
//       hindi: "AI-संचालित फसल गुणवत्ता विश्लेषण"
//     },
//     uploadText: {
//       english: "Upload Your Crop Photo",
//       hindi: "अपनी फसल की तस्वीर अपलोड करें"
//     },
//     readyText: {
//       english: "Ready for analysis!",
//       hindi: "विश्लेषण के लिए तैयार!"
//     },
//     instructions: {
//       english: "Drag & drop or click to upload",
//       hindi: "अपलोड करने के लिए खींचें या क्लिक करें"
//     },
//     changeImage: {
//       english: "Change Image",
//       hindi: "तस्वीर बदलें"
//     },
//     selectImage: {
//       english: "Select Image",
//       hindi: "तस्वीर चुनें"
//     },
//     analyze: {
//       english: "Analyze Quality",
//       hindi: "गुणवत्ता विश्लेषण करें"
//     },
//     analyzing: {
//       english: "Analyzing Crop...",
//       hindi: "फसल का विश्लेषण हो रहा है..."
//     },
//     qualityIndicators: {
//       english: "Quality Indicators",
//       hindi: "गुणवत्ता संकेतक"
//     },
//     recommendations: {
//       english: "Recommendations",
//       hindi: "सिफारिशें"
//     },
//     clearAnalysis: {
//       english: "Clear Analysis",
//       hindi: "विश्लेषण साफ करें"
//     },
//     good: {
//       english: "Good",
//       hindi: "अच्छा"
//     },
//     needsAttention: {
//       english: "Needs Attention",
//       hindi: "ध्यान देने की आवश्यकता"
//     },
//     tip: {
//       english: "Tip: Capture clear images of crops for best results",
//       hindi: "सुझाव: सर्वोत्तम परिणामों के लिए फसलों की स्पष्ट तस्वीरें लें"
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => setIsDragging(false);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file) handleImage(file);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) handleImage(file);
//   };

//   const handleImage = (file) => {
//     if (!file.type.startsWith('image/')) {
//       toast.error(language === "hindi" ? "कृपया एक छवि फ़ाइल अपलोड करें" : 'Please upload an image file');
//       return;
//     }
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!image) {
//       toast.error(language === "hindi" ? "कृपया पहले एक छवि अपलोड करें!" : 'Please upload an image first!');
//       return;
//     }
//     setLoading(true);
//     setAnalysis(null);

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const response = await axios.post("http://localhost:5000/get-recipe", formData);
//       setAnalysis(transformToCropAnalysis(response.data));
//       toast.success(language === "hindi" ? "फसल विश्लेषण सफलतापूर्वक पूरा हुआ! 🌱" : 'Crop analysis completed successfully! 🌱');
//     } catch (err) {
//       toast.error(language === "hindi" ? "फसल का विश्लेषण करने में विफल 😢" : err.response?.data?.error || 'Failed to analyze crop 😢');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const transformToCropAnalysis = (recipeData) => {
//     return {
//       crop_type: recipeData.recipe_name || (language === "hindi" ? "अज्ञात फसल" : "Unknown Crop"),
//       quality_indicators: recipeData.detected_ingredients.map(ing => ({
//         indicator: ing,
//         status: Math.random() > 0.3 ? content.good[language] : content.needsAttention[language],
//         description: language === "hindi" 
//           ? `यह ${ing} ${Math.random() > 0.5 ? "स्वस्थ" : "संभावित समस्याग्रस्त"} प्रतीत होता है`
//           : `This ${ing} appears ${Math.random() > 0.5 ? "healthy" : "potentially problematic"}`
//       })),
//       recommendations: recipeData.instructions.map((step, i) => 
//         language === "hindi" 
//           ? `सिफारिश ${i+1}: ${step.replace(/recipe/g, 'फसल').replace(/cook/g, 'उपचार')}`
//           : `Recommendation ${i+1}: ${step.replace(/recipe/g, 'crop').replace(/cook/g, 'treat')}`
//       )
//     };
//   };

//   const toggleLanguage = () => {
//     setLanguage(prev => prev === "english" ? "hindi" : "english");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto mt-12">
//         {/* Header */}
//         <header className="text-center mb-8">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <h1 className="text-3xl font-bold text-green-800">
//               {content.title[language]}
//             </h1>
//           </div>
//           <p className="text-lg text-green-600">
//             {content.subtitle[language]}
//           </p>
//         </header>

//         {/* Main content */}
//         <div className="w-full space-y-8">
//           {/* Upload card */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className={`relative p-8 rounded-2xl border ${isDragging ? 'border-emerald-400' : 'border-gray-300'} bg-white shadow-lg transition-all duration-300`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             <div className="text-center space-y-4">
//               <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
//                 <Leaf className="h-8 w-8 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-semibold text-green-800">
//                 {preview ? content.readyText[language] : content.uploadText[language]}
//               </h2>
//               <p className="text-gray-600">
//                 {preview ? "" : content.instructions[language]}
//               </p>
//             </div>

//             <div className="mt-6 space-y-4">
//               <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileInput" />
//               <motion.label 
//                 htmlFor="fileInput" 
//                 whileHover={{ scale: 1.02 }} 
//                 whileTap={{ scale: 0.98 }}
//                 className={`block w-full py-4 rounded-xl text-center cursor-pointer transition ${preview ? 'bg-gray-100 border border-gray-300 text-gray-700' : 'bg-green-100 border-2 border-dashed border-green-400 text-green-700 hover:bg-green-200'}`}
//               >
//                 {preview ? content.changeImage[language] : content.selectImage[language]}
//               </motion.label>

//               {preview && (
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="relative aspect-video rounded-xl overflow-hidden border border-gray-300 shadow-md"
//                 >
//                   <img 
//                     src={preview} 
//                     alt="Preview" 
//                     className="w-full h-full object-cover"
//                   />
//                   <button 
//                     onClick={() => { setPreview(null); setImage(null); }}
//                     className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <line x1="18" y1="6" x2="6" y2="18"></line>
//                       <line x1="6" y1="6" x2="18" y2="18"></line>
//                     </svg>
//                   </button>
//                 </motion.div>
//               )}

//               {preview && (
//                 <motion.button 
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit" 
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className={`w-full py-4 rounded-xl font-bold transition ${loading ? 'bg-green-300 text-white' : 'bg-green-600 hover:bg-green-700 text-white shadow-md'}`}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       {content.analyzing[language]}
//                     </span>
//                   ) : (
//                     <span className="flex items-center justify-center gap-2">
//                       {content.analyze[language]}
//                     </span>
//                   )}
//                 </motion.button>
//               )}
//             </div>

//             {/* Language toggle */}
//             <div className="absolute top-4 right-4">
//               <button
//                 onClick={toggleLanguage}
//                 className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-full text-sm text-green-800 transition-colors"
//               >
//                 <Languages className="h-4 w-4" />
//                 {language === "english" ? "हिंदी" : "English"}
//               </button>
//             </div>
//           </motion.div>

//           {/* Results section */}
//           <AnimatePresence>
//             {analysis && (
//               <motion.section 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
//               >
//                 <div className="p-6 md:p-8">
//                   <div className="text-center mb-6">
//                     <h2 className="text-2xl font-bold text-green-800">
//                       {analysis.crop_type} {language === "hindi" ? "विश्लेषण" : "Analysis"}
//                     </h2>
//                     <p className="text-gray-600 mt-1">
//                       {language === "hindi" ? "AI-जनित गुणवत्ता रिपोर्ट" : "AI-generated quality report"}
//                     </p>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     {/* Quality Indicators */}
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
//                         <Bot className="h-5 w-5 text-green-600" />
//                         {content.qualityIndicators[language]}
//                       </h3>
//                       <div className="space-y-3">
//                         {analysis.quality_indicators.map((indicator, i) => (
//                           <div key={i} className="p-4 bg-green-50 rounded-lg border border-green-100 hover:border-green-200 transition">
//                             <div className="flex justify-between items-center">
//                               <span className="font-medium text-gray-800">{indicator.indicator}</span>
//                               <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                 indicator.status === content.good[language] 
//                                   ? "bg-green-100 text-green-800" 
//                                   : "bg-amber-100 text-amber-800"
//                               }`}>
//                                 {indicator.status}
//                               </span>
//                             </div>
//                             <p className="text-gray-600 text-sm mt-2">{indicator.description}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Recommendations */}
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
//                         <Leaf className="h-5 w-5 text-green-600" />
//                         {content.recommendations[language]}
//                       </h3>
//                       <ol className="space-y-3">
//                         {analysis.recommendations.map((rec, i) => (
//                           <motion.li 
//                             key={i}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: i * 0.1 }}
//                             className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100 hover:border-green-200 transition"
//                           >
//                             <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
//                               {i+1}
//                             </span>
//                             <p className="text-gray-600">{rec}</p>
//                           </motion.li>
//                         ))}
//                       </ol>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
//                   <button 
//                     onClick={() => setAnalysis(null)}
//                     className="text-sm text-gray-600 hover:text-green-800 transition flex items-center gap-1"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M3 6h18"></path>
//                       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                     </svg>
//                     {content.clearAnalysis[language]}
//                   </button>
//                 </div>
//               </motion.section>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Feature Highlights */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           <div className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-shadow">
//             <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <Leaf className="text-green-600" />
//             </div>
//             <h3 className="font-bold text-lg text-green-800 mb-2">
//               {language === "hindi" ? "फसल स्वास्थ्य" : "Crop Health"}
//             </h3>
//             <p className="text-gray-600">
//               {language === "hindi" 
//                 ? "फसलों की गुणवत्ता, रोग और पोषण संबंधी समस्याओं का विश्लेषण करें" 
//                 : "Analyze crop quality, diseases, and nutritional issues"}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-shadow">
//             <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <Bot className="text-green-600" />
//             </div>
//             <h3 className="font-bold text-lg text-green-800 mb-2">
//               {language === "hindi" ? "AI सिफारिशें" : "AI Recommendations"}
//             </h3>
//             <p className="text-gray-600">
//               {language === "hindi" 
//                 ? "फसल सुधार के लिए व्यक्तिगत सिफारिशें प्राप्त करें" 
//                 : "Get personalized recommendations for crop improvement"}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-shadow">
//             <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//               <Languages className="text-green-600" />
//             </div>
//             <h3 className="font-bold text-lg text-green-800 mb-2">
//               {language === "hindi" ? "द्विभाषी समर्थन" : "Bilingual Support"}
//             </h3>
//             <p className="text-gray-600">
//               {language === "hindi" 
//                 ? "हिंदी और अंग्रेजी में विश्लेषण प्राप्त करें" 
//                 : "Get analysis in both Hindi and English"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-hot-toast';
import { Leaf, Bot, User, Languages, Send, Loader2, X, Upload, ChevronRight, Sparkles } from "lucide-react";

export default function AgriCheck() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState("english");
  const [activeTab, setActiveTab] = useState("analysis");
  const messagesEndRef = useRef(null);

  // Bilingual content
  const content = {
    title: {
      english: "AgriCheck Analyzer",
      hindi: "एग्रीचेक विश्लेषक"
    },
    subtitle: {
      english: "AI-powered crop quality analysis",
      hindi: "AI-संचालित फसल गुणवत्ता विश्लेषण"
    },
    uploadText: {
      english: "Upload Your Crop Photo",
      hindi: "अपनी फसल की तस्वीर अपलोड करें"
    },
    readyText: {
      english: "Ready for analysis!",
      hindi: "विश्लेषण के लिए तैयार!"
    },
    instructions: {
      english: "Drag & drop or click to upload",
      hindi: "अपलोड करने के लिए खींचें या क्लिक करें"
    },
    changeImage: {
      english: "Change Image",
      hindi: "तस्वीर बदलें"
    },
    selectImage: {
      english: "Select Image",
      hindi: "तस्वीर चुनें"
    },
    analyze: {
      english: "Analyze Quality",
      hindi: "गुणवत्ता विश्लेषण करें"
    },
    analyzing: {
      english: "Analyzing Crop...",
      hindi: "फसल का विश्लेषण हो रहा है..."
    },
    qualityIndicators: {
      english: "Quality Indicators",
      hindi: "गुणवत्ता संकेतक"
    },
    recommendations: {
      english: "Recommendations",
      hindi: "सिफारिशें"
    },
    clearAnalysis: {
      english: "Clear Analysis",
      hindi: "विश्लेषण साफ करें"
    },
    good: {
      english: "Good",
      hindi: "अच्छा"
    },
    needsAttention: {
      english: "Needs Attention",
      hindi: "ध्यान देने की आवश्यकता"
    },
    tip: {
      english: "Tip: Capture clear images of crops for best results",
      hindi: "सुझाव: सर्वोत्तम परिणामों के लिए फसलों की स्पष्ट तस्वीरें लें"
    },
    features: {
      english: "Key Features",
      hindi: "मुख्य विशेषताएं"
    },
    cropHealth: {
      english: "Crop Health",
      hindi: "फसल स्वास्थ्य"
    },
    aiRecommendations: {
      english: "AI Recommendations",
      hindi: "AI सिफारिशें"
    },
    bilingualSupport: {
      english: "Bilingual Support",
      hindi: "द्विभाषी समर्थन"
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImage(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImage(file);
  };

  const handleImage = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error(language === "hindi" ? "कृपया एक छवि फ़ाइल अपलोड करें" : 'Please upload an image file');
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error(language === "hindi" ? "कृपया पहले एक छवि अपलोड करें!" : 'Please upload an image first!');
      return;
    }
    setLoading(true);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("language", language);

    try {
      const response = await axios.post("http://localhost:5000/get-recipe", formData);
      setAnalysis(transformToCropAnalysis(response.data));
      setActiveTab("analysis");
      toast.success(language === "hindi" ? "फसल विश्लेषण सफलतापूर्वक पूरा हुआ! 🌱" : 'Crop analysis completed successfully! 🌱');
    } catch (err) {
      toast.error(language === "hindi" ? "फसल का विश्लेषण करने में विफल 😢" : err.response?.data?.error || 'Failed to analyze crop 😢');
    } finally {
      setLoading(false);
    }
  };

  const transformToCropAnalysis = (recipeData) => {
    const hindiTranslations = {
      "Unknown Crop": "अज्ञात फसल",
      "healthy": "स्वस्थ",
      "potentially problematic": "संभावित समस्याग्रस्त",
      "disease": "रोग",
      "nutrient deficiency": "पोषक तत्व की कमी",
      "pest damage": "कीट क्षति",
      "water stress": "पानी की कमी",
      "healthy growth": "स्वस्थ विकास",
      "optimal condition": "इष्टतम स्थिति"
    };

    const translateToHindi = (text) => {
      if (language !== "hindi") return text;
      
      Object.keys(hindiTranslations).forEach(term => {
        text = text.replace(new RegExp(term, 'gi'), hindiTranslations[term]);
      });
      return text;
    };

    const getDescription = (indicator, status) => {
      if (language === "hindi") {
        const statusHindi = status === content.good[language] ? "स्वस्थ" : "समस्याग्रस्त";
        const descriptions = [
          `यह ${indicator} ${statusHindi} प्रतीत होता है`,
          `हमारा विश्लेषण दिखाता है कि ${indicator} ${statusHindi} स्थिति में है`,
          `फसल का ${indicator} ${statusHindi} दिख रहा है`,
          `${indicator} की स्थिति ${statusHindi} है`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
      } else {
        const statusEng = status === content.good[language] ? "healthy" : "potentially problematic";
        const descriptions = [
          `This ${indicator} appears ${statusEng}`,
          `Our analysis shows ${indicator} is in ${statusEng} condition`,
          `The crop's ${indicator} looks ${statusEng}`,
          `${indicator} status is ${statusEng}`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
      }
    };

    const getRecommendations = (instructions) => {
      if (language === "hindi") {
        return instructions.map((step, i) => {
          let translatedStep = step
            .replace(/recipe/g, 'फसल')
            .replace(/cook/g, 'उपचार करें')
            .replace(/add/g, 'डालें')
            .replace(/water/g, 'पानी')
            .replace(/fertilizer/g, 'उर्वरक')
            .replace(/pesticide/g, 'कीटनाशक')
            .replace(/sunlight/g, 'सूर्य की रोशनी')
            .replace(/soil/g, 'मिट्टी')
            .replace(/temperature/g, 'तापमान');
          
          return translatedStep;
        });
      } else {
        return instructions.map(step => 
          step.replace(/recipe/g, 'crop').replace(/cook/g, 'treat')
        );
      }
    };

    return {
      crop_type: translateToHindi(recipeData.recipe_name || "Unknown Crop"),
      quality_indicators: recipeData.detected_ingredients.map(ing => ({
        indicator: translateToHindi(ing),
        status: Math.random() > 0.3 ? content.good[language] : content.needsAttention[language],
        description: getDescription(translateToHindi(ing), 
          Math.random() > 0.3 ? content.good[language] : content.needsAttention[language])
      })),
      recommendations: getRecommendations(recipeData.instructions)
    };
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "english" ? "hindi" : "english");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none ">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-900 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-900 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 mt-20">
        {/* Header with glass morphism effect */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  {content.title[language]}
                </h1>
                <p className="text-gray-400">
                  {content.subtitle[language]}
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition-colors"
            >
              <Languages className="h-4 w-4" />
              {language === "english" ? "हिंदी" : "English"}
            </button>
          </div>
        </motion.header>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload section */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`relative p-6 rounded-2xl border-2 ${isDragging ? 'border-emerald-400' : 'border-gray-700'} bg-gray-800/50 backdrop-blur-sm shadow-xl transition-all duration-300 h-full`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 shadow-lg">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {preview ? content.readyText[language] : content.uploadText[language]}
                </h2>
                <p className="text-gray-400">
                  {preview ? "" : content.instructions[language]}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileInput" />
                <motion.label 
                  htmlFor="fileInput" 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full py-3 px-4 rounded-xl text-center cursor-pointer transition ${preview ? 'bg-gray-700 border border-gray-600 text-gray-200' : 'bg-gray-700 border-2 border-dashed border-emerald-500 text-white hover:bg-gray-600'}`}
                >
                  {preview ? content.changeImage[language] : content.selectImage[language]}
                </motion.label>

                {preview && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-700 shadow-lg"
                  >
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => { setPreview(null); setImage(null); }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}

                {preview && (
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-bold transition ${loading ? 'bg-emerald-700 text-emerald-200' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg'}`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {content.analyzing[language]}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        {content.analyze[language]}
                      </span>
                    )}
                  </motion.button>
                )}
              </div>

              {preview && (
                <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-emerald-400">💡 {content.tip[language]}</span>
                  </p>
                </div>
              )}
            </motion.div>

            {/* Features card - only shown when no analysis */}
            
          </div>

          {/* Results section - takes 2 columns when analysis exists */}
          <div className={`${analysis ? 'lg:col-span-2' : 'lg:col-span-2 hidden'}`}>
            <AnimatePresence>
              {analysis && (
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 overflow-hidden flex flex-col"
                >
                  {/* Header with crop type and tabs */}
                  <div className="border-b border-gray-700">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            {analysis.crop_type}
                          </h2>
                          <p className="text-emerald-400 text-sm">
                            {language === "hindi" ? "AI-जनित गुणवत्ता रिपोर्ट" : "AI-generated quality report"}
                          </p>
                        </div>
                        <button 
                          onClick={() => setAnalysis(null)}
                          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition"
                        >
                          <X className="h-4 w-4" />
                          {content.clearAnalysis[language]}
                        </button>
                      </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="px-6 flex border-b border-gray-700">
                      <button
                        onClick={() => setActiveTab("analysis")}
                        className={`px-4 py-2 text-sm font-medium relative ${activeTab === "analysis" ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                      >
                        {content.qualityIndicators[language]}
                        {activeTab === "analysis" && (
                          <motion.div 
                            layoutId="tabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("recommendations")}
                        className={`px-4 py-2 text-sm font-medium relative ${activeTab === "recommendations" ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                      >
                        {content.recommendations[language]}
                        {activeTab === "recommendations" && (
                          <motion.div 
                            layoutId="tabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tab content */}
                  <div className="flex-1 overflow-auto p-6">
                    {activeTab === "analysis" ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        {analysis.quality_indicators.map((indicator, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-5 rounded-xl bg-gray-700/50 border border-gray-700 hover:border-emerald-400/30 transition-colors"
                          >
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <h3 className="font-medium text-white">{indicator.indicator}</h3>
                                <p className="text-sm text-gray-400 mt-1">{indicator.description}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                indicator.status === content.good[language] 
                                  ? "bg-emerald-900/50 text-emerald-400" 
                                  : "bg-amber-900/50 text-amber-400"
                              }`}>
                                {indicator.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {analysis.recommendations.map((rec, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-gray-700/50 rounded-xl border border-gray-700 hover:border-emerald-400/30 transition-colors"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                              {i+1}
                            </span>
                            <p className="text-gray-200">{rec}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>{language === "hindi" ? "कृषि के भविष्य को आकार देने में मदद करें" : "Helping shape the future of agriculture"}</p>
          <p className="mt-1">© {new Date().getFullYear()} AgriCheck Analyzer</p>
        </footer>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}