import React from "react";
import "./input.scss";
import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";
const Input = () => {
  return (
    <div className="input">
      <IoMdAttach className="icon" />
      <input type="text" placeholder="Bir mesaj yaz.." />
      <div className="send">
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <RiImageAddLine className="icon" />
        </label>

        <IoSend className="icon" />
      </div>
    </div>
  );
};

export default Input;
