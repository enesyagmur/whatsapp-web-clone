import React from "react";
import "./emptyChat.scss";
import { IoLockClosed } from "react-icons/io5";
import EmptyChatImage from "../../images/empty-chat-image.png";

const EmptyChat = () => {
  return (
    <div className="empty-chat">
      <div className="empty-chat-body">
        <img src={EmptyChatImage} />
        <p className="title">Windows için WhatsApp İndir</p>
        <p className="explain">
          Uygulamayı indirdiğinizde aramalarda ve ekran paylaşımında hız farkını
          tecrübe edebilirsiniz.
        </p>
        <button>Uygulamayı İndir</button>
      </div>
      <div className="empty-chat-footer">
        <IoLockClosed />
        <p className="footer-info">
          Kişisel mesajlarınız kapalı uçlu şifreleme ile korunur.
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;
