import React, { useEffect, useState } from "react";
import "./chatBody.scss";
import ChatBodyMessage from "./ChatBodyMessage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ChatBody = ({ roomId, resetChatBody }) => {
  const [messages, setMessages] = useState();

  const messagesRef = collection(db, "messages");
  console.log(messages);
  const getAllMessageFunc = async () => {
    try {
      const messagesData = await getDocs(messagesRef);
      const takeMessages = messagesData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (takeMessages) {
        const newArray = takeMessages.filter(
          (message) => message.roomId === roomId
        );
        if (newArray) {
          newArray.sort((a, b) => a.messageOrder - b.messageOrder);

          setMessages(newArray);
          console.log(newArray);
        }
      }
    } catch (err) {
      console.log("Mesajları getirirken hata oldu:" + err);
    }
  };

  // const takeMessagesFunc = async () => {
  //   const unsubscribe = collection("messages").onSnapshot((snapshot) => {
  //     const updatedMessages = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setMessages(updatedMessages);
  //   });

  //   return () => unsubscribe();
  // };

  useEffect(() => {
    getAllMessageFunc();
  }, []);

  useEffect(() => {
    getAllMessageFunc();
  }, [resetChatBody]);

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
