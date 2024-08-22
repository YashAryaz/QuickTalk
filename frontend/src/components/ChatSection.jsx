import React, { useState } from "react";
import "./ChatSection.css";
import Chat from "../assets/newchat.svg";
import filter from "../assets/filter.svg";
import SearchIcon from "../assets/searchicon.svg";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import GetConversations from "../hooks/GetConversations";

function ChatSection() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { conversations } = GetConversations();

  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter conversations based on the search query
  const filteredConversations = conversations.filter((conversation) =>
    conversation.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  console.log(filteredConversations);
  return (

    <div className="Chat-Section">
      <div className="Chat-Section-Header">
        <div className="text-class">Chats</div>
        <img src={Chat} className="Chat-logo" alt="logo" />
        <img src={filter} className="Chat-logo" alt="logo" />
      </div>

      <div className="Chat-Search">
        <img src={SearchIcon} className="search-logo" alt="logo" />
        <input
          type="text"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="Chat-Body">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation._id}
            className={`Chat-Section-Body ${
              selectedConversation?._id === conversation._id ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedConversation(conversation);
              setSelected(true);
            }}

          >
            <div className="Contact">
              <img
                src={conversation.profilePic}
                className="profile-logo"
                alt="logo"
              />
            </div>
            <div className="Contact-Info">
              <div className="Contact-Name">{conversation.username}</div>
              <div className="Contact-Message">{conversation.mostrecentmessage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSection;
