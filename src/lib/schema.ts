import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("Name is required")
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, "Password should have min 5 character"),
});

export const categorySchema = z.object({
  name: z.string().nonempty("Name is required"),
});
