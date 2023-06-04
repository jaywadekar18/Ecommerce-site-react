import React, { useState, useEffect, useContext } from "react";
import Card from "../shared/Card";
import { useNavigate, useLocation } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  let { state } = useLocation();
  const [filters, setFilters] = useState({
    category: [],
    rating: 0,
    price: "low-to-high",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((r) => {
        setProducts(r.products);
        setFilteredProducts(r.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const applyFilters = (e) => {
    console.log(e);
    const { name, value, checked } = e.target;

    setFilters((curr) => {
      if (name === "category") {
        if (checked) {
          return {
            ...curr,
            category: [...curr.category, value],
          };
        } else {
          const updatedCategories = curr.category.filter(
            (cat) => cat !== value
          );
          return { ...curr, category: [...updatedCategories] };
        }
      }

      return { ...curr, [name]: value };
    });
  };
  useEffect(() => {
    console.log("filters", filters);

    console.log("products", products);
    dochanges();
  }, [filters]);

  const dochanges = () => {
    const { rating, category, price } = filters;
    let newList = products.filter(
      (product) => Number(product.rating) >= Number(rating)
    );
    newList = newList.reduce((acc, curr) => {
      if (category.includes(curr.category) || category.length === 0) {
        acc.push(curr);
      }
      return acc;
    }, []);
    if (price === "low-to-high") {
      newList.sort((a, b) => a.price - b.price);
    } else newList.sort((a, b) => b.price - a.price);
    setFilteredProducts([...newList]);
    console.log("newList", newList);
  };
  // useEffect(() => {
  //   return () => {
  //     console.log('ondestroy');
  //     if (state) state.applyOnce = false;

  //   }
  // }, [])
  useEffect(() => {
    console.log("state", state);
    if (products?.length > 0 && state?.applyOnce) {
      const filters = {
        target: { name: "category", value: state.category, checked: true },
      };
      applyFilters(filters);
      state.applyOnce = false;
    }
  }, [products]);
  return (
    <div className="product-list-container">
      <div className="filters">
        <p className="filter-title">Rating</p>
        <label>
          <input
            type="range"
            name="rating"
            min={0}
            max={5}
            onChange={applyFilters}
            value={filters.rating}
          />
        </label>
        <p className="filter-title">Sort by</p>
        <label>
          <input
            type="radio"
            value="low-to-high"
            name="price"
            // checked={filters.category.includes("low-to-high")}
            onChange={applyFilters}
          />
          low-to-high
        </label>

        <label>
          <input
            type="radio"
            value="high-to-low"
            name="price"
            // checked={filters.category.includes("high-to-low")}
            onChange={applyFilters}
          />
          high-to-low
        </label>
        <p className="filter-title">Category</p>
        <label>
          <input
            type="checkbox"
            value="Fiction"
            name="category"
            checked={filters.category.includes("Fiction")}
            onChange={applyFilters}
          />
          Fiction
        </label>

        <label>
          <input
            type="checkbox"
            value="Non Fiction"
            name="category"
            checked={filters.category.includes("Non Fiction")}
            onChange={applyFilters}
          />
          Non Fiction
        </label>

        <label>
          <input
            type="checkbox"
            value="Self Help"
            name="category"
            checked={filters.category.includes("Self Help")}
            onChange={applyFilters}
          />
          Self Help
        </label>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <Card key={product.id} item={product} />
          ))}
      </div>
    </div>
  );
}

export default ProductList;
