import { createclientcontroller } from "@/controllers/client.controller";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    return createclientcontroller(req)
}