import { LoginUserProps } from "@/interfaces";
import { cookies } from "next/headers";

export const login = async (formData: LoginUserProps) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "unexpected Error During Login ");
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error fetching Login Details", error);
    return { success: false, message: error.message || "Error during login." };
  }
};
