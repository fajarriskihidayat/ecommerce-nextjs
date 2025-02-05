"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./_components/DeleteButton";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex space-x-3">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/dashboard/categories/edit/${category.id}`}>
              <Edit className="w-4 h-4" /> Edit
            </Link>
          </Button>
          <DeleteButton id={category.id} />
        </div>
      );
    },
  },
];
