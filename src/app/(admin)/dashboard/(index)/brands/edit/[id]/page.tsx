import { TEdit } from "@/types";
import React from "react";
import { getBrandById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormBrand from "../../_components/FormBrand";

const EditPage = async ({ params }: TEdit) => {
  const brand = await getBrandById(params.id);

  if (!brand) {
    return redirect("/dashboard/brands");
  }

  return <FormBrand type="EDIT" data={brand} />;
};

export default EditPage;
