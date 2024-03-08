import React from "react";
import "./chatBodyMessage.scss";
import { auth } from "../../firebase";
const ChatBodyMessage = ({ message }) => {
  const currentUserID = auth.currentUser.uid;

  if (message.userId === currentUserID) {
    if (message.message !== null) {
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
        <div className="sent-message">
          <div className="image-message-content">
            <img className="image-message" src={message.image} alt="" />
            <p className="date">{message.messageTime}</p>
          </div>
        </div>
      );
    }
  } else {
    if (message.message !== null) {
      return (
        <div className="incoming-message">
          <img className="logo" src={message.userLogo} alt="" />
          <div className="message-content">
            <p className="sender">{message.userName}</p>
            <p className="body-message">{message.message}</p>
            <p className="date">{message.messageTime}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="incoming-message">
          <img className="logo" src={message.userLogo} alt="" />
          <div className="image-message-content">
            <p className="sender">{message.userName}</p>
            <img className="image-message" src={message.image} alt="" />
            <p className="date">{message.messageTime}</p>
          </div>
        </div>
      );
    }
  }
};

export default ChatBodyMessage;
