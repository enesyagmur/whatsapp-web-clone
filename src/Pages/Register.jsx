import React, { useEffect, useState } from "react";
import "./register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const signUpFunc = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        setUser(user);
      }
      console.log("Kullanıcı başarıyla oluşturuldu");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Kullanıcı oluşturma hatası:", error);
    }
  };

  const userUpdateFunc = async () => {
    imageUploadFunc();
    if (imageUrl) {
      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      })
        .then(() => {
          console.log("Kullanıcı bilgileri başarı ile güncellendi");
          navigate("/");
        })
        .catch((error) => {
          console.log("Kullanıcı bilgileri güncellenemedi: " + error);
        });
    } else {
      console.log("imageUrl boş profil güncellenemedi");
    }
  };

  useEffect(() => {
    if (user) {
      userUpdateFunc();
    }
  }, [user]);

  //resim ekleme
  const imageUploadFunc = () => {
    if (!image) {
      return;
    }

    const imageRef = ref(storage, `profile_images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  //ürün ekleme

  return (
    <div className="register">
      <div className="register-main">
        <span className="logo">WHATSAPP WEB</span>

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
          {/* <input
            type="text"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          /> */}
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
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
