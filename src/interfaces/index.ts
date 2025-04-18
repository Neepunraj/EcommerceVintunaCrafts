import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface NavOptions {
  id: string;
  label: string;
  path: string;
}

export interface NavITems {
  isAdminView: boolean;
  router: AppRouterInstance;
  isModalView: boolean;
}

export interface InputComponettypes {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  placeholder: string;
}

export interface Selectoptions {
  id: string;
  label: string;
}
export interface RegistrationformControls {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  options?: Selectoptions[];
}
export interface LoginFormControls {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
}
export interface SelectComponentProps {
  options?: Selectoptions[];
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}
export interface UserDataProps {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface LoginUserProps {
  email: string;
  password: string;
}
export type Size = {
  id: string;
  label: string;
};
export type ProductDataType = {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: Size[];
  deliveryInfo: string;
  onSale: "yes" | "no";
  imageUrl: string;
  priceDrop: number;
};
export const initialProductFormData: ProductDataType = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};
export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: Size[];
  deliveryInfo: string;
  onSale: "yes" | "no";
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  priceDrop: number;
};

export interface productType {
  item: Product;
}
