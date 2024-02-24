import React, { useState } from "react";
import "./register.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../redux/slice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goLogin = () => {
    navigate("/");
  };

  const signUpFunc = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Kullanıcı başarıyla oluşturuldu:", user);
      dispatch(changeUser(user));
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Kullanıcı oluşturma hatası:", error);
    }
  };

  return (
    <div className="register">
      <div className="register-main">
        <span className="logo">WHATSAPP WEB</span>
        <span className="title">Yeni Kullanıcı</span>
        <div className="form">
          <input type="text" className="text" placeholder="Kullanıcı" />
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

          <button type="submit" onClick={signUpFunc}>
            Kayıt
          </button>
          {errorMessage && <span>Bir şeyler ters gitti.</span>}
        </div>
        <p onClick={goLogin}>Zaten hesabım var! Giriş</p>
      </div>
    </div>
  );
};

export default Register;
