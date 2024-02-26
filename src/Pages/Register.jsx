import React, { useState } from "react";
import "./register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../redux/sliceCurrent";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const signUpFunc = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      console.log("Kullanıcı başarıyla oluşturuldu:", user);
      dispatch(changeUser(user));
      Navigate("/home");
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
          <input
            type="text"
            className="text"
            placeholder="Kullanıcı"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <p>
          Zaten hesabım var! <Link to={"/"}>Giriş</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
