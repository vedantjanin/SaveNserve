




"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-hot-toast';
import { 
  Leaf, TrendingUp, Database, Calculator, Scale, ChartBar, 
  CurrencyRupee, Calendar, Droplet, CloudSun, Wind, Sun, 
  Thermometer, Zap, Clock, Package, Globe, Send, Loader2, X, Upload,
  CloudRain, Cloud, SunDim, CloudLightning, CloudDrizzle
} from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import charts for better performance
const DynamicLineChart = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    import('chart.js/auto');
    return mod.Line;
  }), 
  { ssr: false }
);

const DynamicBarChart = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    import('chart.js/auto');
    return mod.Bar;
  }), 
  { ssr: false }
);

// New weather component
function WeatherInsights({ language }) {
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    windSpeed: 8,
    forecast: [
      { day: 'Mon', condition: 'sunny', high: 30, low: 22 },
      { day: 'Tue', condition: 'partly-cloudy', high: 29, low: 21 },
      { day: 'Wed', condition: 'rain', high: 26, low: 20 },
      { day: 'Thu', condition: 'thunderstorm', high: 25, low: 19 },
      { day: 'Fri', condition: 'cloudy', high: 27, low: 20 },
    ]
  });

  const weatherIcons = {
    sunny: <Sun className="h-6 w-6 text-amber-400" />,
    'partly-cloudy': <CloudSun className="h-6 w-6 text-blue-400" />,
    rain: <CloudRain className="h-6 w-6 text-blue-300" />,
    thunderstorm: <CloudLightning className="h-6 w-6 text-purple-400" />,
    cloudy: <Cloud className="h-6 w-6 text-gray-400" />,
    drizzle: <CloudDrizzle className="h-6 w-6 text-blue-200" />
  };

  const weatherContent = {
    title: {
      english: "AgriWeather Insights",
      hindi: "कृषि मौसम जानकारी"
    },
    subtitle: {
      english: "Real-time weather data for your farm",
      hindi: "आपके खेत के लिए रीयल-टाइम मौसम डेटा"
    },
    currentConditions: {
      english: "Current Conditions",
      hindi: "वर्तमान स्थिति"
    },
    temperature: {
      english: "Temperature",
      hindi: "तापमान"
    },
    humidity: {
      english: "Humidity",
      hindi: "आर्द्रता"
    },
    rainfall: {
      english: "Rainfall",
      hindi: "वर्षा"
    },
    windSpeed: {
      english: "Wind Speed",
      hindi: "हवा की गति"
    },
    forecast: {
      english: "5-Day Forecast",
      hindi: "5-दिन का पूर्वानुमान"
    },
    recommendations: {
      english: "Farming Recommendations",
      hindi: "कृषि सिफारिशें"
    },
    todayTip: {
      english: "Today's Farming Tip:",
      hindi: "आज की कृषि युक्ति:"
    },
    tipContent: {
      english: "With moderate rainfall expected tomorrow, it's a good time to prepare soil for planting.",
      hindi: "कल मध्यम वर्षा की संभावना को देखते हुए, रोपण के लिए मिट्टी तैयार करने का यह अच्छा समय है।"
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-lg bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8 shadow-lg"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <CloudSun className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              {weatherContent.title[language]}
            </h1>
            <p className="text-gray-400">
              {weatherContent.subtitle[language]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Conditions */}
        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-5">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-blue-400" />
            {weatherContent.currentConditions[language]}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">{weatherContent.temperature[language]}</div>
              <div className="text-xl font-bold">{weatherData.temperature}°C</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">{weatherContent.humidity[language]}</div>
              <div className="text-xl font-bold">{weatherData.humidity}%</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">{weatherContent.rainfall[language]}</div>
              <div className="text-xl font-bold">{weatherData.rainfall}mm</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">{weatherContent.windSpeed[language]}</div>
              <div className="text-xl font-bold">{weatherData.windSpeed} km/h</div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-5">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            {weatherContent.forecast[language]}
          </h3>
          <div className="flex justify-between">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-400">{day.day}</div>
                <div className="my-2 flex justify-center">
                  {weatherIcons[day.condition]}
                </div>
                <div className="text-sm">
                  <span className="font-medium">{day.high}°</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-400">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-700/30 rounded-xl p-5">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-emerald-400" />
          {weatherContent.recommendations[language]}
        </h3>
        <p className="text-gray-300">
          <span className="font-medium text-blue-300">{weatherContent.todayTip[language]}</span> {weatherContent.tipContent[language]}
        </p>
      </div>
    </motion.div>
  );
}

export default function AgriPredict() {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [region, setRegion] = useState("north");
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [optimalYield, setOptimalYield] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const [activeTab, setActiveTab] = useState("predictions");
  const [language, setLanguage] = useState("english");

  // Bilingual content
  const content = {
    title: {
      english: "AgriPredict Pro",
      hindi: "एग्रीप्रेडिक्ट प्रो"
    },
    subtitle: {
      english: "AI-powered crop planning & price forecasting",
      hindi: "AI-संचालित फसल योजना एवं मूल्य पूर्वानुमान"
    },
    selectCrop: {
      english: "Select Crop",
      hindi: "फसल चुनें"
    },
    selectRegion: {
      english: "Select Region",
      hindi: "क्षेत्र चुनें"
    },
    predict: {
      english: "Generate Insights",
      hindi: "जानकारी प्राप्त करें"
    },
    predicting: {
      english: "Analyzing Market Trends...",
      hindi: "बाजार के रुझान का विश्लेषण हो रहा है..."
    },
    predictions: {
      english: "Price Predictions",
      hindi: "मूल्य भविष्यवाणी"
    },
    historical: {
      english: "Historical Trends",
      hindi: "ऐतिहासिक रुझान"
    },
    recommendations: {
      english: "Optimal Cultivation",
      hindi: "इष्टतम खेती"
    },
    marketTrends: {
      english: "Market Intelligence",
      hindi: "बाजार बुद्धिमत्ता"
    },
    currentPrice: {
      english: "Current Price",
      hindi: "वर्तमान मूल्य"
    },
    predictedPrice: {
      english: "Next Season Price",
      hindi: "अगले सीजन का मूल्य"
    },
    yieldSuggestion: {
      english: "Recommended Yield",
      hindi: "सुझाई गई पैदावार"
    },
    riskFactor: {
      english: "Risk Factor",
      hindi: "जोखिम कारक"
    },
    demandForecast: {
      english: "Demand Forecast",
      hindi: "मांग पूर्वानुमान"
    },
    profitPotential: {
      english: "Profit Potential",
      hindi: "लाभ की संभावना"
    },
    minimizeWaste: {
      english: "Waste Reduction Strategy",
      hindi: "अपव्यय कम करने की रणनीति"
    },
    crops: {
      wheat: { english: "Wheat", hindi: "गेहूँ" },
      rice: { english: "Rice", hindi: "चावल" },
      maize: { english: "Maize", hindi: "मक्का" },
      soybean: { english: "Soybean", hindi: "सोयाबीन" },
      pulses: { english: "Pulses", hindi: "दलहन" }
    },
    regions: {
      north: { english: "North India", hindi: "उत्तर भारत" },
      south: { english: "South India", hindi: "दक्षिण भारत" },
      east: { english: "East India", hindi: "पूर्वी भारत" },
      west: { english: "West India", hindi: "पश्चिम भारत" }
    }
  };

  // Sample crop data (in a real app, this would come from an API)
  const cropData = {
    wheat: {
      currentPrice: 2100,
      predictedPrice: 2250,
      historical: [1950, 2000, 2050, 2100, 2150, 2200],
      optimalYield: "4-5 tons/acre",
      risk: "Low",
      demand: "High",
      profit: "15-20%",
      wasteReduction: "Staggered planting, proper storage"
    },
    rice: {
      currentPrice: 1850,
      predictedPrice: 1750,
      historical: [1900, 1875, 1825, 1850, 1800, 1750],
      optimalYield: "3-4 tons/acre",
      risk: "Medium",
      demand: "Stable",
      profit: "10-15%",
      wasteReduction: "Improved drying techniques"
    },
    maize: {
      currentPrice: 1700,
      predictedPrice: 1950,
      historical: [1600, 1650, 1700, 1750, 1800, 1850],
      optimalYield: "5-6 tons/acre",
      risk: "Medium",
      demand: "Growing",
      profit: "20-25%",
      wasteReduction: "Direct to processor contracts"
    }
  };

  const generatePrediction = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const crop = cropData[selectedCrop];
      
      setPredictionData({
        crop: selectedCrop,
        region,
        currentPrice: crop.currentPrice,
        predictedPrice: crop.predictedPrice,
        optimalYield: crop.optimalYield,
        riskFactor: crop.risk,
        demandForecast: crop.demand,
        profitPotential: crop.profit,
        wasteReduction: crop.wasteReduction
      });
      
      setHistoricalData(crop.historical.map((price, index) => ({
        year: new Date().getFullYear() - (5 - index),
        price
      })));
      
      setMarketTrends([
        { month: 'Jan', price: crop.currentPrice - 100 },
        { month: 'Feb', price: crop.currentPrice - 50 },
        { month: 'Mar', price: crop.currentPrice },
        { month: 'Apr', price: crop.currentPrice + 50 },
        { month: 'May', price: crop.currentPrice + 100 },
        { month: 'Jun', price: crop.predictedPrice }
      ]);
      
      setLoading(false);
      toast.success(language === "hindi" ? "विश्लेषण पूर्ण हुआ!" : "Analysis complete!");
    }, 1500);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "english" ? "hindi" : "english");
  };

  // Chart data for historical prices
  const historicalChartData = {
    labels: historicalData.map(item => item.year),
    datasets: [
      {
        label: language === "hindi" ? "ऐतिहासिक मूल्य (₹/क्विंटल)" : "Historical Price (₹/quintal)",
        data: historicalData.map(item => item.price),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Chart data for market trends
  const marketTrendsData = {
    labels: marketTrends.map(item => item.month),
    datasets: [
      {
        label: language === "hindi" ? "मासिक मूल्य रुझान (₹)" : "Monthly Price Trends (₹)",
        data: marketTrends.map(item => item.price),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none mt-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-900 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-900 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-20">
        {/* New Weather Insights Section */}
        <WeatherInsights language={language} />

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
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
              <Globe className="h-4 w-4" />
              {language === "english" ? "हिंदी" : "English"}
            </button>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control panel */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-400" />
                {content.selectCrop[language]}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {content.selectCrop[language]}
                  </label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {Object.keys(content.crops).map(crop => (
                      <option key={crop} value={crop}>
                        {content.crops[crop][language]}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {content.selectRegion[language]}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {Object.keys(content.regions).map(reg => (
                      <option key={reg} value={reg}>
                        {content.regions[reg][language]}
                      </option>
                    ))}
                  </select>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePrediction}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold transition ${loading ? 'bg-emerald-700 text-emerald-200' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg'}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {content.predicting[language]}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <ChartBar className="h-4 w-4" />
                      {content.predict[language]}
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Stats - shown after prediction */}
            {predictionData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  {language === "hindi" ? "त्वरित सांख्यिकी" : "Quick Stats"}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{content.currentPrice[language]}:</span>
                    <span className="font-medium">₹{predictionData.currentPrice}/quintal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{content.predictedPrice[language]}:</span>
                    <span className={`font-medium ${predictionData.predictedPrice > predictionData.currentPrice ? 'text-emerald-400' : 'text-amber-400'}`}>
                      ₹{predictionData.predictedPrice}/quintal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{content.yieldSuggestion[language]}:</span>
                    <span className="font-medium">{predictionData.optimalYield}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{content.riskFactor[language]}:</span>
                    <span className={`font-medium ${
                      predictionData.riskFactor.toLowerCase() === 'low' ? 'text-emerald-400' : 
                      predictionData.riskFactor.toLowerCase() === 'medium' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {predictionData.riskFactor}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results area */}
          <div className="lg:col-span-3 space-y-6">
            {predictionData ? (
              <>
                {/* Tabs */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                  <div className="flex border-b border-gray-700">
                    <button
                      onClick={() => setActiveTab("predictions")}
                      className={`px-6 py-3 text-sm font-medium relative flex items-center gap-2 ${activeTab === "predictions" ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      {/* <CurrencyRupee className="h-4 w-4" /> */}
                      {content.predictions[language]}
                      {activeTab === "predictions" && (
                        <motion.div 
                          layoutId="tabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("historical")}
                      className={`px-6 py-3 text-sm font-medium relative flex items-center gap-2 ${activeTab === "historical" ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Clock className="h-4 w-4" />
                      {content.historical[language]}
                      {activeTab === "historical" && (
                        <motion.div 
                          layoutId="tabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("recommendations")}
                      className={`px-6 py-3 text-sm font-medium relative flex items-center gap-2 ${activeTab === "recommendations" ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Leaf className="h-4 w-4" />
                      {content.recommendations[language]}
                      {activeTab === "recommendations" && (
                        <motion.div 
                          layoutId="tabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("marketTrends")}
                      className={`px-6 py-3 text-sm font-medium relative flex items-center gap-2 ${activeTab === "marketTrends" ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      <ChartBar className="h-4 w-4" />
                      {content.marketTrends[language]}
                      {activeTab === "marketTrends" && (
                        <motion.div 
                          layoutId="tabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                        />
                      )}
                    </button>
                  </div>

                  {/* Tab content */}
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {activeTab === "predictions" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="text-xl font-semibold">
                            {content.crops[selectedCrop][language]} {content.predictions[language]} ({content.regions[region][language]})
                          </h3>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                {/* <CurrencyRupee className="h-5 w-5 text-emerald-400" /> */}
                                {language === "hindi" ? "मूल्य पूर्वानुमान" : "Price Forecast"}
                              </h4>
                              <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold">
                                  ₹{predictionData.predictedPrice}
                                </span>
                                <span className="text-sm text-gray-400 mb-1">/quintal</span>
                              </div>
                              <div className={`mt-2 text-sm ${
                                predictionData.predictedPrice > predictionData.currentPrice ? 
                                'text-emerald-400' : 'text-amber-400'
                              }`}>
                                {predictionData.predictedPrice > predictionData.currentPrice ? 
                                  (language === "hindi" ? "▲ बढ़ने की संभावना" : "▲ Likely to increase") : 
                                  (language === "hindi" ? "▼ गिरने की संभावना" : "▼ Likely to decrease")}
                              </div>
                            </div>
                            
                            <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-400" />
                                {content.demandForecast[language]}
                              </h4>
                              <div className="text-3xl font-bold capitalize">
                                {predictionData.demandForecast}
                              </div>
                              <div className="mt-2 text-sm text-gray-400">
                                {language === "hindi" ? "अगले सीजन में बाजार की मांग" : "Market demand next season"}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <Scale className="h-5 w-5 text-purple-400" />
                              {language === "hindi" ? "बाजार विश्लेषण" : "Market Analysis"}
                            </h4>
                            <p className="text-gray-300">
                              {language === "hindi" ? 
                                `हमारा एआई मॉडल ${content.crops[selectedCrop].hindi} की कीमतों में ${predictionData.predictedPrice > predictionData.currentPrice ? 'वृद्धि' : 'गिरावट'} की भविष्यवाणी करता है। ${predictionData.demandForecast === 'High' ? 'उच्च मांग' : 'स्थिर मांग'} के कारण, ${predictionData.optimalYield} की पैदावार सबसे अधिक लाभदायक होगी।` :
                                `Our AI model predicts ${predictionData.predictedPrice > predictionData.currentPrice ? 'an increase' : 'a decrease'} in ${content.crops[selectedCrop].english} prices. With ${predictionData.demandForecast.toLowerCase()} demand, a yield of ${predictionData.optimalYield} would be most profitable.`}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "historical" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="text-xl font-semibold">
                            {content.crops[selectedCrop][language]} {content.historical[language]}
                          </h3>
                          
                          <div className="h-64">
                            <DynamicLineChart 
                              data={historicalChartData}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: {
                                    position: 'top',
                                  },
                                  tooltip: {
                                    callbacks: {
                                      label: function(context) {
                                        return `${context.dataset.label}: ₹${context.raw}`;
                                      }
                                    }
                                  }
                                },
                                scales: {
                                  y: {
                                    beginAtZero: false,
                                    ticks: {
                                      callback: function(value) {
                                        return '₹' + value;
                                      }
                                    }
                                  }
                                }
                              }}
                            />
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4">
                            {historicalData.map((yearData, index) => (
                              <div key={index} className="bg-gray-700/30 border border-gray-600 rounded-lg p-3">
                                <div className="text-sm text-gray-400">{yearData.year}</div>
                                <div className="text-lg font-medium">₹{yearData.price}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {index > 0 && (
                                    <span className={yearData.price > historicalData[index-1].price ? 'text-emerald-400' : 'text-amber-400'}>
                                      {yearData.price > historicalData[index-1].price ? '↑' : '↓'} 
                                      {Math.abs(Math.round(((yearData.price - historicalData[index-1].price) / historicalData[index-1].price) * 100))}%
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "recommendations" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="text-xl font-semibold">
                            {content.crops[selectedCrop][language]} {content.recommendations[language]}
                          </h3>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-5">
                              <h4 className="font-medium mb-4 flex items-center gap-2 text-emerald-400">
                                <Leaf className="h-5 w-5" />
                                {language === "hindi" ? "इष्टतम उत्पादन योजना" : "Optimal Production Plan"}
                              </h4>
                              <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                  <span className="bg-emerald-900/50 text-emerald-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">1</span>
                                  <span>
                                    {language === "hindi" ? 
                                      `${predictionData.optimalYield} की पैदावार लक्ष्य रखें` : 
                                      `Target a yield of ${predictionData.optimalYield}`}
                                  </span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="bg-emerald-900/50 text-emerald-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">2</span>
                                  <span>
                                    {language === "hindi" ? 
                                      "फसल चक्रण के लिए दलहनी फसलों पर विचार करें" : 
                                      "Consider pulse crops for crop rotation"}
                                  </span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="bg-emerald-900/50 text-emerald-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">3</span>
                                  <span>
                                    {language === "hindi" ? 
                                      "सटीक कृषि तकनीकों का उपयोग करें" : 
                                      "Use precision agriculture techniques"}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-5">
                              <h4 className="font-medium mb-4 flex items-center gap-2 text-blue-400">
                                <Droplet className="h-5 w-5" />
                                {content.minimizeWaste[language]}
                              </h4>
                              <ul className="space-y-3">
                                {predictionData.wasteReduction.split(', ').map((strategy, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="bg-blue-900/50 text-blue-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">{i+1}</span>
                                    <span>
                                      {language === "hindi" ? 
                                        strategy
                                          .replace('staggered planting', 'चरणबद्ध रोपण')
                                          .replace('proper storage', 'उचित भंडारण')
                                          .replace('improved drying techniques', 'बेहतर सुखाने की तकनीक')
                                          .replace('direct to processor contracts', 'प्रोसेसर से सीधे अनुबंध') :
                                        strategy}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl p-5">
                            <h4 className="font-medium mb-3 flex items-center gap-2 text-amber-400">
                              <Thermometer className="h-5 w-5" />
                              {language === "hindi" ? "जोखिम प्रबंधन" : "Risk Management"}
                            </h4>
                            <p className="text-gray-300">
                              {language === "hindi" ? 
                                `इस फसल का जोखिम स्तर ${predictionData.riskFactor === 'Low' ? 'कम' : predictionData.riskFactor === 'Medium' ? 'मध्यम' : 'उच्च'} है। ${predictionData.riskFactor === 'Low' ? 'बीमा कवरेज की आवश्यकता नहीं हो सकती है' : 'फसल बीमा पर विचार करें'}।` :
                                `This crop has ${predictionData.riskFactor.toLowerCase()} risk level. ${predictionData.riskFactor === 'Low' ? 'Insurance coverage may not be needed' : 'Consider crop insurance'}.`}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "marketTrends" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="text-xl font-semibold">
                            {content.crops[selectedCrop][language]} {content.marketTrends[language]}
                          </h3>
                          
                          <div className="h-64">
                            <DynamicBarChart 
                              data={marketTrendsData}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: {
                                    position: 'top',
                                  },
                                  tooltip: {
                                    callbacks: {
                                      label: function(context) {
                                        return `${context.dataset.label}: ₹${context.raw}`;
                                      }
                                    }
                                  }
                                },
                                scales: {
                                  y: {
                                    beginAtZero: false,
                                    ticks: {
                                      callback: function(value) {
                                        return '₹' + value;
                                      }
                                    }
                                  }
                                }
                              }}
                            />
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-5">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Sun className="h-5 w-5 text-yellow-400" />
                                {language === "hindi" ? "बेचने का सर्वोत्तम समय" : "Best Time to Sell"}
                              </h4>
                              <p className="text-gray-300">
                                {language === "hindi" ? 
                                  `हमारा विश्लेषण बताता है कि ${marketTrends.reduce((max, item) => item.price > max.price ? item : max).month} में बेचने पर उच्चतम मूल्य मिलने की संभावना है।` :
                                  `Our analysis suggests the highest prices are likely in ${marketTrends.reduce((max, item) => item.price > max.price ? item : max).month}.`}
                              </p>
                            </div>
                            
                            <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-5">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <CloudSun className="h-5 w-5 text-blue-400" />
                                {language === "hindi" ? "मौसमी प्रभाव" : "Seasonal Effects"}
                              </h4>
                              <p className="text-gray-300">
                                {language === "hindi" ? 
                                  "मॉनसून की भविष्यवाणी इस फसल की कीमतों को प्रभावित कर सकती है। नवीनतम मौसम अपडेट के लिए नियमित रूप से जांचें।" :
                                  "Monsoon forecasts may impact prices for this crop. Check regularly for weather updates."}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center backdrop-blur-sm"
              >
                <div className="max-w-md mx-auto">
                  <Database className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-400 mb-2">
                    {language === "hindi" ? "फसल डेटा विश्लेषण" : "Crop Data Analysis"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {language === "hindi" ? 
                      "फसल चुनें और क्षेत्र का चयन करें, फिर मूल्य पूर्वानुमान और इष्टतम पैदावार सिफारिशें प्राप्त करने के लिए विश्लेषण चलाएं।" :
                      "Select a crop and region, then run analysis to get price forecasts and optimal yield recommendations."}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>{language === "hindi" ? "किसानों की आय बढ़ाने और खाद्य अपव्यय को कम करने के लिए एआई का उपयोग करना" : "Using AI to increase farmer income and reduce food waste"}</p>
          <p className="mt-1">© {new Date().getFullYear()} AgriPredict Pro</p>
        </footer>
      </div>        
      </div>

     
    
  
  );
}