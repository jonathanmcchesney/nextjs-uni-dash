import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // this currently just checks for the presence of a token, not that the token is authorised.
  // in the future when there is database persitence and proper data flow, we will check permissions
  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// apply middleware to all routes except login, graphql api and static files
export const config = {
  matcher: ["/((?!login|api|_next|public|favicon.ico).*)"],
};
