import React from "react";
import "./profile.scss";
import { MdDonutLarge } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
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
      {/* <div className="logo">
        {auth.currentUser.photoURL ? (
          <img src={auth.currentUser.photoURL} alt="" />
        ) : (
          <img src="https://random.imagecdn.app/500/150" alt="" />
        )}
      </div> */}
      <div className="profile-icons">
        <MdDonutLarge className="icon" />
        <MdOutlineMessage className="icon" />
        <AiOutlineLogout className="icon" onClick={logoutFunc} />
      </div>
    </div>
  );
};

export default Profile;
