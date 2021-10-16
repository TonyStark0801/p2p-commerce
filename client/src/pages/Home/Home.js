import React from "react";
import Slider from "react-slick";
import Header from "../../Components/Header/Header.js";
import Footer from "../../Components/Footer/Footer.js";
import { data, cities } from "../../data";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import "./Home.css";

function Home() {
  return (
    <div>
      <div>
        {data.map((value) => (
          <Category
            key={value.key}
            category={value.category}
            products={value.products}
          />
        ))}
      </div>
      <div className="cities">
        <h1 className="cities__heading"> Major Cities </h1>
        <div className="cities__row">
          {cities.map((city) => (
            <Cities image={city.image} key={city.key} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Cities({ image }) {
  return (
    <div className="cities__card">
      <img src={image} className="cities__img" />
    </div>
  );
}

function Category({ products, category }) {
  const PreviousBtn = (props) => {
    console.log(props);
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
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };
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
            <a href={`/product/${id}`}> Add to cart </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
