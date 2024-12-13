import React, { Fragment, useEffect, useState } from "react";
import "./filter.css"
function ProductFilter({ onFilterChange,categoryId }) {
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  useEffect(() => {
    const fetchsubCategory = async () => {
      let BASE_URL = `https://localhost:7152/api/SubCategories?catId=${categoryId}`;
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("subcatdata", data);

        const subCategoryArray = data.$values || [];
        setSubCategory(subCategoryArray);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchsubCategory();
    setSelectedSubCategory([]);
  },[categoryId]);

  const handleCheckboxChange = (name) => {
    let updatedSelection;
    if (selectedSubCategory.includes(name)) {
      updatedSelection = selectedSubCategory.filter(
        (catName) => catName !== name
      );
    } else {
      updatedSelection = [...selectedSubCategory, name];
    }
    setSelectedSubCategory(updatedSelection);
    onFilterChange(updatedSelection);
  };

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 style={{ fontSize: "25px" }}>Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        <h4>SubCategory</h4>
        {subCategory.map((cat) => (
          <Fragment key={cat.id}>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`checkbox-${cat.id}`}
                name={cat.name}
                value={cat.name}
                onChange={() => handleCheckboxChange(cat.name)}
                // checked={selectedSubCategory.includes(cat.name)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <label
                htmlFor={`checkbox-${cat.name}`}
                className="text-sm font-medium"
                style={{ fontSize: "18px" }}
              >
                {cat.name}
              </label>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
export default ProductFilter;
