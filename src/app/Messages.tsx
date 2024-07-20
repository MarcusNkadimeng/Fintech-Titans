import ChatBubble from "./ChatBubble";
import axios from "axios";
import { chat } from "./api";
import { useHomeStore } from "./page";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Messages() {
  const messages = useHomeStore((state) => state.messages);
  const chatId = useHomeStore((state) => state.chatId);
  const search = useHomeStore((state) => state.search);
  const setMessage = useHomeStore((state) => state.setMessage);

  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ['message', search], queryFn: chat(search, chatId, setMessage),
    enabled: !!search,
    retry: 0,
  });

  console.log(messages);

  if ((isFetching || isLoading) && !chatId) {
    return (
      <div className="flex my-4">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="flex my-4">
  //       <div role="alert" className="alert alert-error">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           className="h-6 w-6 shrink-0 stroke-current">
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  //         </svg>
  //         <span>{error.name} - {error.message}</span>
  //       </div>
  //     </div>
  //   )
  // }
  if (!chatId || !messages[chatId]?.length) {
    return (
      <div className="flex my-4">
        <div role="alert" className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Please send a message to start a chat</span>
        </div>
      </div>
    )
  }
  return <>
    {messages?.[chatId].map((value: string, indx: number) => (<ChatBubble direction={indx % 2 == 0 ? "right" : "left"} msg={value} />))}
    {isLoading ? <div className="flex my-4">
      <span className="loading loading-dots loading-lg"></span>
    </div> : null}
  </>
}