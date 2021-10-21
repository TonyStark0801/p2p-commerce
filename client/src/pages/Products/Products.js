import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../../Redux/Actions/ProductActions.js";
import Loading from "../../Components/Loading/Loading";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import "./Products.css";

function Products(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(ProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : (
        <div className="container">
          <div className="container__left-column">
            <img
              className="left-column__image"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="container__middle-column">
            <p className="middle-column__product-heading"> {product.name} </p>
            <div className="middle-column__product-rating">
              <span className="fa fa-star checked"> </span>
              <span className="fa fa-star checked"> </span>
              <span className="fa fa-star checked"> </span>
              <span className="fa fa-star"> </span>
              <span className="fa fa-star"> </span>
            </div>
            <p className="middle-column__product-price">
              <small className="product-price__small"> Price: </small>
              <strong className="product-price__strong">
                {product.price}
                RS
              </strong>
            </p>
            <div className="middle-column__availability"> In stock </div>
            <p className="middle-column__product-description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.Placeat
              commodi nisi dolor tenetur quae minus tempore corporis dolorem,
              error repellendus cupiditate perferendis sint nulla ipsum amet
              odio natus perspiciatis quaerat!
            </p>
          </div>
          <div className="container__right-column">
            <div className="right-column__card">
              <p className="card__total-price">
                <small className="total-price__small"> Total price: </small>
                <strong className="total-price__strong">
                  {product.price}
                  Rs
                </strong>
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
      )}
    </>
  );
}

export default Products;
