import { DataTable } from "@/app/(admin)/dashboard/(index)/_components/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import { columns } from "./columns";
import { getOrders } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Orders",
};

const OrdersPage = async () => {
  const orders = await getOrders();

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Manage your orders and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={orders} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
