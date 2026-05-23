import { cookies } from "next/headers";
import {verifytoken} from "@/lib/jwt";
import { NextResponse } from "next/server";
export async function GET(){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if(!token){
            return NextResponse.json({success :false,message : "no token provided"},{status : 401})
        }
        const decoded = verifytoken(token);
        if(!decoded){
            return NextResponse.json({success :false,message : "invalid token"},{status : 401})
        }
        return  NextResponse.json({success :true,message : "user authenticated",user : decoded})
    }
    catch(error){
        return NextResponse.json({success :false,message : "an error occurred"},{status : 500})
    }
}