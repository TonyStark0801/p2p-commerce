import React, { useState, useEffect } from "react";
import axios from "axios";

function Upload() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  // const sendData = () => {
  //   axios
  //     .post("http://localhost:5000/upload", {
  //       name: name,
  //       price: price,
  //       image: image,
  //     })
  //     .then((err, res) => {
  //       console.log(err);
  //       alert("succesful entry!");
  //     });
  // };
  axios.get("http://localhost:5000/upload").then((data) => {
    console.log(data);
    setImage("http://localhost:5000/public/images/" + data.data.image);
    console.log(image);
  });
  const imageHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);

    axios.post("http://localhost:5000/upload", formData).then((err, res) => {
      console.log(err);
      alert("succesful entry!");
    });
  };

  return (
    <>
      <form>
        <h2> {uploadStatus} </h2>
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
          type="file"
          name="image"
          accept="image/*"
          onChange={imageHandler}
          multiple={false}
        />
        <br />
        <button>Submit</button>
      </form>
      <h1>{uploadStatus}</h1>
      <img src={image} />
    </>
  );
}

export default Upload;
