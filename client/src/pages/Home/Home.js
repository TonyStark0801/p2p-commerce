import React, { useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ProductList } from "../../Redux/Actions/ProductActions.js";
import Loading from "../../Components/Loading/Loading";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import "./Home.css";

function Home() {
  //Some function to help me destructure data object
  const getPropValue = (obj, key) =>
    key.split(".").reduce((o, x) => (o == undefined ? o : o[x]), obj);

  //Redux stuff
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, data } = productList;

  //Destructure data object
  const allProducts = getPropValue(data, "data");

  //Set unique categories
  let arr = [];
  let uniqueCategories = [];
  if (allProducts) {
    allProducts.map((val) => arr.push(val.category));
    uniqueCategories = eliminateDuplicates(arr);
  }
  useEffect(() => {
    dispatch(ProductList());
  }, [dispatch]);
  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage error={error} variant="danger" />
      ) : (
        <div>
          <div>
            {" "}
            {uniqueCategories.map((uniqueCategory) => (
              <Category data={allProducts} category={uniqueCategory} />
            ))}{" "}
          </div>{" "}
          {/* <div className="cities">
                                                    <h1 className="cities__heading"> Major Cities </h1>
                                                    <div className="cities__row">
                                                      {cities ? (
                                                        cities.map((city) => (
                                                          <Cities image={city.image} key={city.key} />
                                                        ))
                                                      ) : (
                                                        <div> </div>
                                                      )}
                                                    </div>
                                                  </div> */}{" "}
        </div>
      )}{" "}
    </>
  );
}

function Cities({ image }) {
  return (
    <div className="cities__card">
      <img src={image} className="cities__img" />
    </div>
  );
}

function Category({ data, category }) {
  const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIos />
      </div>
    );
  };
  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIos />
      </div>
    );
  };

  var settings = {
    dots: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };
  let products = data.filter((val) => val.category == category);
  return (
    <div className="carousel-container">
      <div className="product-category">
        <div className="product-category__heading"> {category} </div>{" "}
        <div className="product-category__more"> More </div>{" "}
      </div>{" "}
      <Slider {...settings}>
        {" "}
        {products.map((product) => (
          <Card
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}{" "}
      </Slider>{" "}
    </div>
  );
}

function Card({ id, name, image, price }) {
  return (
    <div className="product-card-bg">
      <Link to={`/products/${id}`}>
        <div className="individual-card">
          <img src={image} className="individual-card__img" />
          <h3 className="individual-card__name"> {name} </h3>{" "}
          <div className="individual-card__content">
            <div className="content__price">
              Price: {price}
              Rs{" "}
            </div>{" "}
            <Link to={`/cart/${id}`}>
              <div className="content__button"> Add to Cart </div>{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </Link>{" "}
    </div>
  );
}

function eliminateDuplicates(arr) {
  var i,
    len = arr.length,
    out = [],
    obj = {};

  for (i = 0; i < len; i++) {
    obj[arr[i]] = 0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}
export default Home;
