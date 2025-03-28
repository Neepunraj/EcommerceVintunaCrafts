"use client";
import Navbar from "@/component/navbar";
import { createContext, FC, ReactNode, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}
export type GlobalContextType = {
  showNavModal: boolean;
  setShowNavModal: (value: boolean) => void;
  product: Product[];
  setProduct: (products: Product[]) => void;
};
interface GlobbalStateProps {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);
const GlobalState: FC<GlobbalStateProps> = ({ children }) => {
  const [showNavModal, setShowNavModal] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        product,
        setProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
