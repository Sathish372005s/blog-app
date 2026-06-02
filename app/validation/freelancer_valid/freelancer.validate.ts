import { z } from "zod";

export const freelancerSchema =
  z.object({
    title: z.string().min(3),

    bio: z.string().min(20),

    skills: z.array(
      z.string()
    ),

    experienceLevel:
      z.enum([
        "junior",
        "mid",
        "senior",
      ]),

    availability:
      z.enum([
        "full-time",
        "part-time",
        "not-available",
      ]),

    links: z.object({
      linkedin:
        z.string().optional(),

      portfolio:
        z.string().optional(),
    }),

    services: z.array(
      z.object({
        name: z.string(),

        rate: z.number(),

        description:
          z.string(),
      })
    ),
  });

export type FreelancerType =
  z.infer<
    typeof freelancerSchema
  >;