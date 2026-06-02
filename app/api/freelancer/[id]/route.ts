import { deleteprofilecontroller, updateprofilecontroller } from "@/controllers/freelancer.controllers";
import { NextRequest } from "next/server";

export async function PUT(
    req: NextRequest
    ,{
        params
    }:{
        params:{
            id : string
        }
    }
){
    return updateprofilecontroller(req,params.id)
}

export async function DELETE(
    req: NextRequest,
    {
        params
    }:{
        params:{
            id : string
        }
    }
){
    return deleteprofilecontroller(req,params.id)
}

