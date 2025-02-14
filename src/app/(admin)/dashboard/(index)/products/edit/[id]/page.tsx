import { TEdit } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBrands } from "../../../brands/lib/data";
import { getCategories } from "../../../categories/lib/data";
import { getLocations } from "../../../locations/lib/data";
import FormProduct from "../../_components/FormProduct";
import { getProductById } from "../../lib/data";
import { redirect } from "next/navigation";

const EditPage = async ({ params }: TEdit) => {
  const product = await getProductById(+params.id);
  const brands = await getBrands();
  const categories = await getCategories();
  const locations = await getLocations();

  if (!product) {
    return redirect("/dashboard/products");
  }

  return (
    <FormProduct type="EDIT" data={product}>
      <div className="grid gap-3">
        <Label htmlFor="category">Category</Label>
        <Select
          name="category_id"
          defaultValue={product.category_id.toString()}
        >
          <SelectTrigger id="category" aria-label="Select category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((item, i) => (
              <SelectItem value={`${item.id}`} key={i}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="brand">Brand</Label>
        <Select name="brand_id" defaultValue={product.brand_id.toString()}>
          <SelectTrigger id="brand" aria-label="Select brand">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands?.map((item, i) => (
              <SelectItem value={`${item.id}`} key={i}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="location">Location</Label>
        <Select
          name="location_id"
          defaultValue={product.location_id.toString()}
        >
          <SelectTrigger id="brand" aria-label="Select location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((item, i) => (
              <SelectItem value={`${item.id}`} key={i}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  );
};

export default EditPage;
