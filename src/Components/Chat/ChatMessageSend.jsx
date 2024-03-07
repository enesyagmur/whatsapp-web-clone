import React, { useEffect, useState } from "react";
import "./chatMessageSend.scss";
import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ChatMessageSend = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [countValue, setCountValue] = useState();
  const [countId, setCountId] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const messageRef = collection(db, "messages");

  const reduxRoomId = useSelector((state) => state.roomId.id);

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

  const sendTextMessageFunc = async () => {
    try {
      await addDoc(messageRef, {
        message: inputMessage,
        image: null,
        messageTime: takeInstantTimeFunc(),
        messageOrder: countValue,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userLogo: auth.currentUser.photoURL,
        roomId: reduxRoomId,
      });
      changeCountFunc();
      setInputMessage("");
    } catch (error) {
      console.log("Mesaj kayıt sırasında hata oluştu : " + error);
    }
  };

  const sendImageMessageFunc = async () => {
    try {
      await addDoc(messageRef, {
        message: null,
        image: imageUrl,
        messageTime: takeInstantTimeFunc(),
        messageOrder: countValue,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userLogo: auth.currentUser.photoURL,
        roomId: reduxRoomId,
      });
      changeCountFunc();
    } catch (error) {
      console.log("Mesaj kayıt sırasında hata oluştu : " + error);
    }
  };

  useEffect(() => {
    counterGetRealTimeFunc();
  }, []);

  const imageUploadFunc = () => {
    if (!image) {
      console.log("resim yok");
      return;
    }
    const imageRef = ref(storage, `message_images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  useEffect(() => {
    if (image) {
      imageUploadFunc();
    }
  }, [image]);

  useEffect(() => {
    if (imageUrl) {
      sendImageMessageFunc();
    }
  }, [imageUrl]);

  return (
    <div className="chat-send-message">
      <label htmlFor="file">
        <FaPlus className="icon" title="Resim Yükleme" />
      </label>
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <input
        type="text"
        placeholder="Bir mesaj yazın"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      {inputMessage !== "" ? (
        <IoSend onClick={sendTextMessageFunc} className="icon" />
      ) : (
        <FaMicrophone className="icon" title="Desteklenmiyor" />
      )}
    </div>
  );
};

export default ChatMessageSend;
