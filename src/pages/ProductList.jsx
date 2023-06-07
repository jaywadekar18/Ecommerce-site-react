import React, { useState, useEffect, useContext } from "react";
import Card from "../shared/Card";
import {
  ProductContext,
  DEFAULT_FILTER_VALUES,
} from "../shared/ProductContext";
import { useNavigate } from "react-router-dom";
import loader from "../static/loader.gif";
function ProductList() {
  const { filters, setFilters, cart, addProductInCart } =
    useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((r) => {
        setProducts(r.products);
        setFilteredProducts(r.products);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    return () => {
      setFilters(DEFAULT_FILTER_VALUES);
    };
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
    dochanges();
  }, [filters]);

  const isProductPresentInCart = (_id) => {
    return Boolean(cart.find((product) => product._id === _id));
  };
  const dochanges = () => {
    const { rating, category, price, search } = filters;
    let newList = products.filter(
      (product) => Number(product.rating) >= Number(rating)
    );
    newList = newList.reduce((acc, curr) => {
      if (category.includes(curr.category) || category.length === 0) {
        acc.push(curr);
      }
      return acc;
    }, []);
    newList = newList?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    if (price === "low-to-high") {
      newList.sort((a, b) => a.price - b.price);
    } else newList.sort((a, b) => b.price - a.price);
    setFilteredProducts([...newList]);
  };
  useEffect(() => {
    if (products?.length > 0) {
      dochanges();
    }
  }, [products]);
  return (
    <div>
      {loading ? (
        <div className="loader">
          <img className="loader-img" src={loader} alt="loading-screen" />
        </div>
      ) : (
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
                checked={filters.price.includes("low-to-high")}
                onChange={applyFilters}
              />
              low-to-high
            </label>

            <label>
              <input
                type="radio"
                value="high-to-low"
                name="price"
                checked={filters.price.includes("high-to-low")}
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
            <button
              className="clear-filters-btn"
              onClick={() => setFilters(DEFAULT_FILTER_VALUES)}
            >
              Clear filters
            </button>
          </div>
          <div className="product-list">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <Card key={product._id} item={product}>
                  {isProductPresentInCart(product._id) ? (
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        navigate("/cart");
                        e.stopPropagation();
                      }}
                    >
                      Go to cart 🛒
                    </button>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        addProductInCart(product);
                        e.stopPropagation();
                      }}
                    >
                      Add to Cart 🛒
                    </button>
                  )}
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
