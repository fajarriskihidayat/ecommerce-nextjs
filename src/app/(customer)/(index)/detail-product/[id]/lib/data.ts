import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { getImageUrl } from "@/lib/supabase";

export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            orders: true,
          },
        },
        images: true,
        price: true,
        description: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      return redirect("/");
    }

    return {
      ...product,
      images: product.images.map((item) => {
        return getImageUrl(item, "products");
      }),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
