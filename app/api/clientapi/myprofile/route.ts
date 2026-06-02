import { myprofilecontroller } from "@/controllers/client.controller";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    return myprofilecontroller(req)
}