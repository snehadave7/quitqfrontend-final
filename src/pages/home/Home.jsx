import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Bestsellers from "./Bestsellers";
import Categories from "./Categories";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBestsellers = async () => {
    try {
      const response = await fetch("https://localhost:7152/api/Products");
      const data = await response.json();
      const randomProducts = data.$values
        .sort(() => 0.5 - Math.random()) // Randomize the products
        .slice(0, 4); // Get top 4 products

      setBestsellerProducts(randomProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestsellers();
  }, []);

  return (
    <div className="home-page">
      
      <div className="my-4">
        <Carousel />
      </div>

      <div className="bestsellers-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Bestsellers</h2>
          {!loading && <Bestsellers products={bestsellerProducts} />}
        </div>
      </div>

      <div className="categories-section py-5 ">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Categories</h2>
          <Categories />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
