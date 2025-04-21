"use client";

import {
  initialProductFormData,
  LoginUserProps,
  Product,
  ProductDataType,
  productType,
} from "@/interfaces";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

export type GlobalContextType = {
  showNavModal: boolean;
  setShowNavModal: (value: boolean) => void;
  product: ProductDataType;
  setProduct: (item: ProductDataType) => void;
  pagelevelLoader: boolean;
  setPageLevelLoader: (value: boolean) => void;
  user: UserProps;
  setUser: (user: UserProps) => void;
  isAuthUser: boolean;
  setIsAuthUser: (value: boolean) => void;
  componentLevelLoader: LoadingProps;
  setComponentLevelLoader: (loadin: LoadingProps) => void;
  productToUpdate: ProductDataType | null;
  setProductToUpdate: (item: ProductDataType | null) => void;
  showCartModal: boolean;
  setShowCartModal: (value: boolean) => void;
  cartItems: any[];
  setCartItems: (item: any) => void;
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
interface LoadingProps {
  loading: boolean;
  id: string;
}
export const initalLoading = {
  loading: false,
  id: "",
};

const defaultContextValue: GlobalContextType = {
  showNavModal: false,
  setShowNavModal: () => {},
  product: initialProductFormData,
  setProduct: () => {},
  pagelevelLoader: false,
  setPageLevelLoader: () => {},
  user: initialUser,
  setUser: () => {},
  isAuthUser: false,
  setIsAuthUser: () => {},
  componentLevelLoader: initalLoading,
  setComponentLevelLoader: () => {},
  productToUpdate: initialProductFormData,
  setProductToUpdate: () => {},
  showCartModal: false,
  setShowCartModal: () => {},
  cartItems: [],
  setCartItems: () => {},
};

export const GlobalContext =
  createContext<GlobalContextType>(defaultContextValue);
const GlobalState: FC<GlobbalStateProps> = ({ children }) => {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDataType>(
    initialProductFormData
  );
  const [productToUpdate, setProductToUpdate] =
    useState<ProductDataType | null>(null);
  const [pagelevelLoader, setPageLevelLoader] = useState<boolean>(false);
  const [componentLevelLoader, setComponentLevelLoader] =
    useState(initalLoading);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

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
        componentLevelLoader,
        setComponentLevelLoader,
        productToUpdate,
        setProductToUpdate,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
