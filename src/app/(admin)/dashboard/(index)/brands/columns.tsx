"use client";

import DeleteButton from "@/app/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteBrand } from "./lib/actions";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Brand",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(brand.logo)}
            width={80}
            height={80}
            alt="Brand"
          />
          <span>{brand.name}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="flex space-x-3">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
              <Edit className="w-4 h-4" /> Edit
            </Link>
          </Button>
          <DeleteButton id={brand.id} action={deleteBrand} />
        </div>
      );
    },
  },
];
