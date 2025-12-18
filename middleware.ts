import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the path
  const path = request.nextUrl.pathname;

  // 2. Define protected paths (Anything starting with /admin)
  const isProtected = path.startsWith('/admin');

  // 3. Get the token from cookies
  const token = request.cookies.get('admin_token')?.value;

  // 4. Logic: If trying to access Admin but no token -> Go to Login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 5. Allow request to proceed
  return NextResponse.next();
}

// Optimization: Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
