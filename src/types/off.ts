export type Off = {
  _id: string;
  code: string;
  max: number;
  discount: number;
  use: number;
  user: string[];
  createdAt: string;
};

export type OffFormValues = {
  off: string;
  max: number;
  discount: number;
  product: string;
};

export type OffListItem = Omit<Off, "user">;
