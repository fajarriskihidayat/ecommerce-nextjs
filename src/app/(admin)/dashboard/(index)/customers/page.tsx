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
import { getCustomers } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Customers",
};

const CustomersPage = async () => {
  const customers = await getCustomers();

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            Manage your customers and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={customers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
