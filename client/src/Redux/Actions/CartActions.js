import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  EMPTY_CART,
} from "../Constants/CartConstants.js";

export const addToCart = (productId) => async (dispatch, getState) => {
  const data = await Axios.get(
    `https://p2p-comm-server.herokuapp.com/api/products/${productId}`
  );
  const getPropValue = (obj, key) =>
    key.split(".").reduce((o, x) => (o == undefined ? o : o[x]), obj);
  const product = getPropValue(data, "data.product");
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      product: product._id,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch({
    type: EMPTY_CART,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
