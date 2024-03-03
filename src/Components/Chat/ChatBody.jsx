import React, { useEffect, useState } from "react";
import "./chatBody.scss";
import ChatBodyMessage from "./ChatBodyMessage";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import chatBg from "../../images/chat-bg2.png";

const ChatBody = () => {
  const [messages, setMessages] = useState();
  const reduxRoomId = useSelector((state) => state.roomId.id);

  const getAllMessagesFunc = () => {
    const messagesRef = collection(db, "messages");
    const queryMessages = query(
      messagesRef,
      where("roomId", "==", reduxRoomId)
    );
    onSnapshot(queryMessages, (snapShot) => {
      const newArray = [];
      snapShot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      if (newArray) {
        newArray.sort((a, b) => a.messageOrder - b.messageOrder);
        setMessages(newArray);
      }
    });
  };

  useEffect(() => {
    getAllMessagesFunc();
  }, [reduxRoomId]);

  return (
    <div className="chat-body">
      {messages
        ? messages.map((message, index) => (
            <ChatBodyMessage message={message} key={index} />
          ))
        : null}
    </div>
  );
};

export default ChatBody;
