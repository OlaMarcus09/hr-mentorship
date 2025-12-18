import { z } from 'zod';

const stringSanitizer = z.string()
  .min(2, "Must be at least 2 characters")
  .regex(/^[a-zA-Z0-9\s.,!?'"-]+$/, "No special symbols allowed");

export const createAdminSchema = z.object({
  name: stringSanitizer,
  email: z.string().email(),
  password: z.string().min(6)
});

export const createJobSchema = z.object({
  title: stringSanitizer,
  company: stringSanitizer,
  type: z.enum(["Remote", "Hybrid", "On-site"]),
  location: stringSanitizer,
});

export const createEventSchema = z.object({
  title: stringSanitizer,
  date: z.string(),
  image: z.string().url().optional().or(z.literal("")),
  location: stringSanitizer
});
