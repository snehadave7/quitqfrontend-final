import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchResults, resetSearchResults } from "../../service/searchSlice";

function SearchProducts() {
  const [productName, setProductName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResult, loading } = useSelector((state) => state.shopSearch); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      productName &&
      productName.trim() !== "" &&
      productName.trim().length > 1
    ) {
      setTimeout(() => {
        dispatch(getSearchResults(productName));
      }, 1000);
    } else {
      dispatch(resetSearchResults());
    }
  }, [productName]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="container py-4">
      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8">
          <div className="input-group">
            <input
              value={productName}
              name="productName"
              onChange={(event) => setProductName(event.target.value)}
              className="form-control py-3 rounded-3"
              placeholder="Search Products..."
              aria-label="Search Products"
            />
          </div>
        </div>
      </div>

      <div className="search-results">
        {loading ? (
          <h1 className="text-center text-info">Loading...</h1>
        ) : productName && searchResult.length === 0 ? (
          <h1 className="text-center text-danger">No results found...</h1>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {searchResult.map((product) => (
              <div key={product.id} className="col">
                <div
                  className={`card shadow-sm border-0 ${
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
                      className="btn btn-dark w-100 rounded-3"
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
  );
}

export default SearchProducts;
