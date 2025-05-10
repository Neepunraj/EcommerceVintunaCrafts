import {
  LoginFormControls,
  NavOptions,
  RegistrationformControls,
} from "@/interfaces";

export const navOptions: NavOptions[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "listingMen",
    label: "Men",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Women",
    path: "/product/listing/women",
  },
  {
    id: "listingKids",
    label: "Kids",
    path: "/product/listing/kids",
  },
  {
    id: "souviners",
    label: "Souviners",
    path: "/product/listing/souviners",
  },
  {
    id: "lampshades",
    label: "Lampshades",
    path: "/product/listing/lampshades",
  },
];
export const adminNavOptions: NavOptions[] = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
];
export const registrationFormControls: RegistrationformControls[] = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your Name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your Email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your Password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "customer",
        label: "Customer",
      },
      {
        id: "admin",
        label: "Admin",
      },
    ],
  },
];

export const loginFormcontrols = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your Email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your Password",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter Description",
    label: "Description",
    componentType: "input",
  },

  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "kids",
      },
      {
        id: "souviers",
        label: "Souviners",
      },
      {
        id: "lampshades",
        label: "Lampshades",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },

  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter pricedrop ",
    label: "Price Drop",
    componentType: "input",
  },
];
export type SizeTypes = {
  id: string;
  label: string;
};
export const AvailableSizes: SizeTypes[] = [
  {
    id: "s",
    label: "S",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
];

export const addNewAddressFormControls: LoginFormControls[] = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your postal code",
    label: "Postal Code",
    componentType: "input",
  },
];
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "next-js-ecommerce-7404c.firebaseapp.com",
  projectId: "next-js-ecommerce-7404c",
  storageBucket: "next-js-ecommerce-7404c.appspot.com",
  messagingSenderId: "852369128878",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-1ZQMG041MG",
};
export const firebaseStorageURL = "gs://next-js-ecommerce-7404c.appspot.com";
/*  */
