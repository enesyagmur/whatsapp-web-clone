import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const loginFunc = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          goHome();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrorMessage(errorCode + " " + errorMessage);
      });
  };

  const resetPasswordFunc = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Şifre sıfırlama maili gönderildi");
          setEmail("");
        })
        .catch((err) => {
          console.log("Sıfırlama maili gönderme iişleminde hata: " + err);
        });
    } else {
      alert("Mail adresinizi giriniz.");
    }
  };

  return (
    <div className="login">
      <div className="login-main">
        <span className="logo">WHATSAPP WEB</span>

        <div className="form">
          <input
            type="email"
            className="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="text"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={loginFunc}>Giriş</button>
          {errorMessage && <span>Bir şeyler ters gitti: {errorMessage}</span>}
          <p
            onClick={resetPasswordFunc}
            title="Mail adresinizi girdikten sonra şifre sıfırlama maili için tıklamanız yeterli."
          >
            Şifremi Unuttum
          </p>
        </div>

        <p>
          Hesabım yok! <Link to={"/register"}>Kayıt</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
