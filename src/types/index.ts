export type ActionResult = {
  error: string;
};

type TParams = {
  id: string;
};

export type TEdit = {
  params: TParams;
};

export type TProduct = {
  id: number;
  thumbnail: string;
  name: string;
  category_name: string;
  price: number;
};
