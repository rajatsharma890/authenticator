import { publicDecrypt } from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
   const path = request.nextUrl.pathname

   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

   const token = request.cookies.get('token')?.value || ''

   if(token && isPublicPath){
    return NextResponse.redirect(new URL('/', request.nextUrl))
   }

   if(!token && !isPublicPath){
    return NextResponse.redirect(new URL('/signup', request.nextUrl))
   }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword',
        '/resetpassword',
    ]
}