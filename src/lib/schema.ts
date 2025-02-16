import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, "Password should have min 5 character"),
});

export const signUpSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("Email is required")
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

export const productSchema = categorySchema.extend({
  price: z.string().nonempty("Price is required"),
  description: z.string().nonempty("Description is required"),
  stock: z.string().nonempty("Stock is required"),
  category_id: z.string().nonempty("Category is required"),
  brand_id: z.string().nonempty("Brand is required"),
  location_id: z.string().nonempty("Location is required"),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Please upload 3 image product",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type);
        });

        return validate;
      },
      {
        message: "Uploaded file should image",
      }
    ),
});

export const editProductSchema = productSchema
  .extend({
    id: z.number({ required_error: "Product ID is required" }),
  })
  .omit({ images: true });
