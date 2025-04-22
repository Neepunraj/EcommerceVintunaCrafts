"use client";

import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartITems } from "@/services/cart";
import React, { Fragment, useContext, useEffect } from "react";
import CommonModal from "../commonModal";
import { CartItem } from "@/interfaces";
import ComponentLevelLoader from "../loader/componentlevel";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function CartModal() {
  const {
    user,
    cartItems,
    setCartItems,
    setShowCartModal,
    showCartModal,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  async function extractAllCartITems() {
    const res = await getAllCartITems(user._id);
    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item: any) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }
  }
  useEffect(() => {
    if (user !== null) extractAllCartITems();
  }, [user]);

  async function handleDeletFromCart(cartID: any) {
    console.log(cartID);
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await deleteFromCart(cartID);

    if (res.success) {
      toast.success(res.message, { position: "top-right" });
      setComponentLevelLoader({ loading: false, id: cartID });
      extractAllCartITems();
    } else {
      toast.error(res.message, { position: "top-right" });
      setComponentLevelLoader({ loading: false, id: cartID });
    }
  }

  return (
    <CommonModal
      showModalTitle={true}
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem: CartItem) => (
              <li key={cartItem._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={cartItem && cartItem.productID.imageUrl}
                    alt="product image in cart"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="">
                    <div className="">
                      <h3>
                        <a>
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.name}
                        </a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      $
                      {cartItem &&
                        cartItem.productID &&
                        cartItem.productID.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-between text-sm">
                    <button
                      onClick={() => handleDeletFromCart(cartItem._id)}
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2"
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === cartItem._id ? (
                        <ComponentLevelLoader
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                          text={"Removing"}
                          color={"#c7a81f"}
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
            type="button"
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Go to Cart
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            onClick={() => {
              router.push("/checkout");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-grey">
              Continue Shopping
            </button>
          </div>
        </Fragment>
      }
    />
  );
}

export default CartModal;
