import { freelancerSchema } from "@/app/validation/freelancer_valid/freelancer.validate";
import { verifytoken } from "@/lib/jwt";
import { createfreelancerservice , deleteprofileservice, getmyprofileservice, updateprofileservice } from "@/services/freelancer.services";
import { NextRequest } from "next/server";


export async function createfreelancercontroller(req:NextRequest) {
    try {
        const token =req.cookies.get("token")?.value;
        if(!token){
            return Response.json({success: false,message:"unauthorized from backed controller"},{status:401})
        }
        const decode : any = verifytoken(token)
        const body =await req.json()
        const validate = freelancerSchema.parse(body)
        const profile = await createfreelancerservice(validate,decode.id)
        return Response.json({success : true, profile},{status:200})
    } catch (error : any) {
        return Response.json(
      {
        success: false,

        message:error.message,
      },
      {
        status: 500,
      }
    );
    }
}

export async function myprofilecontroller(req:NextRequest) {
    try {
        const token =req.cookies.get("token")?.value;
        if(!token){
            return Response.json({success: false,message:"unauthorized from backed controller"},{status:401})
        }
        const decode : any = verifytoken(token)
        const profile = await getmyprofileservice(decode.id)
        return Response.json({success : true, profile},{status:200})
    } catch (error : any) {
        return Response.json(
      {
        success: false,

        message:error.message,
      },
      {
        status: 500,
      }
    );
    }
}

export async function updateprofilecontroller(req:NextRequest,id : string) {
    try {
        const token =req.cookies.get("token")?.value;
        if(!token){
            return Response.json({success: false,message:"unauthorized from backed controller"},{status:401})
        }
        const decode : any = verifytoken(token)
        if(!decode){
          return Response.json({success: false,message:"token verification error"},{status:401})
        }
        const body =await req.json()
        const validate = freelancerSchema.parse(body)
        const profile = await updateprofileservice(validate,id)
        return Response.json({success : true, profile},{status:200})
    } catch (error : any) {
        return Response.json(
      {
        success: false,

        message:error.message,
      },
      {
        status: 500,
      }
    );
    }
}


export async function deleteprofilecontroller(req:NextRequest,id : string) {
    try {
        const token =req.cookies.get("token")?.value;
        if(!token){
            return Response.json({success: false,message:"unauthorized from backed controller"},{status:401})
        }
        const decode : any = verifytoken(token)
        if(!decode){
          return Response.json({success: false,message:"token verification error"},{status:401})
        }
        const messagefromdel = await deleteprofileservice(id)
        return Response.json({success : true, messagefromdel},{status:200})
    } catch (error : any) {
        return Response.json(
      {
        success: false,

        message:error.message,
      },
      {
        status: 500,
      }
    );
    }
}