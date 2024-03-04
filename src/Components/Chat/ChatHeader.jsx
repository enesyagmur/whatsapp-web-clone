import React from "react";
import "./chatHeader.scss";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { changeId } from "../../redux/sliceRoom";

const ChatHeader = ({ room }) => {
  const dispatch = useDispatch();
  const deleteRoomFunc = async () => {
    await deleteDoc(doc(db, "rooms", room[0].id))
      .then(() => {
        dispatch(changeId(""));
      })
      .catch((err) => {
        console.log("Grup silinirken hata oluştu: " + err);
      });
  };

  if (room[0]) {
    return (
      <div className="chat-header">
        <div className="chat-header-left">
          <img src={room[0].logo} alt="" />
          <div className="chat-info">
            <p className="chat-title">{room[0].name}</p>
          </div>
        </div>
        <div className="chat-header-icons">
          <IoMdSearch className="icon" />
          <IoMdMore className="icon" />
          <AiOutlineDelete className="icon" onClick={deleteRoomFunc} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ChatHeader;
