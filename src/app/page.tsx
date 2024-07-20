import ChatBubble from "./ChatBubble";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

export default function Home() {
  return (
    <div className=" bg-Gray">
      <Navbar />
      <main>
        <div className="max-h-full w-full p-4">
          <ChatBubble direction="right" />
          <ChatBubble direction="left" />
        </div>
        <div className="w-full absolute bottom-0 m-4 flex flex-row">
          <input type="text" placeholder="Type here" className="input input-bordered w-11/12" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 self-center">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>


        </div>
    
      </main>
    </div>
  );
}
