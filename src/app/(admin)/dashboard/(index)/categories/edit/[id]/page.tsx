import React from "react";
import { getCategoryById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/FormCategory";

type TParams = {
  id: string;
};

interface EditPageProps {
  params: TParams;
}

const EditPage = async ({ params }: EditPageProps) => {
  const data = await getCategoryById(params.id);

  if (!data) {
    return redirect("/dashboard/categories");
  }

  return <FormCategory type="EDIT" data={data} />;
};

export default EditPage;
