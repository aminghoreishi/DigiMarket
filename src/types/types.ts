export type Brand = {
  _id: string;
  title: string;
  img: string;
};

export type GetBrandsResponse = {
  brands: Brand[];
  totalPages: number;
};
