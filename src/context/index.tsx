"use client";
import Navbar from "@/component/navbar";
import { LoginUserProps } from "@/interfaces";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
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
  user: UserProps;
  setUser: (user: UserProps) => void;
  isAuthUser: boolean;
  setIsAuthUser: (value: boolean) => void;
};
interface GlobbalStateProps {
  children: ReactNode;
}
interface UserProps {
  email: string;
  name: string;
  role: string;
  _id: string;
}
export const initialUser = {
  email: "",
  name: "",
  role: "",
  _id: "",
};
const defaultContextValue: GlobalContextType = {
  showNavModal: false,
  setShowNavModal: () => {},
  product: [],
  setProduct: () => {},
  pagelevelLoader: false,
  setPageLevelLoader: () => {},
  user: initialUser,
  setUser: () => {},
  isAuthUser: false,
  setIsAuthUser: () => {},
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
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData =
        JSON.parse(localStorage.getItem("user") as string) || initialUser;

      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser(initialUser);
    }
  }, [Cookies]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        product,
        setProduct,
        pagelevelLoader,
        setPageLevelLoader,
        user,
        setUser,
        isAuthUser,
        setIsAuthUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
