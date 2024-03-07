import React, { useEffect, useState } from "react";
import "./search.scss";
import { IoClose } from "react-icons/io5";

const Search = ({ rooms, setRooms, getRoomsFunc }) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [inputRoom, setInputRoom] = useState("");
  const searchRoomFunc = (input) => {
    if (input) {
      setShowDeleteBtn(true);
      const newArray = rooms.filter((room) =>
        room.name.toLowerCase().includes(input)
      );
      if (newArray) {
        setRooms([...newArray]);
      }
    } else {
      setShowDeleteBtn(false);
      getRoomsFunc();
    }
  };

  const clearSearchFunc = () => {
    setShowDeleteBtn(false);
    getRoomsFunc();
    setInputRoom("");
  };

  useEffect(() => {
    searchRoomFunc(inputRoom);
  }, [inputRoom]);

  if (rooms) {
    return (
      <div className="search">
        {showDeleteBtn ? (
          <IoClose className="icon" onClick={clearSearchFunc} />
        ) : null}

        <input
          type="text"
          placeholder="Grup Ara"
          onChange={(e) => setInputRoom(e.target.value)}
          value={inputRoom}
        />
      </div>
    );
  }
};

export default Search;
