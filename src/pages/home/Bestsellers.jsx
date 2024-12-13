import React from "react";
import { useNavigate } from "react-router-dom";
import "./Bestseller.css";
const Bestsellers = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="container mt-4">
      <h2>Bestsellers</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-3">
            <div
              className={`card ${product.stock === 0 ? "out-of-stock" : ""}`}
            >
              <img
                src={`https://localhost:7152/${product.imageUrl}`}
                className="card-img-top"
                alt={product.name}
                
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                {/* <p className="card-text">{product.description}</p> */}
                <p className="card-price">Price: ₹{product.price}</p>
                <button
                  className="btn btn-dark"
                  onClick={() => handleProductClick(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "No Stock" : "View Details"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
