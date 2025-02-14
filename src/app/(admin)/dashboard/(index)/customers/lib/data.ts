import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "customer",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    const response: TColumn[] = customers.map((item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        total_transactions: item._count.orders,
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
