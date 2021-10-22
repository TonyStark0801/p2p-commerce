import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
    ProductListReducer,
    ProductDetailsReducer,
} from "./Reducers/ProductListReducer.js";
import { cartReducer } from "./Reducers/CartItemsReducer.js";
const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")) :
            [],
    },
};
const reducer = combineReducers({
    productList: ProductListReducer,
    productDetails: ProductDetailsReducer,
    cart: cartReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;