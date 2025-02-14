"use client";

import DeleteButton from "@/app/(admin)/dashboard/(index)/_components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { deleteLocation } from "./lib/actions";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const location = row.original;

      return (
        <div className="flex space-x-3">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/dashboard/locations/edit/${location.id}`}>
              <Edit className="w-4 h-4" /> Edit
            </Link>
          </Button>
          <DeleteButton id={location.id} action={deleteLocation} />
        </div>
      );
    },
  },
];
