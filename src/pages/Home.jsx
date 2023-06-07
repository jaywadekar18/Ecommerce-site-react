import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../shared/ProductContext";
function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { setFilters } = useContext(ProductContext);
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((res) => setCategories(res.categories))
      .catch((err) => console.log(err));
  }, []);
  const navigateToProductlistPage = (category) => {
    console.log("categorycategorycategory", category);
    setFilters((filters) => ({ ...filters, search: "", category: [category] }));
    navigate(`/product-list`);
  };
  return (
    <div>
      <div
        className="banner-image"
        style={{
          backgroundImage: `url(https://www.bookswagon.com/images/bannerimages/80_inr.jpg?v=1.6)`,
        }}
      ></div>
      <p className="home-page-category-title">Categories</p>
      <div className="category-container">
        {categories.length > 0 &&
          categories.map(({ _id, categoryName, description }) => (
            <div
              className="categoryCard"
              key={_id}
              onClick={() => navigateToProductlistPage(categoryName)}
            >
              <p>{categoryName}</p>
              <p>{description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
