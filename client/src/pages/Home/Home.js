import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Loading from "../../Components/Loading/Loading";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import "./Home.css";

function Home() {
  let arr = [];
  let uniqueCategories = [];
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (data.products) {
    data.products.map((val) => arr.push(val.category));
    uniqueCategories = eliminateDuplicates(arr);
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage error={error} variant="danger" />
      ) : (
        <div>
          <div>
            {uniqueCategories.map((uniqueCategory) => (
              <Category data={data.products} category={uniqueCategory} />
            ))}
          </div>
          <div className="cities">
            <h1 className="cities__heading"> Major Cities </h1>
            <div className="cities__row">
              {data.cities ? (
                data.cities.map((city) => (
                  <Cities image={city.image} key={city.key} />
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      )}
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
        <div className="product-category__heading"> {category} </div>
        <div className="product-category__more"> More </div>
      </div>
      <Slider {...settings}>
        {products.map((product) => (
          <Card
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </Slider>
    </div>
  );
}

function Card({ id, image, name, price }) {
  return (
    <div className="product-card-bg">
      <div className="individual-card">
        <a href={`/product/${id}`}>
          <img src={image} className="individual-card__img" />
        </a>
        <h3 className="individual-card__name"> {name} </h3>
        <div className="individual-card__content">
          <div className="content__price">
            Price: {price}
            Rs
          </div>
          <div className="content__button">
            <Link to={`/products/${id}`}> View </Link>
          </div>
        </div>
      </div>
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
