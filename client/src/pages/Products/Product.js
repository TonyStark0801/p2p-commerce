import React from "react";
import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import { data } from "../../data";
import "./Product.css";

function Product(props) {
  const product = data.find();

  return (
    <>
      <div className="container">
        <div className="container__left-column">
          <img
            className="left-column__image"
            src={product.image}
            alt="Product Image"
          />
        </div>

        <div className="container__middle-column">
          <p className="middle-column__product-heading"> Boat Headphones </p>
          <div className="middle-column__product-rating">
            <span className="fa fa-star checked"> </span>
            <span className="fa fa-star checked"> </span>
            <span className="fa fa-star checked"> </span>
            <span className="fa fa-star"> </span>
            <span className="fa fa-star"> </span>
          </div>
          <p className="middle-column__product-price">
            <small className="product-price__small"> Price: </small>
            <strong className="product-price__strong"> 1200 Rs </strong>
          </p>
          <div className="middle-column__availability"> In stock </div>
          <p className="middle-column__product-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.Placeat
            commodi nisi dolor tenetur quae minus tempore corporis dolorem,
            error repellendus cupiditate perferendis sint nulla ipsum amet odio
            natus perspiciatis quaerat!
          </p>
        </div>

        <div className="container__right-column">
          <div className="right-column__card">
            <p className="card__total-price">
              <small className="total-price__small"> Total price: </small>
              <strong className="total-price__strong"> 1200 Rs </strong>
            </p>
            <p className="card__quantity">
              <small className="quantity__small"> Quantity: </small>
              <strong className="quantity__strong"> 1 </strong>
            </p>
            <div className="card__buttons">
              <button className="buttons__buy-now"> Buy Now </button>
              <button className="buttons__add-to-cart"> Add to Cart </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

// console.log("Hi");
//   console.log(props);

//   console.log(data.map((el) => el.Product.map((el) => el)));
//   console.log(data.map((el) => el.Product.find((val) => val._id == 4)));

// data.find((el) =>
// el.Product.find((val) => val._id == props.match.params.id)

//   .find((val) => val._id == props.match.params.id)
// )
//   );
// Object.entries(data).forEach((val) => console.log(val));
//   if (!product) {
//     return <div>Product not found</div>;
//   }
