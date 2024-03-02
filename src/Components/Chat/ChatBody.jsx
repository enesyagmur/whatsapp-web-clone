import React, { useEffect, useState } from "react";
import "./chatBody.scss";
import ChatBodyMessage from "./ChatBodyMessage";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useSelector } from "react-redux";

const ChatBody = ({ roomId, resetChatBody }) => {
  const [messages, setMessages] = useState();

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("roomId", "==", roomId));
    onSnapshot(queryMessages, (snapShot) => {
      let newArray = [];
      snapShot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setMessages(newArray);
    });
  }, []);

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
