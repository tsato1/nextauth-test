import { NextResponse } from "next/server"
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

import { UserRole } from "@prisma/client"

/**
 * WithAuth() will augment the request that you get in the middleware
 * and puts the user's token in the request object
 */
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(`request.nextUrl.pathname = ${request.nextUrl.pathname}`)
    console.log(`request.nextauth.token = ${JSON.stringify(request.nextauth.token)}`)

    /** rewrite() will leave the /middlewareProtected path in the url bar */
    if (request.nextUrl.pathname.startsWith("/middlewareProtected") && request.nextauth.token?.role !== UserRole.SUPERADMIN) {
      return NextResponse.rewrite(new URL("/notAuthorized", request.url)) // sending to /denied but the original request.url will be displayed
    }

    if (request.nextUrl.pathname.startsWith("/clientPage") && request.nextauth.token?.role !== UserRole.SUPERADMIN && request.nextauth.token?.role !== UserRole.ADMIN) {
      return NextResponse.rewrite(new URL("/notAuthorized", request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = { matcher: ["/middlewareProtected", "/clientPage"] }