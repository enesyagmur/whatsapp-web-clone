import React, { useEffect, useState } from "react";
import "./chat.scss";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import EmptyChat from "./EmptyChat";
import ChatMessageSend from "./ChatMessageSend";
import { useSelector } from "react-redux";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [resetChatBody, setResetChatBody] = useState(0);
  const reduxRoomId = useSelector((state) => state.roomId.id);

  const getRoomsFunc = async () => {
    try {
      const allRoomsData = await getDocs(collection(db, "rooms"));
      const justRooms = allRoomsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (justRooms) {
        const findRoom = justRooms.filter(
          (arrayRoom) => arrayRoom.id === reduxRoomId
        );
        if (findRoom) {
          setSelectedRoom(findRoom);
        }
      }
    } catch (err) {
      console.log("Chat komponentinde grupları çekmede hata oluştu:" + err);
    }
  };

  useEffect(() => {
    getRoomsFunc();
  }, [reduxRoomId]);

  if (reduxRoomId !== "") {
    return (
      <div className="chat">
        <ChatHeader room={selectedRoom} />
        <ChatBody roomId={reduxRoomId} resetChatBody={resetChatBody} />
        <ChatMessageSend
          roomId={reduxRoomId}
          resetChatBody={resetChatBody}
          setResetChatBody={setResetChatBody}
        />
      </div>
    );
  } else {
    return (
      <div className="chat">
        <EmptyChat />
      </div>
    );
  }
};

export default Chat;
