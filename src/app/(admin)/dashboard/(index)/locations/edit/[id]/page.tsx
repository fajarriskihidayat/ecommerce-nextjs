import { TEdit } from "@/types";
import { redirect } from "next/navigation";
import FormLocation from "../../_components/FormLocation";
import { getLocationById } from "../../lib/data";

const EditPage = async ({ params }: TEdit) => {
  const data = await getLocationById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }

  return <FormLocation type="EDIT" data={data} />;
};

export default EditPage;
