// logout/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Delete the token cookie to log the user out
    response.cookies.delete('token', {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Server error, please try again later" },
      { status: 500 }
    );
  }
}
