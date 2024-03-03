import React, { useState } from "react";
import "./sidebar.scss";
import Profile from "./Profile";

import RoomList from "./RoomList";
import NewRoom from "./NewRoom";

const Sidebar = ({ setRoomId }) => {
  return (
    <div className="sidebar">
      <Profile />
      <NewRoom />
      <RoomList setRoomId={setRoomId} />
    </div>
  );
};

export default Sidebar;
