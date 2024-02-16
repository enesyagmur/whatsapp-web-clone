import React from "react";
import "./chat.scss";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <div className="user-info">
          <img
            src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <p>Berkay</p>
        </div>
        <div className="chat-icons">
          <BsCameraVideoFill className="icon" />
          <IoMdMore className="icon" />
        </div>
      </div>

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
