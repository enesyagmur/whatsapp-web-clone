import React from "react";
import "./register.scss";
import avatar from "../images/default-avatar1.png";

const Register = () => {
  return (
    <div className="register">
      <div className="register-main">
        <span className="logo">WHATSAPP WEB</span>
        <span className="title">Yeni Kullanıcı</span>
        <form>
          <input type="text" className="text" placeholder="Kullanıcı" />
          <input type="email" className="text" placeholder="Email" />
          <input type="password" className="text" placeholder="Şifre" />
          <input type="file" style={{ display: "none" }} className="file" />
          <div className="show-avatar">
            <img className="label-img" src={avatar} alt="" />
            <span>Profil resmi yükle</span>
          </div>
          <button>Kayıt</button>
        </form>
        <p>Zaten hesabım var! Giriş</p>
      </div>
    </div>
  );
};

export default Register;
