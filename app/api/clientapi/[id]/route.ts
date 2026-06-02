import { deleteprofileclientcontroller, updateprofileclientcontroller } from "@/controllers/client.controller";
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
    return updateprofileclientcontroller(req,params.id)
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
    return deleteprofileclientcontroller(req,params.id)
}

