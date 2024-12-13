import React from "react";
import fashion from "../../assests/fashionShop.png"
import electronic from "../../assests/electronicShop.png"
import grocery from "../../assests/groceryShop.png";
import { Link } from "react-router-dom";
const Categories = () => {
   const categories = [
     { name: "Fashion", img: fashion, link: "/clothing" },
     { name: "Grocery", img: grocery, link: "/groceries" },
     { name: "Electronics", img: electronic, link: "/electronics" },
   ];

  return (
    <div className="container mt-4">
      <h3>Shop by Category</h3>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4" key={index}>
            <Link
              to={category.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card">
                <img
                  src={category.img}
                  className="card-img-top"
                  alt={category.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
