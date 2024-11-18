import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("session_x_autxz"); 
  const isLoggingOut = req.nextUrl.searchParams.get("loggingOut") === "true";
  if (token && !isLoggingOut) {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      await jwtVerify(token.value, secret);

  if (
    req.nextUrl.pathname === "/signin" ||
    req.nextUrl.pathname === "/signup"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  } else {
  if(req.nextUrl.pathname === "/") {}
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/dashboard/:path*", "/"],
};
