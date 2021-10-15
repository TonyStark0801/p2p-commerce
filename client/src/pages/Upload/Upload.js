import React, { useState, useEffect } from "react";
import axios from "axios";

function Upload() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const sendData = () => {
    axios
      .post("http://localhost:5000/upload", {
        name: name,
        price: price,
        image: image,
      })
      .then((err, res) => {
        console.log(err);
        alert("succesful entry!");
      });
  };

  return (
    <form>
      <label>Name: </label>

      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Price: </label>

      <input
        type="text"
        name="price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <label>Image: </label>
      <input
        type="text"
        name="uploadImage"
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <input type="submit" onClick={sendData} />
    </form>
  );
}

export default Upload;
