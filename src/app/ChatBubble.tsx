interface IChatBubble {
  direction: "left" | "right";
  msg: string;
}

function ChatBubble(props: IChatBubble) {
  const { direction, msg } = props;
  const splitMsg = msg.split("-");
  return (
    <div className={`chat ${direction === "left" ? "chat-start" : "chat-end"}`}>
      <div className={`chat-bubble ${direction === "left" ? "bg-black" : "bg-slate-200 text-black"}`}>
        {msg.split("-").map((m) => <p>{m}</p>)}
      </div>
    </div>
  )
}

export default ChatBubble;