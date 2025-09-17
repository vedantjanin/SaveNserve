// "use client";

// import { useState } from "react";
// import { Upload, CheckCircle2, X, ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";

// const AddSurplus = ({ onAddListing }) => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     foodType: "",
//     foodName: "",
//     quantity: "",
//     quantityUnit: "kg",
//     expiryDate: "",
//     bestBeforeDate: "",
//     location: "",
//     mspPerUnit: "",
//     quality: "good",
//     storageCondition: "room-temperature",
//     description: "",
//     image: null,
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   const foodTypes = [
//     "Fruits",
//     "Vegetables",
//     "Grains",
//     "Dairy",
//     "Meat",
//     "Bakery",
//     "Prepared Foods",
//     "Beverages",
//     "Other",
//   ];

//   const qualityOptions = [
//     { value: "excellent", label: "Excellent (Fresh)" },
//     { value: "good", label: "Good" },
//     { value: "average", label: "Average" },
//     { value: "needs-quick-sale", label: "Needs Quick Sale" },
//   ];

//   const storageConditions = [
//     { value: "room-temperature", label: "Room Temperature" },
//     { value: "refrigerated", label: "Refrigerated" },
//     { value: "frozen", label: "Frozen" },
//     { value: "dry-storage", label: "Dry Storage" },
//   ];

//   const quantityUnits = ["kg", "lbs", "litres", "pieces", "boxes", "bags", "cartons"];

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
    
//     if (name === "image" && files && files[0]) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(files[0]);
//       setFormData({
//         ...formData,
//         image: files[0],
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newListing = {
//       ...formData,
//       id: Date.now(),
//       image: imagePreview || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
//       listedDate: new Date().toISOString(),
//     };
//     onAddListing(newListing);
//     setSubmitted(true);
//   };

//   const resetFormAndNavigate = (navigateToListings = false) => {
//     setFormData({
//       foodType: "",
//       foodName: "",
//       quantity: "",
//       quantityUnit: "kg",
//       expiryDate: "",
//       bestBeforeDate: "",
//       location: "",
//       mspPerUnit: "",
//       quality: "good",
//       storageCondition: "room-temperature",
//       description: "",
//       image: null,
//     });
//     setImagePreview(null);
//     setSubmitted(false);
    
//     if (navigateToListings) {
//       router.push('/retailer-dashboard?tab=listings');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
//       <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-6 text-white">
//         <h1 className="text-2xl font-bold">Add Surplus Food Item</h1>
//         <p className="opacity-90">Help reduce food waste by listing your surplus items</p>
//       </div>

//       {submitted ? (
//         <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
//           <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">Listing Added Successfully!</h2>
//           <p className="text-gray-600 mb-6">Your surplus food item is now available for others to view.</p>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => resetFormAndNavigate(true)}
//               className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
//             >
//               View Listings
//             </button>
//             <button
//               onClick={() => resetFormAndNavigate(false)}
//               className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition"
//             >
//               Add Another Item
//             </button>
//           </div>
//         </div>
//       ) : (
//         <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Food Type */}
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Food Type *</label>
//               <select
//                 name="foodType"
//                 value={formData.foodType}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
//               >
//                 <option value="">Select Food Type</option>
//                 {foodTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>

//             {/* Food Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Food Name *</label>
//               <input
//                 type="text"
//                 name="foodName"
//                 value={formData.foodName}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="E.g. Organic Bananas"
//               />
//             </div>

//             {/* Quantity */}
//             <div className="grid grid-cols-3 gap-3">
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                   step="0.01"
//                   className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
//                   placeholder="E.g. 10"
//                 />
//               </div>
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
//                 <select
//                   name="quantityUnit"
//                   value={formData.quantityUnit}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
//                 >
//                   {quantityUnits.map((unit) => (
//                     <option key={unit} value={unit}>
//                       {unit}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Expiry Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
//               <input
//                 type="date"
//                 name="expiryDate"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
//               />
//             </div>

//             {/* Best Before Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Best Before Date</label>
//               <input
//                 type="date"
//                 name="bestBeforeDate"
//                 value={formData.bestBeforeDate}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
//               />
//             </div>

//             {/* Location */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="E.g. Downtown Warehouse"
//               />
//             </div>

//             {/* MSP per Unit */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">MSP per Unit ($) *</label>
//               <input
//                 type="number"
//                 name="mspPerUnit"
//                 value={formData.mspPerUnit}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 step="0.01"
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="E.g. 2.50"
//               />
//             </div>

//             {/* Quality */}
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Quality *</label>
//               <select
//                 name="quality"
//                 value={formData.quality}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
//               >
//                 {qualityOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>

//             {/* Storage Condition */}
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Storage Condition *</label>
//               <select
//                 name="storageCondition"
//                 value={formData.storageCondition}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
//               >
//                 {storageConditions.map((condition) => (
//                   <option key={condition.value} value={condition.value}>
//                     {condition.label}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="3"
//               required
//               className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
//               placeholder="Provide details about the food item, packaging, handling instructions, etc."
//             />
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image *</label>
//             <div className="mt-1 flex flex-col items-start space-y-4">
//               {imagePreview ? (
//                 <div className="relative">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="h-48 w-full object-cover rounded-lg border"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setImagePreview(null);
//                       setFormData({ ...formData, image: null });
//                     }}
//                     className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
//                   >
//                     <X className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
//               ) : (
//                 <label className="cursor-pointer">
//                   <div className="flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 transition">
//                     <Upload className="h-10 w-10 text-gray-400 mb-2" />
//                     <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
//                     <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
//                   </div>
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={handleChange}
//                     className="hidden"
//                     accept="image/*"
//                     required
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           <div className="pt-4">
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
//             >
//               Add to Listings
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AddSurplus;



"use client";

import { useState } from "react";
import { Upload, ChevronDown } from "lucide-react";

const AddSurplus = ({ onAddListing }) => {
  const [formData, setFormData] = useState({
    foodType: "",
    foodName: "",
    quantity: "",
    quantityUnit: "kg",
    expiryDate: "",
    bestBeforeDate: "",
    location: "",
    mspPerUnit: "",
    quality: "good",
    storageCondition: "room-temperature",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const foodTypes = [
    "Fruits", "Vegetables", "Grains", "Dairy", 
    "Meat", "Bakery", "Prepared Foods", "Beverages", "Other"
  ];

  const qualityOptions = [
    { value: "excellent", label: "Excellent (Fresh)" },
    { value: "good", label: "Good" },
    { value: "average", label: "Average" },
    { value: "needs-quick-sale", label: "Needs Quick Sale" },
  ];

  const storageConditions = [
    { value: "room-temperature", label: "Room Temperature" },
    { value: "refrigerated", label: "Refrigerated" },
    { value: "frozen", label: "Frozen" },
    { value: "dry-storage", label: "Dry Storage" },
  ];

  const quantityUnits = ["kg", "lbs", "litres", "pieces", "boxes", "bags", "cartons"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(files[0]);
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      ...formData,
      id: Date.now(), // Unique ID based on timestamp
      image: imagePreview || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      listedDate: new Date().toISOString(),
    };
    onAddListing(newListing);
    // Reset form after submission
    setFormData({
      foodType: "",
      foodName: "",
      quantity: "",
      quantityUnit: "kg",
      expiryDate: "",
      location: "",
      mspPerUnit: "",
      quality: "good",
      storageCondition: "room-temperature",
      description: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-6 text-white">
        <h1 className="text-2xl font-bold">Add Surplus Food Item</h1>
        <p className="opacity-90">Help reduce food waste by listing your surplus items</p>
      </div>

      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Type *</label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              <option value="">Select Food Type</option>
              {foodTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Name *</label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="E.g. Organic Bananas"
            />
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                placeholder="E.g. 10"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
              <select
                name="quantityUnit"
                value={formData.quantityUnit}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
              >
                {quantityUnits.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="E.g. Downtown Warehouse"
            />
          </div>

          {/* MSP per Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MSP per Unit (Rs) *</label>
            <input
              type="number"
              name="mspPerUnit"
              value={formData.mspPerUnit}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              placeholder="E.g. 2.50"
            />
          </div>

          {/* Quality */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quality *</label>
            <select
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              {qualityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Storage Condition */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Storage Condition *</label>
            <select
              name="storageCondition"
              value={formData.storageCondition}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              {storageConditions.map((condition) => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-10 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
            className="w-full p-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
            placeholder="Provide details about the food item, packaging, handling instructions, etc."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image *</label>
          <div className="mt-1 flex flex-col items-start space-y-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-48 w-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData({ ...formData, image: null });
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  {/* <X className="h-5 w-5 text-gray-600" /> */}
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 transition">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                </div>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                  required
                />
              </label>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Add to Listings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSurplus;