import { TEdit } from "@/types";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/FormCategory";
import { getCategoryById } from "../../lib/data";

const EditPage = async ({ params }: TEdit) => {
  const data = await getCategoryById(params.id);

  if (!data) {
    return redirect("/dashboard/categories");
  }

  return <FormCategory type="EDIT" data={data} />;
};

export default EditPage;
