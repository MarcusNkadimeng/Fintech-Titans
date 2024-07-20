"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createJSONStorage, persist } from "zustand/middleware";

import Chats from "./Chats";
import Messages from "./Messages";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { create } from "zustand";

const queryClient = new QueryClient();

interface IHomeStore {
  chatId: null | string;
  chats: any[];
  messages: any;
  search: string;
  isSidebarOpen: boolean;
  setChatId: (chatId: string) => void;
  clearChatId: () => void;
  setSearch: (str: string) => void;
  setMessage: (id: string, message: any) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const useHomeStore = create<IHomeStore>()(
  persist(
    (set, get) => ({
      chatId: null,
      chats: [],
      messages: [],
      search: "",
      isSidebarOpen: false,
      setChatId: (chatId) => set({
        chatId: chatId,
      }),
      clearChatId: () => set({ chatId: null }),
      setSearch: (search: string) => set((state) => ({
        ...state,
        search,
      })),
      setMessage: (id: string, message: any) => set((state) => ({
        ...state,
        chatId: id,
        search: "",
        messages: {
          ...state.messages,
          [id]: state.messages[id] ? state.messages[id].concat([state.search, message]) : [state.search, message],
        },
      })),
      setIsSidebarOpen: (isOpen: boolean) => set((state) => ({
        ...state,
        isSidebarOpen: isOpen,
      }))
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
    <QueryClientProvider client={queryClient}>
      <div className="h-screen">
        <Navbar />
        <Sidebar />
        <main className="min-h-full w-full p-4">
          <Messages />
          <SearchBar />
        </main>
      </div>
    </QueryClientProvider>
  );
}
