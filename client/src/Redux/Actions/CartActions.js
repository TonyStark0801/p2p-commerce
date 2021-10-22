import Axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    EMPTY_CART,
} from "../Constants/CartConstants.js";

export const addToCart = (productId) => async(dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            category: data.category,
            product: data._id,
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