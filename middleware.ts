import { createClient } from '@/utils/supabase/middleware'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Routes that require authentication
  const protectedRoutes = ['/tests', '/results', '/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    const response = createClient(request)
    
    // Check if user is authenticated by looking for session
    const cookieStore = request.cookies
    const hasSession = cookieStore.has('sb-kuyxyussdgfdboefxaug-auth-token') || 
                       cookieStore.has('sb-auth-token')

    if (!hasSession) {
      // Redirect to login if no session
      const loginUrl = new URL('/auth/login', request.url)
      return Response.redirect(loginUrl)
    }

    return response
  }

  // Public routes - proceed normally
  return createClient(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth).*)',
  ],
}
