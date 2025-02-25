import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        images: true,
        price: true,
        stock: true,
        created_at: true,
        _count: {
          select: {
            orders: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    const response_products: TColumn[] = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        stock: product.stock,
        price: Number(product.price),
        total_sales: product._count.orders,
        brand_name: product.brand.name,
        category_name: product.category.name,
        image_url: product.images[0],
        createdAt: product.created_at,
      };
    });

    return response_products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductById = async (id: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id },
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};
