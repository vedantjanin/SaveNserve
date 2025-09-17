import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/register' || path === '/forgot-password';
  const token = request.cookies.get('token')?.value || '';

  try {
    // Redirect logic for protected paths
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If token exists, verify it
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Redirect authenticated users away from public paths
      if (isPublicPath) {
        return NextResponse.redirect(new URL(`/dashboard/${payload.role}`, request.nextUrl));
      }

      // Handle dashboard access
      if (path === '/dashboard' || path === '/dashboard/') {
        return NextResponse.redirect(new URL(`/dashboard/${payload.role}`, request.nextUrl));
      }

      // Prevent access to other role's dashboards
      if (path.startsWith('/dashboard/') && !path.includes(payload.role)) {
        return NextResponse.redirect(new URL(`/dashboard/${payload.role}`, request.nextUrl));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    const response = NextResponse.redirect(new URL('/login', request.nextUrl));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};