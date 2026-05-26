import { connectToDatabase } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { generetetoken } from "@/lib/jwt";

export async function POST(req :Request){
    try {
        await connectToDatabase()
        const body = await req.json()
        const {email,password} = body
        if(!email || !password){
            return NextResponse.json({success :false,message : "all fields are reuired"},{status : 400})
        }
        const existinguser = await User.findOne({email})
        if(!existinguser){
            return NextResponse.json({success :false,message : "user not exist"},{status : 400})
        }
        const ismatch = await bcrypt.compare(password, existinguser.password)
        if(!ismatch){
            return NextResponse.json({success :false,message : "invalid credentials"},{status : 400})
        }
        const token = generetetoken({id : existinguser._id})
        const response = NextResponse.json({success :true,message : "login successful",token,user : existinguser},{status : 200})
        response.headers.set("Set-Cookie",`token=${token}; Path=/; HttpOnly`)
        return response
    } catch (error) {
        console.error('login route error:', error)
        return NextResponse.json({success :false,message : "an error occurred"},{status : 500})
    }
}