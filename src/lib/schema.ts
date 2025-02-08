import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

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

export const brandSchema = categorySchema.extend({
  image: z
    .any()
    .refine((file: File) => file?.name, { message: "Image is required" })
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File is not valid",
    }),
});
