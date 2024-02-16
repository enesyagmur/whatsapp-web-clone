import React from "react";
import "./sidebar.scss";
import Navbar from "./Navbar";
import Search from "./Search";
import Message from "./Message";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Sidebar;
