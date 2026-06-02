import Client from "@/models/client";
import { error } from "console";


export async function createclientservice(data:any,userId : string) {
    const existinguser = await Client.findOne({user:userId})
    if(existinguser){
        throw new Error("profile already exists")
    }
    const profile = await Client.create({
        user : userId,
        ...data
    })
    return profile
}

export async function getmyprofileservice(userId : string) {
    const existinguser = await Client.findOne({user:userId})
    if(!existinguser){
        throw new Error("profile register yet")
    }
    return existinguser
}


export async function updateclientprofileservice(data : any, userId : string ){
    const existinguser = await Client.findOne({user:userId})
    if(!existinguser){
        throw new Error("profile register yet")
    }
    const updatedprofile = await Client.findByIdAndUpdate(existinguser.id,{
        ...data
    },{new : true})
    return updatedprofile
}

export async function deleteclientprofileservice(userId : string ){
    const existinguser = await Client.findOne({user:userId})
    if(!existinguser){
        throw new Error("profile register yet")
    }
    await Client.findByIdAndDelete(existinguser.id)
    return({message : "deleted successfully"})
}