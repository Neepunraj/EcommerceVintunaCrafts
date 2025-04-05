import { NavOptions, RegistrationformControls } from "@/interfaces";

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
    label: "kids",
    path: "/product/listing/kids",
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
