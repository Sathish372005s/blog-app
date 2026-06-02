import { createfreelancercontroller } from "@/controllers/freelancer.controllers";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    return createfreelancercontroller(req)
}