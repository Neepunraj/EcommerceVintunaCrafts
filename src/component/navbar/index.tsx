import { adminNavOptions, navOptions } from "@/utils";
import { Route } from "next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import { FC, Fragment, useContext, useState } from "react";
import CommonModal from "../commonModal";
import { GlobalContext, GlobalContextType } from "@/context";
interface NavITems {
  adminView: boolean;
  router: AppRouterInstance;
  isModalView: boolean;
}
const NavItems = ({ isModalView = false, adminView, router }: NavITems) => {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
    >
      <ul
        className={`flex gap-3  items-center flex-row p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {adminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 text-gray-900 rounded md:p-0"
                onClick={() => router.push(item.path)}
                key={item.id}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 text-gray-900 rounded md:p-0"
                onClick={() => router.push(item.path)}
                key={item.id}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
};

const Navbar: FC = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("MyComponent must be used within a GlobalProvider");
  }
  const { showNavModal, setShowNavModal } = context;
  const adminView = false;
  const isAuthUser = true;
  const user = {
    role: "admin",
  };
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <div
            className="flex itmes-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-2xl self-center font-semibold whitespace-nowrap text-gray-900">
              Ecommerce
            </span>
          </div>
          <div className="gap-2 justify-between flex md:order-2">
            {!adminView && isAuthUser ? (
              <Fragment>
                <button
                  className="
                  cursor-pointer
                   transition-transform transform
                  hover:scale-105
                mt-1.5 inline-block bg-black  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Account
                </button>
                <button
                  className="
                  cursor-pointer
                   transition-transform transform
                  hover:scale-105
                    mt-1.5 inline-block bg-black  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Cart
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              adminView ? (
                <button
                  className="
                cursor-pointer
                 transition-transform transform
                  hover:scale-105
                  mt-1.5 inline-block bg-black  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Client View
                </button>
              ) : (
                <button
                  className="
                cursor-pointer
                  mt-1.5 inline-block bg-black  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white 
                  transition-transform transform
                  hover:scale-105"
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                className="
              cursor-pointer
                mt-1.5 inline-block bg-black  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white 
                transition-transform transform
                hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <button
                className="
              cursor-pointer
                mt-1.5 inline-block bg-black  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white 
                transition-transform transform
                hover:scale-105"
              >
                Login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isModalView={false} router={router} adminView={adminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems isModalView={true} router={router} adminView={adminView} />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
};

export default Navbar;
