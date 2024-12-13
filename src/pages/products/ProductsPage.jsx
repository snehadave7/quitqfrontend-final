import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import ProductFilter from "./filter";

const categoryId = {
  Clothing: 1,
  Electronics: 2,
  Groceries: 3,
};

const ProductsPage = ({ category, products: propProducts = [] }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(""); 

  const fetchProducts = async (subCategory = []) => {
    let BASE_URL = "https://localhost:7152/api/Products";

    try {
      if (subCategory.length > 0) {
        const subCategoryQuery = subCategory.join(",");
        BASE_URL = `${BASE_URL}/by-subCat/${subCategoryQuery}`;
      } else {
        if (category.toLowerCase() === "electronics") {
          BASE_URL = `${BASE_URL}/by-cat/electronics`;
        } else if (category.toLowerCase() === "clothing") {
          BASE_URL = `${BASE_URL}/by-cat/clothing`;
        } else if (category.toLowerCase() === "groceries") {
          BASE_URL = `${BASE_URL}/by-cat/groceries`;
        }
      }

      const response = await fetch(BASE_URL);
      const data = await response.json();
      console.log("API response:", data);

      const productArray = data.$values || [];
      setProducts(productArray);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    setSortOrder(""); 
    fetchProducts([]);
  }, [category]);

  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleFilterChange = (selectedSubCategory) => {
    setSortOrder(""); 
    fetchProducts(selectedSubCategory);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "lowToHigh") {
        return a.price - b.price;
      } else if (order === "highToLow") {
        return b.price - a.price;
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="container mt-4 products-page">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-4">{category} Products</h1>
        
        <div className="sort-section">
          <label htmlFor="sortOrder" className="me-2">
            Sort By:
          </label>
          <select
            id="sortOrder"
            className="form-select form-select-sm d-inline-block w-auto"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="products-layout">
        
        <div className="filter-section">
          <ProductFilter
            onFilterChange={handleFilterChange}
            categoryId={categoryId[category]}
          />
        </div>

        <div className="products-section">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div
                    className={`card ${
                      product.stock === 0 ? "out-of-stock" : ""
                    }`}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
