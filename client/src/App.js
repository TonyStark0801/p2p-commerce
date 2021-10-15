import React from "react";
import Home from "./pages/Home/Home.js";
import Products from "./pages/Products/Products.js";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Upload from "./pages/Upload/Upload.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/upload" exact component={Upload} />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
