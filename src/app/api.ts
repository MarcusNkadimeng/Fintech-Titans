import axios from "axios";

const chats = [
  
]

export const chat = (msg: string, id: string | null, postFn: any) => async () => {
      const { data } = await axios.post("https://investecapi.nebulon.co.za/Chat/Chat", id ? {
        "chatMessage": msg,
        "chatSessionId": id,
      } : { "chatMessage": msg });
      postFn(data.resultValue.chatSessionId, data.resultValue.chatMessage);
      return data;
    }