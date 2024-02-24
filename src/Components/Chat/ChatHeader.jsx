import React from "react";
import "./chatHeader.scss";
import { IoMdSearch } from "react-icons/io";
import { PiPaperclipThin } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";

const ChatHeader = ({ room }) => {
  if (room[0]) {
    return (
      <div className="chat-header">
        <div className="chat-header-left">
          <img src={room[0].logo} alt="" />
          <div className="chat-info">
            <p className="chat-title">{room[0].name}</p>
          </div>
        </div>
        <div className="chat-header-icons">
          <IoMdSearch className="icon" />
          <PiPaperclipThin className="icon" />
          <IoMdMore className="icon" />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ChatHeader;
