import { NextRequest, NextResponse } from 'next/server';
import { authmiddleware } from "@/middleware/authmiddleware";

export function middleware(req : NextRequest) {
    return authmiddleware(req);
}

export const config = {
    matcher : ["/me"]  //later change to /dashboard or any other protected route
}