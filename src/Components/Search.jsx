import React from "react";
import "./search.scss";

const Search = () => {
  return (
    <>
      <div className="search">
        <input type="text" placeholder="Kullanıcı ara" />
      </div>
      <div className="found-friend" style={{ display: "none" }}>
        <img
          src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>Berkay Kamberoğlu</p>
      </div>
    </>
  );
};

export default Search;
