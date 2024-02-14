import React from "react";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="login-main">
        <span className="logo">WHATSAPP WEB</span>
        <span className="title">Mevcut Kullanıcı</span>
        <form>
          <input type="email" className="text" placeholder="Email" />
          <input type="password" className="text" placeholder="Şifre" />

          <button>Giriş</button>
        </form>
        <p>Hesabım yok! Kayıt</p>
      </div>
    </div>
  );
};

export default Login;
