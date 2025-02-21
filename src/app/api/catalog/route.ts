import { TFilter } from "@/hooks/useFilter";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { TProduct } from "@/types";
import { getImageUrl } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const res = (await request.json()) as TFilter;

    const ORQuery: Prisma.ProductWhereInput[] = [];

    if (res.search && res.search !== "") {
      ORQuery.push({
        name: {
          contains: res.search,
          mode: "insensitive", // tidak ngaruh huruf besar kecil
        },
      });
    }

    if (res.minPrice && res.minPrice > 0) {
      ORQuery.push({
        price: {
          // lebih besar atau sama dengan
          gte: res.minPrice,
        },
      });
    }

    if (res.maxPrice && res.maxPrice > 0) {
      ORQuery.push({
        price: {
          // lebih kecil atau sama dengan
          lte: res.maxPrice,
        },
      });
    }

    if (res.stock && res.stock.length > 0) {
      ORQuery.push({
        stock: {
          // sama dengan
          equals: res.stock,
        },
      });
    }

    if (res.brands && res.brands.length > 0) {
      ORQuery.push({
        brand: {
          id: {
            // mencari id didalam array
            in: res.brands,
          },
        },
      });
    }

    if (res.categories && res.categories.length > 0) {
      ORQuery.push({
        category: {
          id: {
            // mencari id didalam array
            in: res.categories,
          },
        },
      });
    }

    if (res.locations && res.locations.length > 0) {
      ORQuery.push({
        location: {
          id: {
            // mencari id didalam array
            in: res.locations,
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
      select: {
        id: true,
        images: true,
        name: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const response: TProduct[] = products.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: Number(item.price),
        category_name: item.category.name,
        thumbnail: getImageUrl(item.images[0], "products"),
      };
    });

    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json({ status: false }, { status: 500 });
  }
}
