import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const response: TColumn[] = orders.map((item) => {
      return {
        id: item.id,
        customer_name: item.user.name,
        price: Number(item.total),
        products: item.products?.map((val) => {
          return {
            name: val.product.name,
            image: getImageUrl(val.product.images[0]),
          };
        }),
        status: item.status,
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
