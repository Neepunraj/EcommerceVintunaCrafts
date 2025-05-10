import { error } from "console";
export const createChatDeep = async (message: string) => {
  try {
    const res = await fetch("api/chatwithdeep", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${message} `,
      },
      body: JSON.stringify(message),
    });
    console.log(message);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "request faild");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
