import React from "react";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="register-main">
        <span className="logo">WhatsApp Web</span>
        <span className="title">Kayıt</span>
        <form>
          <input type="text" placeholder="Kullanıcı" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Şifre" />
          <input type="file" />
          <button>Kayıt</button>
        </form>
        <p>Zaten hesabım var! Giriş</p>
      </div>
    </div>
  );
};

export default Register;
