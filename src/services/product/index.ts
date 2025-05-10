import Cookies from "js-cookie";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
export const AddNewPrdocut = async (formData: any) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "unexpected Error During  Adding Product "
      );
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllAdminProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/all-products`, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "unexpected Error During  Adding Product "
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (formData: any) => {
  try {
    const response = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteProduct = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/delete-product?id=${id}`, {
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

export const productById = async (id: any) => {
  try {
    const resp = await fetch(
      `${API_BASE_URL}/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (id: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
