import React from "react";
import "./sidebar.scss";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
    </div>
  );
};

export default Sidebar;
