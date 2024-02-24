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
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const ChatMessageSend = ({ roomId, setResetChatBody, resetChatBody }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [countState, setCountState] = useState([]);

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
        const newArray = [];
        newArray.push(count[0].id);
        newArray.push(count[0].count);

        setCountState(newArray);
      }
    } catch (err) {
      console.log("Counter ı çekerken hata oldu:" + err);
    }
  };

  const changeCountFunc = async () => {
    const counterDoc = doc(db, "counter", countState[0]);
    try {
      await updateDoc(counterDoc, { count: countState[1] + 1 });
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
        messageOrder: countState[1],
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userLogo: auth.currentUser.photoURL,
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
