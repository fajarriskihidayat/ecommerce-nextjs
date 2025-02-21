import RadioItem from "./RadioItem";

const FilterStock = () => {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Stocks</p>
      <RadioItem type="stock" id="" value="All" defaulChecked={true} />
      <RadioItem type="stock" id="ready" value="Ready Stock" />
      <RadioItem type="stock" id="preorder" value="Pre Order" />
      {/* <CheckboxItem type="stock" id={"ready"} value="Ready Stock" />
      <CheckboxItem type="stock" id={"preorder"} value="Pre Order" /> */}
    </div>
  );
};

export default FilterStock;
