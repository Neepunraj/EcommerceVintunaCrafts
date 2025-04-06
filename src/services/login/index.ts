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
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error fetching Login Details", error);
  }
};
