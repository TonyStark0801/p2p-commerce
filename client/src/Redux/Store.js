import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
    ProductListReducer,
    ProductDetailsReducer,
} from "./Reducers/ProductListReducer.js";

const initialState = {};
const reducer = combineReducers({
    productList: ProductListReducer,
    productDetails: ProductDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;