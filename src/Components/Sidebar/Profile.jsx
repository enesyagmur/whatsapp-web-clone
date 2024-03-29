import React, { useEffect, useState } from "react";
import "./profile.scss";
import { MdDonutLarge } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const logoutFunc = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Çıkış yaparken hata:" + err);
      });
  };

  return (
    <div className="profile">
      {auth.currentUser ? (
        <div className="user">
          <img src={auth.currentUser.photoURL} alt="" />
          <p>{auth.currentUser.displayName}</p>
        </div>
      ) : null}

      <div className="profile-icons">
        <MdDonutLarge className="icon" title="Desteklenmiyor" />

        <AiOutlineLogout className="icon" onClick={logoutFunc} title="Çıkış" />
      </div>
    </div>
  );
};

export default Profile;
