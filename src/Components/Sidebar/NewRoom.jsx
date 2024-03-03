import React, { useState } from "react";
import "./newRoom.scss";
import addGroupImage from "../../images/plus.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const NewRoom = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const createNewRoomFunc = async () => {
    const roomRef = collection(db, "rooms");
    try {
      await addDoc(roomRef, {
        name: name,
        logo: logo,
      });
      setLogo("");
      setName("");
      setShow(false);
    } catch (error) {
      console.log("Grup oluştururken hata: " + error);
    }
  };

  if (show === false) {
    return (
      <div className="newRoomOff" onClick={() => setShow(true)}>
        <img src={addGroupImage} alt="" />
        <p>Grup Oluştur</p>
      </div>
    );
  } else {
    return (
      <div className="newRoomOn">
        <div className="new-group-inputs">
          <input
            type="text"
            placeholder="Grup ismi"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Logo link"
            onChange={(e) => setLogo(e.target.value)}
            value={logo}
          />
        </div>
        <div className="new-group-buttons">
          <button onClick={() => setShow(false)}>Geri</button>
          <button onClick={createNewRoomFunc}>Oluştur</button>
        </div>
      </div>
    );
  }
};

export default NewRoom;
