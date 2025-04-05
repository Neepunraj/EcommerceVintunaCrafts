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
  pagelevelLoader: boolean;
  setPageLevelLoader: (value: boolean) => void;
};
interface GlobbalStateProps {
  children: ReactNode;
}
const defaultContextValue: GlobalContextType = {
  showNavModal: false,
  setShowNavModal: () => {},
  product: [],
  setProduct: () => {},
  pagelevelLoader: false,
  setPageLevelLoader: () => {},
};

export const GlobalContext =
  createContext<GlobalContextType>(defaultContextValue);
const GlobalState: FC<GlobbalStateProps> = ({ children }) => {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [pagelevelLoader, setPageLevelLoader] = useState<boolean>(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUSer] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        product,
        setProduct,
        pagelevelLoader,
        setPageLevelLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
