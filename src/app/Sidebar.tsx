import React, { useState } from 'react';

import { useHomeStore } from "./page";

const Sidebar = () => {
  // State to manage the open/close state of the sidebar
  const { isSidebarOpen, messages, setChatId, chatId, setIsSidebarOpen } = useHomeStore((state) => state);

  return isSidebarOpen ? (
    <ul className="menu menu-md bg-slate-200 rounded-box w-96 absolute left-2 top-16 z-10 shadow-2xl">
      {Object.entries(messages).length > 0 ? Object.entries(messages).map(((msg: any) => {
        const msgChatId = msg[0];
        const msgs = messages[msg[0]];
        const lastMsg = msgs[msgs.length - 1];
        const isActive = chatId === msgChatId;
        return (<li><a onClick={() => { setChatId(msgChatId); setIsSidebarOpen(false); }} className={`${isActive ? "active" : ""}`}>{msgChatId} - {lastMsg.slice(0, 20)}</a></li>)
      })) : <li className="disabled"><a>No chats found</a></li>}
    </ul>
  ) : null;
};

export default Sidebar;