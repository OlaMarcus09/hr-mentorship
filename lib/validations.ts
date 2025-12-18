import { z } from 'zod';

// 1. Strict Regex for Names (Alphanumeric + Spaces only, No special symbols)
// This rejects < > / \ ; -- which are used in injections
const stringSanitizer = z.string()
  .min(2, "Must be at least 2 characters")
  .regex(/^[a-zA-Z0-9\s]+$/, "Only letters, numbers, and spaces allowed (No special characters)");

// 2. Schema for Creating an Admin
export const createAdminSchema = z.object({
  name: stringSanitizer,
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// 3. Schema for Creating a Job (Stricter validation)
export const createJobSchema = z.object({
  title: stringSanitizer,
  company: stringSanitizer,
  type: z.enum(["Remote", "Hybrid", "On-site"]), // Only allows these 3 exact values
  location: stringSanitizer,
});
