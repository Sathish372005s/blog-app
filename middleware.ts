import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token")
      ?.value;

  const pathname =
    request.nextUrl.pathname;

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
      const decoded: any =
        jwt.verify(
          token,
          JWT_SECRET
        );

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