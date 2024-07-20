"use client";

import { createJSONStorage, persist } from "zustand/middleware";

import ChatBubble from "./ChatBubble";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { create } from "zustand";

interface IHomeStore {
  chatId: null | string;
  chats: any[];
  setChatId: (chatId: string) => void;
  clearChatId: () => void;
}

const useHomeStore = create<IHomeStore>()(
  persist(
    (set, get) => ({
      chatId: null,
      chats: [],
      setChatId: (chatId) => set({
        chatId: chatId,
      }),
      clearChatId: () => set({ chatId: null })
    }),
    {
      name: "homestore",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default function Home() {
  const chatId = useHomeStore((state) => state.chatId);
  const setChatId = useHomeStore((state) => state.setChatId);
  const clearChatId = useHomeStore((state) => state.clearChatId);
  return (
    <div>
      <Navbar />
      {chatId}
      <button className="btn" onClick={() => setChatId("test")}>Set Chat</button>
      <button className="btn btn-outline" onClick={() => clearChatId()}>Clear Chat</button>
      <main>
        <div className="max-h-full max-w-screen-xl">
          <ChatBubble direction="right" />
          <ChatBubble direction="left" />
        </div>
        <SearchBar />
      </main>
    </div>
  );
}
