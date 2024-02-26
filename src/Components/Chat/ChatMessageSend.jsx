import React, { useEffect, useState } from "react";
import "./chatMessageSend.scss";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const ChatMessageSend = ({ roomId, setResetChatBody, resetChatBody }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [countValue, setCountValue] = useState();
  const [countId, setCountId] = useState();

  const messagesRef = collection(db, "messages");
  const counterRef = collection(db, "counter");

  const takeInstantTimeFunc = () => {
    const time = new Date().toLocaleTimeString();
    const newArray = time.split(":");
    newArray.pop();
    const instantTime = newArray[0] + ":" + newArray[1];
    return instantTime;
  };

  const getCountFunc = async () => {
    try {
      const counter = await getDocs(counterRef);
      const count = counter.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (count) {
        setCountValue(count[0].count);
        setCountId(count[0].id);
      }
    } catch (err) {
      console.log("Counter ı çekerken hata oldu:" + err);
    }
  };

  const changeCountFunc = async () => {
    const counterDoc = doc(db, "counter", countId);
    try {
      await updateDoc(counterDoc, { count: countValue + 1 });
    } catch (err) {
      console.log("Counter ı güncellerken hata oldu " + err);
    }
    getCountFunc();
  };

  const sendMessageFunc = async () => {
    try {
      await addDoc(messagesRef, {
        message: inputMessage,
        messageTime: takeInstantTimeFunc(),
        messageOrder: countValue,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        roomId: roomId,
      });
      changeCountFunc();
      setInputMessage("");
      setResetChatBody(resetChatBody + 1);
    } catch (error) {
      console.log("Mesaj kayıt sırasında hata oluştu : " + error);
    }
  };

  useEffect(() => {
    getCountFunc();
  }, []);

  return (
    <div className="chat-send-message">
      <BsEmojiSmile />
      <input
        type="text"
        placeholder="Bir mesaj yazın"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      {inputMessage !== "" ? (
        <IoSend onClick={sendMessageFunc} />
      ) : (
        <FaMicrophone className="send-icon" />
      )}
    </div>
  );
};

export default ChatMessageSend;
