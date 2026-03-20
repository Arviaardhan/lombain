import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isProtectedPage = 
    request.nextUrl.pathname.startsWith('/explore') ||
    request.nextUrl.pathname.startsWith('/talent') ||
    request.nextUrl.pathname.startsWith('/dashboard')
    request.nextUrl.pathname.startsWith('/profile')

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/explore', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/explore/:path*', '/talent/:path*', '/dashboard/:path*', '/profile/:path*', '/auth/:path*'],
}