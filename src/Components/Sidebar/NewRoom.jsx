import React, { useEffect, useState } from "react";
import "./newRoom.scss";
import addGroupImage from "../../images/plus.png";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import addButtonImage from "../../images/upload-image-button.png";

const NewRoom = ({ getRoomsFunc }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState();
  const [logoUrl, setLogoUrl] = useState();

  const createNewRoomFunc = async () => {
    if (name) {
      const roomRef = collection(db, "rooms");
      try {
        await addDoc(roomRef, {
          name: name,
          logo: logoUrl,
        });
        setName("");
        setShow(false);
      } catch (error) {
        console.log("Grup oluştururken hata: " + error);
      }
    }
  };

  const roomLogoUploadFunc = () => {
    if (!logo) {
      return;
    }

    const logoRef = ref(storage, `group_images/${logo.name}`);
    uploadBytes(logoRef, logo).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setLogoUrl(url);
      });
    });
  };

  useEffect(() => {
    if (logoUrl) {
      createNewRoomFunc();
    }
  }, [logoUrl]);

  useEffect(() => {
    getRoomsFunc();
  }, [show]);

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
            className="text"
            placeholder="Grup ismi"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => {
              setLogo(e.target.files[0]);
            }}
          />
          <label htmlFor="file">
            <img src={addButtonImage} alt="" />
          </label>
        </div>
        <div className="new-group-buttons">
          <button onClick={() => setShow(false)}>Geri</button>
          <button onClick={roomLogoUploadFunc}>Oluştur</button>
        </div>
      </div>
    );
  }
};

export default NewRoom;
