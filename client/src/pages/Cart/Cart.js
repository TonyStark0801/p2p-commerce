import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {
  addToCart,
  removeFromCart,
  emptyCart,
} from "../../Redux/Actions/CartActions";
import "./Cart.css";

function Cart(props) {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId));
    }
  }, [dispatch, productId]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const removeAll = () => {
    // delete action
    dispatch(emptyCart());
  };
  return (
    <div className="cart">
      <div className="cart__container">
        <div className="container__nav">
          <h3 className="nav__heading">Shopping Cart</h3>
          <h5 onClick={() => removeAll()} className="nav__action">
            Remove all
          </h5>
        </div>

        {cartItems.length === 0 ? (
          <ErrorMessage>Cart is empty.</ErrorMessage>
        ) : (
          cartItems.map((item) => (
            <Items
              id={item.product}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        )}
        <div className="cart__checkout">
          <div className="checkout__total">
            <div>
              <div className="checkout__subtotal">Sub-Total</div>
              <div className="checkout__items">
                {cartItems.length == 0
                  ? cartItems.length + " items"
                  : cartItems.length == 1
                  ? cartItems.length + " item"
                  : cartItems.length + " items"}
              </div>
            </div>
            <div className="total__amount">
              {cartItems.reduce((a, c) => a + c.price, 0)}₹
            </div>
          </div>
          <button className="rent-button">PAYMENT</button>
        </div>
      </div>
    </div>
  );
}

function Items({ id, name, price, image }) {
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  return (
    <div className="cart__items">
      <img className="item__image" src={image} />
      <div className="item__about">
        <Link to={`/products/${id}`}>
          <h1 className="about__title">{name}</h1>
        </Link>
        <h3 className="about__subtitle">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.Placeat
          commodi nisi dolor tenetur quae minus tempore corporis dolorem, error
          repellendus cupiditate perferendis sint nulla ipsum amet odio natus
          perspiciatis quaerat!
        </h3>
        <button className="rent-button">
          <span>RENT </span>
        </button>
      </div>
      <div className="item__prices">
        <div className="item__amount">{price}₹</div>
        <div onClick={() => removeFromCartHandler(id)} className="item__remove">
          <u>Remove</u>
        </div>
      </div>
    </div>
  );
}

export default Cart;
