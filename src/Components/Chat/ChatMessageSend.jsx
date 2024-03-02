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
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const ChatMessageSend = ({ roomId }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [countValue, setCountValue] = useState();
  const [countId, setCountId] = useState();

  const takeInstantTimeFunc = () => {
    const time = new Date().toLocaleTimeString();
    const newArray = time.split(":");
    newArray.pop();
    const instantTime = newArray[0] + ":" + newArray[1];
    return instantTime;
  };

  const counterGetRealTimeFunc = () => {
    const counterRef = collection(db, "counter");
    const queryCounter = query(counterRef);
    onSnapshot(queryCounter, (snapShot) => {
      const counter = [];
      snapShot.forEach((doc) => {
        counter.push({ ...doc.data(), id: doc.id });
      });
      setCountValue(counter[0].count);
      setCountId(counter[0].id);
    });
  };

  const changeCountFunc = async () => {
    const counterDoc = doc(db, "counter", countId);
    try {
      await updateDoc(counterDoc, { count: countValue + 1 });
    } catch (err) {
      console.log("Counter ı güncellerken hata oldu " + err);
    }
  };

  const sendMessageFunc = async () => {
    const messageRef = collection(db, "messages");
    try {
      await addDoc(messageRef, {
        message: inputMessage,
        messageTime: takeInstantTimeFunc(),
        messageOrder: countValue,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userLogo: auth.currentUser.photoURL,
        roomId: roomId,
      });
      changeCountFunc();
      setInputMessage("");
    } catch (error) {
      console.log("Mesaj kayıt sırasında hata oluştu : " + error);
    }
  };

  useEffect(() => {
    counterGetRealTimeFunc();
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
