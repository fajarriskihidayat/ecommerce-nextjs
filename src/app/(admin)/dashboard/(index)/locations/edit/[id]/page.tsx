import { redirect } from "next/navigation";
import { getLocationById } from "../../lib/data";
import FormLocation from "../../_components/FormLocation";

type TParams = {
  id: string;
};

interface EditPageProps {
  params: TParams;
}

const EditPage = async ({ params }: EditPageProps) => {
  const data = await getLocationById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }

  return <FormLocation type="EDIT" data={data} />;
};

export default EditPage;
