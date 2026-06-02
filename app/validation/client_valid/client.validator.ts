import { z } from "zod";

export const clientSchema =z.object({
    companyName:z.string().min(3),
    companyDescription :z.string().min(30),
    companyWebsite :z.string(),
    industry : z.string(),
    location : z.string(),
    logo :z.string()
})