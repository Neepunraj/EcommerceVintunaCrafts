import Cookies from "js-cookie";

export const addtoCart = async (formdata: any) => {
  try {
    const res = await fetch("http://localhost:3000/api/cart/add-to-cart", {
      method: "POST",
      headers: {
        "contnet-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formdata),
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartITems = async (id: any) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/cart/all-cart-items?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCart = async (id: any) => {
  try {
    const response = await fetch(`api/delete-from-cart?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
