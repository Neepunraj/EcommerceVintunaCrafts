export const generateChat = async (payload: {
  theme: string;
  token: string;
}) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
      body: JSON.stringify({ theme: payload.theme }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
