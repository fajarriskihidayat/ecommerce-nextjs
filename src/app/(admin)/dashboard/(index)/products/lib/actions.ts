"use server";

import { editProductSchema, productSchema } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { ProductStock } from "@prisma/client";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const uploaded_images = validate.data.images as File[];
  const filenames = [];

  for (const image of uploaded_images) {
    const filename = await uploadFile(image, "products");
    filenames.push(filename);
  }

  try {
    await prisma.product.create({
      data: {
        name: validate.data.name,
        description: validate.data.description,
        stock: validate.data.stock as ProductStock,
        category_id: +validate.data.category_id,
        brand_id: +validate.data.brand_id,
        location_id: +validate.data.location_id,
        price: +validate.data.price,
        images: filenames,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to insert data product",
    };
  }

  return redirect("/dashboard/products");
}

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const validate = editProductSchema.safeParse({
    id: id,
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const product = await prisma.product.findFirst({
    where: { id: id },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  const uploaded_images = formData.getAll("images") as File[];
  let filenames = [];

  if (uploaded_images.length === 3) {
    const parseImages = productSchema.pick({ images: true }).safeParse({
      images: uploaded_images,
    });

    if (!parseImages.success) {
      return {
        error: "Failed to upload image",
      };
    }

    for (const image of product.images) {
      await deleteFile(image, "products");
    }

    for (const image of uploaded_images) {
      const filename = await uploadFile(image, "products");
      filenames.push(filename);
    }
  } else {
    filenames = product.images;
  }

  try {
    const data = await prisma.product.update({
      where: { id },
      data: {
        name: validate.data.name,
        description: validate.data.description,
        stock: validate.data.stock as ProductStock,
        category_id: +validate.data.category_id,
        brand_id: +validate.data.brand_id,
        location_id: +validate.data.location_id,
        price: +validate.data.price,
        images: filenames,
      },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update data product",
    };
  }

  return redirect("/dashboard/products");
}

export async function deleteProduct(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  try {
    for (const image of product.images) {
      await deleteFile(image, "products");
    }

    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete data",
    };
  }

  return redirect("/dashboard/products");
}
