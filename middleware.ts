import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
var cookie = require('cookie');
 
// 1. Specify protected and public routes
const protectedRoutes = ['/home']
const publicRoutes = ['/','/login']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Get the session from the cookie
  const session = cookies().get('session')?.value
  const credentials = session?.split(" ")

  if (req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 6. Redirect to /home if the user is authenticated
  if (
    isPublicRoute &&
    session && credentials?.[0] === "webskitters" &&  credentials?.[1] === "webskitters"
    && !req.nextUrl.pathname.startsWith('/home')
  ) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}