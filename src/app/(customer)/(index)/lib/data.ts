import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        images: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const response = products.map((item) => {
      return {
        ...item,
        thumbnail: getImageUrl(item.images[0], "products"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        logo: true,
      },
    });

    const response = brands.map((item) => {
      return {
        thumbnail: getImageUrl(item.logo),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
