import { NextResponse } from 'next/server';

// Middleware function
export function middleware(req) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();
  const protectedRoutes = ['/addtodo', '/todolist']; // These are private routing
  if (protectedRoutes.includes(url.pathname)) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/addtodo', '/todolist'], // These are private routing
};
