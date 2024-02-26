import React from "react";
import "./room.scss";
import { useDispatch } from "react-redux";
import { changeId } from "../../redux/sliceRoom";

const Room = ({ name, logo, id }) => {
  const dispatch = useDispatch();
  const changeIdFunc = () => {
    dispatch(changeId(id));
  };

  return (
    <div className="room" onClick={changeIdFunc}>
      <img src={logo} alt="" />

      <div className="room-info">
        <p className="title">{name}</p>

        <p className="detail">message detail...</p>
      </div>
    </div>
  );
};

export default Room;
