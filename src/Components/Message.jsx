import React from "react";
import "./message.scss";

const Message = () => {
  return (
    <div className="message">
      <img
        src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <div className="user-info">
        <span>Berkay Kamberoğlu</span>
        <p>Selam</p>
      </div>
    </div>
  );
};

export default Message;
