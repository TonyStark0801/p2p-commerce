import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
    ProductListReducer,
    ProductDetailsReducer,
} from "./Reducers/ProductListReducer.js";
import { cartReducer } from "./Reducers/CartItemsReducer.js";
import { userSigninReducer } from "./Reducers/UserReducer.js";
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo") ?
            JSON.parse(JSON.stringify(localStorage.getItem("userInfo"))) :
            null,
    },
    cart: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(JSON.stringify(localStorage.getItem("cartItems"))) :
            [],
    },
};
const reducer = combineReducers({
    productList: ProductListReducer,
    productDetails: ProductDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;