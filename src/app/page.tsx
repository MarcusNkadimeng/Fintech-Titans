import ChatBubble from "./ChatBubble";
import Navbar from "./NavBar";
import SearchBar from "./SearchBar";

export default function Home() {
  return (
    <div>
      <Navbar />
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
