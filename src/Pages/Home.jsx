import React, { useEffect } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Chat from "../Components/Chat/Chat";
import Sidebar from "../Components/Sidebar/Sidebar";

const Home = () => {
  const navigate = useNavigate();

  const userCheckFunc = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
