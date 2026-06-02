import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3),

  description: z.string().min(20),

  budget :z.number(),

  skillsRequired: z.array(z.string()),

  experienceLevel : z.enum(["junior", "mid", "senior"]),

  projectType :z.enum(["fixed", "hourly"]),

  duration : z.string(),

  status : z.enum(["open", "in-progress", "completed", "cancelled"]),


});
