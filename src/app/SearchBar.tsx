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

  return <div className="absolute bottom-0 left-0 right-0 m-4 flex flex-row justify-between">
    <input type="text" placeholder="Type here" className="input input-bordered w-full mr-3" value={input} onChange={(e) => { setInput(e.target.value); }} />
    <button className="btn" onClick={() => { setSearch(input); setInput(""); }} disabled={isFetching}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      Search
    </button>
  </div>
}
export default SearchBar;