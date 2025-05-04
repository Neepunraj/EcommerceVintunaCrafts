"use client";

import {
  CartItem,
  initialProductFormData,
  LoginFormControls,
  LoginUserProps,
  OrderDataType,
  OrderDetailsDataType,
  Product,
  ProductDataType,
  productType,
  ShippingAddressType,
} from "@/interfaces";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

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
  cartItems: CartItem[];
  setCartItems: (item: CartItem[]) => void;
  addresses: ShippingAddressType[];
  setAddresses: (addressDetails: ShippingAddressType[]) => void;
  addressFromData: ShippingAddressType;
  setAddressFormData: (formdata: ShippingAddressType) => void;
  checkOutFormData: OrderDataType;
  setCheckOutFormData: (item: OrderDataType) => void;
  orderDetails: OrderDetailsDataType;
  setOrderDetails: (item: OrderDetailsDataType) => void;
  allOrdersForUsers: OrderDataType[];
  setAllOrderForUsers: (item: OrderDataType[]) => void;
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
export const initialAddress: ShippingAddressType = {
  fullName: "",
  city: "",
  country: "",
  postalCode: "",
  address: "",
};
export const intialCheckoutFormData: OrderDataType = {
  shippingAddress: initialAddress,
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

const initialOrderDetails: OrderDetailsDataType = {
  _id: "",
  shippingAddress: initialAddress,
  orderItems: [],
  paymentMethod: "",
  isPaid: false,
  paidAt: "",
  isProcessing: false,
  totalPrice: 0,
  createdAt: "",
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
  addresses: [],
  setAddresses: () => {},
  addressFromData: initialAddress,
  setAddressFormData: () => {},
  checkOutFormData: intialCheckoutFormData,
  setCheckOutFormData: () => {},
  orderDetails: initialOrderDetails,
  setOrderDetails: () => {},
  allOrdersForUsers: [],
  setAllOrderForUsers: () => {},
};
const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];
const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

export const GlobalContext =
  createContext<GlobalContextType>(defaultContextValue);

const GlobalState: FC<GlobbalStateProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [addresses, setAddresses] = useState<ShippingAddressType[]>([]);
  const [addressFromData, setAddressFormData] =
    useState<ShippingAddressType>(initialAddress);
  const [checkOutFormData, setCheckOutFormData] = useState<OrderDataType>(
    intialCheckoutFormData
  );
  const [orderDetails, setOrderDetails] =
    useState<OrderDetailsDataType>(initialOrderDetails);
  const [allOrdersForUsers, setAllOrderForUsers] = useState<OrderDataType[]>(
    []
  );

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
  /*  useEffect(() => {
    if (
      protectedRoutes.some((route) => pathname.includes(route)) &&
      pathname &&
      pathname !== "/register" &&
      !pathname.includes("product") &&
      pathname !== "/" &&
      user &&
      Object.keys(user).length > 0
    ) {
      router.push("/login");
    }
  }, [pathname, user]); */

  /*  useEffect(() => {
    if (
      protectedAdminRoutes.indexOf(pathname) > -1 &&
      user !== null &&
      user &&
      Object.keys(user).length === 0 &&
      user.role !== "admin"
    )
      router.push("/login");
  }, [user, pathname]); */
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
        addresses,
        setAddresses,
        addressFromData,
        setAddressFormData,
        checkOutFormData,
        setCheckOutFormData,
        orderDetails,
        setOrderDetails,
        allOrdersForUsers,
        setAllOrderForUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
