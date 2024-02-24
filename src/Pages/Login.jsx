import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { changeUser } from "../redux/slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/home");
  };

  const loginFunc = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          goHome();
          dispatch(changeUser(user));
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrorMessage(errorCode + " " + errorMessage);
      });
  };

  return (
    <div className="login">
      <div className="login-main">
        <span className="logo">WHATSAPP WEB</span>
        <span className="title">Mevcut Kullanıcı</span>
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
        </div>
        <p>
          Hesabım yok! <Link to={"/register"}>Kayıt</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
