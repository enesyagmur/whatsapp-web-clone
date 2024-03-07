import React from "react";
import "./sidebar.scss";
import Profile from "./Profile";

import RoomList from "./RoomList";

const Sidebar = ({ setRoomId }) => {
  return (
    <div className="sidebar">
      <Profile />

      <RoomList setRoomId={setRoomId} />
    </div>
  );
};

export default Sidebar;
