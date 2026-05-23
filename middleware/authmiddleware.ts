import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authmiddleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        jwt.verify(token, process.env.JWT_SECRETE!);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}