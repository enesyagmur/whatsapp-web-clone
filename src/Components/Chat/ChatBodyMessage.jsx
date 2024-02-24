import React from "react";
import "./chatBodyMessage.scss";
import { auth } from "../../firebase";
const ChatBodyMessage = ({ message }) => {
  const currentUserID = auth.currentUser.uid;

  if (message.userId === currentUserID) {
    return (
      <div className="sent-message">
        <div className="message-content">
          <p className="body-message">{message.message}</p>
          <p className="date">{message.messageTime}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="incoming-message">
        <img src={message.userLogo} alt="" />
        <div className="message-content">
          <p className="sender">{message.userName}</p>
          <p className="body-message">{message.message}</p>
          <p className="date">{message.messageTime}</p>
        </div>
      </div>
    );
  }
};

export default ChatBodyMessage;
