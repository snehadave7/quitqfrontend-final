import React, { useState, Fragment, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { LayoutDashboard, ShoppingBasket } from "lucide-react"; // Example icons
import "./seller-product.css"; 
import {
  addProduct,
  deleteProduct,
  EditProduct,
  fetchProductBySellerId,
} from "../../service/productSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ProductImageUpload from "./image-upload";
import { fetchAllCategory } from "../../service/categorySlice";
import { fetchAllSubCategory } from "../../service/subCategorySlice";
import SellerProductTile from "./product-tile";

const initialFormData = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  imageUrl: "",
  sellerId: 0,
  categoryId: 0,
  subCategoryId: 0,
};
function SellerProducts() {
  const dispatch = useDispatch();
  const sellerId = parseInt(localStorage.userId);
  const { productList=[] } = useSelector((state) => state.shopProduct);
  const { categoryList } = useSelector((state) => state.shopCategory);
  const { subCategoryList } = useSelector((state) => state.shopSubCategory);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductBySellerId({ sellerId }));
  }, [dispatch]);

  async function onSubmit(event) {
    event.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      imageUrl: currentEditedId ? formData.imageUrl : uploadedImageUrl.imageUrl, // This is the URL returned after uploading the image
      sellerId: currentEditedId ? formData.sellerId : sellerId,
      categoryId: currentEditedId ? formData.categoryId : selectedCategory,
      subCategoryId: currentEditedId
        ? formData.subCategoryId
        : selectedSubCategory,
    };
    // console.log(currentEditedId);
    dispatch(
      currentEditedId ? EditProduct({ formData }) : addProduct({ productData })
    ).then((data) => {
      if (data !== undefined) {
        console.log(data);
        dispatch(fetchProductBySellerId({ sellerId }));

        setImageFile(null);
        setFormData(initialFormData);

        currentEditedId
          ? toast.success("Product Edited")
          : toast.success("Product Added");
        setOpenCreateProductDialog(false);
        setSubmit(true);
      }
    });
  }

   function handleDelete(productId) {
    dispatch(deleteProduct({ productId })).then( (data) => {
      if (data) {
        toast.success("Product Deleted");
         dispatch(fetchProductBySellerId({ sellerId }));
        setSubmit(true);
      }
    });
  }
  return (
    <Fragment>
      <div className="mb-5 w-full d-flex justify-content-end">
        
        <button
        className="btn btn-dark"
          onClick={() => {
            setOpenCreateProductDialog(true);
            setCurrentEditedId(null);
          }}
        >
          Add New Product
        </button>
      </div>
      <div className="row g-4">
        {productList && productList.length > 0
          ? productList.map((item) => (
              <div className="col-md-4 col-lg-3" key={item.id}>
                <SellerProductTile
                  formData={formData}
                  setFormData={setFormData}
                  setOpenCreateProductDialog={setOpenCreateProductDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  product={item}
                  handleDelete={handleDelete}
                />
              </div>
            ))
          : null}
      </div>

      <Offcanvas
        show={openCreateProductDialog}
        onHide={() => setOpenCreateProductDialog(false)}
        placement="end" 
        className="offcanvas-right"
        backdrop="static" 
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {currentEditedId ? "Edit Product" : "Add New Product"}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          isEditMode={currentEditedId !== null}
        />
        <Offcanvas.Body>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name || ""}
                className="form-control"
                id="productName"
                name="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                Description
              </label>
              <textarea
                value={formData.description || ""}
                className="form-control"
                id="productDescription"
                name="description"
                rows="3"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                value={formData.price || ""}
                type="number"
                className="form-control"
                id="productPrice"
                name="price"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productStock" className="form-label">
                Stock Quantity
              </label>
              <input
                value={formData.stock || ""}
                type="number"
                className="form-control"
                id="productStock"
                name="stock"
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
              />
            </div>

            <div
              className="mb-3"
              hidden={currentEditedId}
              disabled={currentEditedId}
            >
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => {
                  dispatch(fetchAllSubCategory(e.target.value));
                  setSelectedCategory(e.target.value);
                  setFormData({ ...formData, categoryId: e.target.value });
                }}
                required={!currentEditedId}
              >
                <option value="">Select Category</option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3" hidden={currentEditedId}>
              <label htmlFor="subCategory" className="form-label">
                Subcategory
              </label>
              <select
                className="form-control"
                id="subCategory"
                name="subCategory"
                value={selectedSubCategory}
                onChange={(e) => {
                  setSelectedSubCategory(e.target.value);
                  setFormData({ ...formData, subCategoryId: e.target.value }); // Update subCategoryId in formData
                }}
                disabled={!selectedCategory}
                required={!currentEditedId}
              >
                <option value="">Select Subcategory</option>
                {subCategoryList.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="dark" type="submit">
              {currentEditedId ? "Edit Product" : "Add Product"}
            </Button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
}

export default SellerProducts;
