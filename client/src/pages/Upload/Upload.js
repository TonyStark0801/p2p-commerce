import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploadedFile, setUploadedFile] = useState({
    name: "Product Name",
    price: "$$$",
    filePath:
      "https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
  });

  useEffect(() => {}, [uploadedFile]);

  const imageHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      const { name, price, filePath } = res.data;
      console.log(uploadedFile);
      setUploadedFile({ name, price, filePath });
      alert("Successful Entry!");
    } catch (err) {
      // if (err.response.status == 500) {
      //   alert("There was a problem with the server");
      // } else {
      //   alert(err.response.data.msg);
      // }
      alert(err);
    }
  };
  return (
    <>
      <div className="contain">
        <h1 className="heading">&bull; Rent anything anywhere! &bull;</h1>
        <div className="underline"> </div>
        <form onSubmit={imageHandler}>
          <div className="text-input">
            <div className="name">
              <input
                type="text"
                placeholder="Product name"
                className="name__input"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="price">
              <input
                type="text"
                name="price"
                placeholder="Product Price"
                className="price__input"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div class="dropdown">
            <select
              placeholder="Choose product category"
              name="dropdown"
              className="dropdown__input"
              required
            >
              <option disabled hidden selected>
                Choose product category
              </option>
              <option>I'd like to start a project</option>
              <option>I'd like to ask a question</option>
              <option>I'd like to make a proposal</option>
            </select>
          </div>

          <div className="image">
            <button className="image__btn">Upload a file</button>
            <input
              className="image__input"
              type="file"
              name="myfile"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="submit">
            <input type="submit" value="Upload Item" id="form_button" />
          </div>
        </form>
      </div>

      {uploadedFile ? <UploadedItem uploadedFile={uploadedFile} /> : null}
    </>
  );
}

function UploadedItem(props) {
  return (
    <>
      <div className="wrap">
        <img className="wrap__image" src={props.uploadedFile.filePath} alt="" />
        <div className="wrap__content">
          <h1 className="wrap__content__name">{props.uploadedFile.name}</h1>
          <p className="wrap__content__price">
            Price: {props.uploadedFile.price} Rs
          </p>
          <p className="wrap__content__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
            culpa, autem et iste aspernatur praesentium laborum non reiciendis
            at hic maiores asperiores repudiandae eligendi, adipisci esse
            exercitationem atque necessitatibus distinctio.
          </p>
        </div>
      </div>
    </>
  );
}

export default Upload;
