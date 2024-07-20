interface IChatBubble {
  direction: "left" | "right";
}

function ChatBubble(props: IChatBubble) {
  const { direction } = props;
  return (
    <div className={`chat ${direction === "left" ? "chat-start" : "chat-end"}`}>
      <div className="chat-bubble">
        It's over Anakin,
        <br />
        I have the high ground.
      </div>
    </div>
  )
}

export default ChatBubble;