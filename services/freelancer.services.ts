import Freelancer from "@/models/freelancer";
import { error } from "console";
import { json } from "zod";

export async function createfreelancerservice(data:any,userId : string) {
    const existinguser = await Freelancer.findOne({user:userId})
    if(existinguser){
        throw new Error("profile already exists")
    }
    const profile = await Freelancer.create({
        user : userId,
        ...data
    })
    return profile
}

export async function getmyprofileservice(userId : string) {
    const existinguser = await Freelancer.findOne({user:userId})
    if(!existinguser){
        throw new Error("profile register yet")
    }
    return existinguser
}

export async function updateprofileservice(data : any, userId : string ){
    const existinguser = await Freelancer.findOne({user:userId})
    if(!existinguser){
        throw new Error("profile register yet")
    }
    const updatedprofile = await Freelancer.findByIdAndUpdate(existinguser.id,{
        ...data
    },{new : true})
    return updatedprofile
}

export async function deleteprofileservice(userId : string ){
    const existinguser = await Freelancer.findOne({user:userId})
    if(!existinguser){
        throw new Error("profile register yet")
    }
    await Freelancer.findByIdAndDelete(existinguser.id)
    return json({message : "deleted successfully"})
}
