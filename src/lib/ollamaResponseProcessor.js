export const processOllamaResponse = async (ollamaResponse) => {
  let allResponseChunks = "";
  const validResponses = [];
  const reader = ollamaResponse.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = new TextDecoder().decode(value);
    allResponseChunks += chunk;

    const jsonResponse = JSON.parse(chunk || "{}");
    if (jsonResponse) {
      validResponses.push(jsonResponse);
    }
  }

  if (validResponses.length > 0) {
    return validResponses;
  }
  return { response: "No valid responses found." };
};
