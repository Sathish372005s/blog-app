import { myprofilecontroller } from "@/controllers/freelancer.controllers";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    return myprofilecontroller(req)
}