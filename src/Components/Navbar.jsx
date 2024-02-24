import React from "react";
import "./navbar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const userSigOutFunc = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log("çıkış işlemi sırasında hata oluştu: " + err);
      });
  };

  return (
    <div className="navbar">
      <div className="user">
        <img
          src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>Enes Yağmur</p>
      </div>
      <button onClick={userSigOutFunc}>Çıkış</button>
    </div>
  );
};

export default Navbar;
