import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token")?.value;
    console.log("token from middleware",token);
  
  const pathname =request.nextUrl.pathname;
  console.log("from pathname",pathname)

  // =========================
  // PUBLIC ROUTES
  // =========================
  const publicRoutes = [
    "/login",
    "/register",
  ];

  // =========================
  // PROTECTED ROUTES
  // =========================
  const freelancerRoutes =
    pathname.startsWith(
      "/freelancer"
    );

  const clientRoutes =
    pathname.startsWith(
      "/client"
    );

  const protectedRoutes =
    freelancerRoutes ||
    clientRoutes;

  // =========================
  // IF USER NOT LOGGED IN
  // =========================
  if (
    protectedRoutes &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // =========================
  // VERIFY TOKEN
  // =========================
  if (token) {
    try {
      // jsonwebtoken does not work on the Edge runtime, so we decode manually 
      // or use the 'jose' library. For routing, decoding the payload is sufficient.
      const payloadBase64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded: any = JSON.parse(atob(payloadBase64));

      console.log("decoded", decoded);
        

      // =========================
      // ROLE CHECK
      // =========================

      // Freelancer trying client route
      if (
        clientRoutes &&
        decoded.role !== "client"
      ) {
        return NextResponse.redirect(
          new URL("/", request.url)
        );
      }

      // Client trying freelancer route
      if (
        freelancerRoutes &&
        decoded.role !==
          "freelancer"
      ) {
        return NextResponse.redirect(
          new URL("/", request.url)
        );
      }

      // =========================
      // PREVENT LOGIN ACCESS
      // AFTER LOGIN
      // =========================
      if (
        publicRoutes.includes(
          pathname
        )
      ) {
        if (
          decoded.role ===
          "freelancer"
        ) {
          return NextResponse.redirect(
            new URL(
              "/freelancer/dashboard",
              request.url
            )
          );
        }

        if (
          decoded.role ===
          "client"
        ) {
          return NextResponse.redirect(
            new URL(
              "/client/dashboard",
              request.url
            )
          );
        }
      }

      return NextResponse.next();
    } catch (error) {
      // Invalid token

      console.error("JWT Verification Error:", error);
      const response =
        NextResponse.redirect(
          new URL(
            "/login",
            request.url
          )
        );

      response.cookies.delete(
        "token"
      );

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/freelancer/:path*",
    "/client/:path*",
  ],
};