import React, { useEffect, useState } from "react";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Chat from "../Components/Chat/Chat";
import Sidebar from "../Components/Sidebar/Sidebar";
import { changeUser } from "../redux/sliceCurrent";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCheckFunc = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        dispatch(changeUser(user));
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
