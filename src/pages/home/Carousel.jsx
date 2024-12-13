import React from "react";
import fashion from "../../assests/fashion.png";
import electronic from "../../assests/electronic.png";
import grocery from "../../assests/grocery.png";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="container my-4">
      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
         
          <div className="carousel-item active">
            <img
              src={fashion}
              className="d-block w-100 carousel-image"
              alt="Fashion"
            />
            <div className="carousel-caption d-md-block">
              <h3 className="carousel-title">Fashion for You</h3>
              <p className="carousel-description">
                Trendy styles and collections
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src={electronic}
              className="d-block w-100 carousel-image"
              alt="Electronics"
            />
            <div className="carousel-caption d-md-block">
              <h3 className="carousel-title">Latest Electronics</h3>
              <p className="carousel-description">
                Innovative gadgets and more
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src={grocery}
              className="d-block w-100 carousel-image"
              alt="Grocery"
            />
            <div className="carousel-caption d-md-block">
              <h3 className="carousel-title">Grocery Essentials</h3>
              <p className="carousel-description">
                Everything you need, delivered
              </p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
