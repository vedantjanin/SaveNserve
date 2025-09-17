// // app/api/signup/route.js
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const { userType, name, email, password, phone, address, organization } = body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json({ message: "User already exists" }, { status: 400 });
//     }

//     // Save new user
//     const newUser = new User({
//       userType,
//       name,
//       email,
//       password, // ❗Later, we’ll hash this
//       phone,
//       address,
//       organization
//     });

//     await newUser.save();

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });

//   } catch (error) {
//     console.error("Signup error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }


// app/api/signup/route.js
// import bcrypt from "bcryptjs"; // 🔐 Import bcrypt
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const { userType, name, email, password, phone, address, organization } = body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json({ message: "User already exists" }, { status: 400 });
//     }

//     // 🔐 Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       userType,
//       name,
//       email,
//       password: hashedPassword, // store hashed password
//       phone,
//       address,
//       organization
//     });

//     await newUser.save();

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });

//   } catch (error) {
//     console.error("Signup error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }


import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { userType, ...formData } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email: formData.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user with role
    const user = await User.create({
      ...formData,
      role: userType
    });

    // Remove password from response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Server error, please try again later" },
      { status: 500 }
    );
  }
}