"use client";
import { createChatDeep } from "@/services/chatwithdeep";
import React, { useState } from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatresponse] = useState("");
  async function handleSubmit() {
    const res = await createChatDeep(chatQuery);
    console.log(res);
  }
  return (
    <div className="flex  justify-between p-4">
      <div className="">
        <h2 className="text-xl font-bold">Chat</h2>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-2xl font-medium">Inputs</p>
        <div className="">
          <input
            type="text"
            placeholder="Write a chat"
            onChange={(e) => setChatQuery(e.target.value)}
            value={chatQuery}
          />
          <button
            onClick={handleSubmit}
            className="text-white bg-black px-3 py-2"
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
