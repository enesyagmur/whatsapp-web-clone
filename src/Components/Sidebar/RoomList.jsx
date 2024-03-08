import React, { useEffect, useState } from "react";
import "./roomList.scss";
import Room from "./Room";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import NewRoom from "./NewRoom";
import Search from "./Search";
import { useSelector } from "react-redux";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [changeCheck, setChangeCheck] = useState(false);

  const activeRoom = useSelector((state) => state.roomId.id);

  const getRoomsFunc = async () => {
    try {
      const allRoomsData = await getDocs(collection(db, "rooms"));
      const justRooms = allRoomsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (justRooms) {
        setRooms(justRooms);
      }
    } catch (err) {
      console.log("Roomsları çekmede hata oluştu:" + err);
    }
  };

  useEffect(() => {
    if (changeCheck === true) {
      getRoomsFunc();
      setChangeCheck(false);
    }
  }, [changeCheck]);

  useEffect(() => {
    getRoomsFunc();
  }, []);

  useEffect(() => {
    if (activeRoom === "") {
      getRoomsFunc();
    }
  }, [activeRoom]);

  return (
    <div className="room-list">
      <Search rooms={rooms} setRooms={setRooms} getRoomsFunc={getRoomsFunc} />
      <NewRoom getRoomsFunc={getRoomsFunc} />
      <div className="rooms">
        {rooms
          ? rooms.map((room) => (
              <Room
                name={room.name}
                logo={room.logo}
                key={room.id}
                id={room.id}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default RoomList;
