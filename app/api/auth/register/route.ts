import { connectToDatabase } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function POST(req : Request,res :Response){
    try {
        await connectToDatabase()
        const body = await req.json()
        const {email,name,password,role} = body
        if(!email || !name || !password || !role){
            return NextResponse.json({success :false,message : "all fields are reuired"},{status : 400})
        }
        const existinguser = await User.findOne({email})
        if(existinguser){
            return NextResponse.json({success :false,message : "user already exist"},{status : 400})
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password : hashedpassword,
            role
        })
        return NextResponse.json({success :true,message : "user created successfully"},{status : 201})

    } catch (error) {
        console.error('register route error:', error)
        return NextResponse.json({success :false,message : "an error occurred"},{status : 500})
    }
}