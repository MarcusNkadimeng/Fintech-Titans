import axios from "axios";
import { chat } from "./api";
import { create } from "zustand";
import { useHomeStore } from "./page";
import { useQuery } from "@tanstack/react-query";

const useSearchStore = create((set) => ({
  input: "",
  setInput: (str: string) => set((state: any) => ({
    ...state,
    input: str,
  })),
}));

function SearchBar() {
  const { chatId } = useHomeStore((state) => state);
  const { input, setInput } = useSearchStore((state: any) => state);
  const { search, setSearch } = useHomeStore((state) => state);

  const { isFetching } = useQuery({
    queryKey: ['message', search], queryFn: chat(search, chatId, () => { }),
    enabled: !!search,
    retry: 0,
  });

  return <div className="my-4 flex flex-row justify-between">
    <input type="text" placeholder="Type here" className="input input-bordered w-full mr-3" value={input} onChange={(e) => { setInput(e.target.value); }} />
    <button className="btn" onClick={() => { setSearch(input); setInput(""); }} disabled={isFetching}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
      Send
    </button>
  </div>
}
export default SearchBar;