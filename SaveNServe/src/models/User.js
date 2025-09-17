// // models/User.js
// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   userType: {
//     type: String,
//     enum: ['individual', 'retailer', 'farmer', 'ngo'],
//     required: true
//   },
//   name: String,
//   email: { type: String, required: true, unique: true },
//   password: String,
//   phone: String,
//   address: String,
//   organization: String,
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model('User', UserSchema);
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ["farmer", "retailer", "individual", "ngo"] 
  },
  organization: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Add password hashing middleware
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);