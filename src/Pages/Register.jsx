import React, { useState } from "react";
import "./register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../redux/sliceCurrent";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

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
        photoURL: image,
      })
        .then(() => {
          console.log("Kullanıcı bilgileri başarı ile güncellendi");
        })
        .catch((error) => {
          console.log("Kullanıcı bilgileri güncellenemedi: " + error);
        });
      console.log("Kullanıcı başarıyla oluşturuldu");
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
          <input
            type="text"
            onChange={(e) => {
              setImage(e.target.value);
            }}
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
