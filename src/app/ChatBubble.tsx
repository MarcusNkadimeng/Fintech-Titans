interface IChatBubble {
  direction: "left" | "right";
  msg: string;
}

function ChatBubble(props: IChatBubble) {
  const { direction, msg } = props;
  return (
    <div className={`chat ${direction === "left" ? "chat-start" : "chat-end"}`}>
      <div className="chat-bubble">
        {msg}
      </div>
    </div>
  )
}

export default ChatBubble;