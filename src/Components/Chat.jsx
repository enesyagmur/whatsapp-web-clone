import React from "react";
import "./chat.scss";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <p>Berkay</p>
        <div className="chat-icons">
          <BsCameraVideoFill />
          <IoMdMore />
        </div>
      </div>
    </div>
  );
};

export default Chat;
