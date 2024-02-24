import React, { useEffect, useState } from "react";
import "./home.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Chat from "../Components/Chat/Chat";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const userCheckFunc = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    userCheckFunc();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
