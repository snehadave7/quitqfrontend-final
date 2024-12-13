import React, { useState } from "react";
import { addProduct } from "../../store/productSlice";
import { toast } from "react-toastify";
import axios from "axios";

const  AddProduct = () => {

  async function generateOptions(selectType){
    const BASE_URL="";
    if(selectType==="category"){
      BASE_URL="";
    }
    else if(selectType==="subCategory"){
      BASE_URL="";
    }

    const request=await axios.get(BASE_URL);
    const response=await request.data;
    

  }
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    sellerId: 0,
    categoryId: 0,
    subCategoryId: 0,
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "Product Name is required";
    if (!product.description)
      newErrors.description = "Product description is required";
    if (!product.price) newErrors.price = "Product price is required";
    if (!product.stock) newErrors.stock = "Product stock is required";
    if (!product.imageUrl) newErrors.imageUrl = "Product image is required";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    const newErrors = validate();
    setErrors({ ...errors, [name]: newErrors[name] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Product data" + product);

      dispatch(addProduct(product)).then((result) => {
        if (result.payload.status === "Success") {
          setProduct({
            name: "",
            description: "",
            price: 0,
            stock: 0,
            imageUrl: "",
            sellerId: 0,
            categoryId: 0,
            subCategoryId: 0,
          });
        } else {
          if (result.payload.message) {
            toast.error("Failed to add product");
          }
        }
      });
    }

    
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Product Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
          {errors.stock && <span className="error">{errors.stock}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
          />
          {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
        </div>
        <div className="mb-3">
          <select name="categoryId" value={product.categoryId} onChange={handleChange}>
            {generateOptions("category")}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
