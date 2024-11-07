import { z } from "@/utils/pt-br-zod";

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    rememberMe: z.boolean().optional(),
  }); 