import { clientSchema } from "@/app/validation/client_valid/client.validator";
import { verifytoken } from "@/lib/jwt";
import { createclientservice, deleteclientprofileservice, getmyprofileservice, updateclientprofileservice } from "@/services/client.service";
import { NextRequest } from "next/server";

export async function createclientcontroller(req:NextRequest) {
    try {
        const token =req.cookies.get("token")?.value;
        if(!token){
            return Response.json({success: false,message:"unauthorized from backed controller"},{status:401})
        }
        const decode : any = verifytoken(token)
        const body =await req.json()
        const validate :any = clientSchema.parse(body)
        const profile = await createclientservice(validate,decode.id)
        return Response.json({success : true,profile},{status:200})
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

export async function updateprofileclientcontroller(req:NextRequest,id : string) {
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
        const validate = clientSchema.parse(body)
        const profile = await updateclientprofileservice(validate,id)
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


export async function deleteprofileclientcontroller(req:NextRequest,id : string) {
    try {
        const token =req.cookies.get("token")?.value;
        if(!token){
            return Response.json({success: false,message:"unauthorized from backed controller"},{status:401})
        }
        const decode : any = verifytoken(token)
        if(!decode){
          return Response.json({success: false,message:"token verification error"},{status:401})
        }
        const messagefromdel = await deleteclientprofileservice(id)
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