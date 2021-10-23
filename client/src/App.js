import React from "react";
import Home from "./pages/Home/Home.js";
import Products from "./pages/Products/Products.js";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Upload from "./pages/Upload/Upload.js";
import Cart from "./pages/Cart/Cart.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/products/:id" exact component={Products} />
        <Route path="/cart/:id?" exact component={Cart} />
        <Route path="/upload" exact component={Upload} /> <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
