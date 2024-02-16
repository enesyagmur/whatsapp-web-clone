import React from "react";
import "./message.scss";

const Message = () => {
  return (
    <div className="message">
      <img
        src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <div className="message-content">
        <p className="sender">Berkay Kamberoğlu</p>
        <p className="body-message">
          Bugün kfc bana da menü içi olduğu için sadece gönderebileceklerini
          söyledi, ama başka bir kfc operatörüne denk geldiğimde okeylemişti
          menü içi iadeyi
        </p>
        <p className="date">19:02</p>
      </div>
    </div>
  );
};

export default Message;
