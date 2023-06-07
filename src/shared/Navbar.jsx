import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { AuthContext } from "../shared/AuthContext";
function Navbar() {
  const { cart, wishlist, filters, setFilters } = useContext(ProductContext);
  const { isLoggedin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFilters((filters) => ({ ...filters, search: e.target.value }));
  };
  const navigateToProductList = () => {
    navigate("/product-list");
  };
  return (
    <div className="navbar">
      <NavLink className="homepage-title" to="/home">
        Book store📚
      </NavLink>
      <div>
        <input
          className="search-bar"
          value={filters.search}
          placeholder="Search a book..."
          onChange={handleChange}
          onClick={navigateToProductList}
        />
      </div>
      <div>
        <NavLink className="navitem-wishlist" to="/wishlist">
          <span>🧡</span>
          <span className="wishlist-count">{wishlist.length}</span>
        </NavLink>
        <NavLink className="navitem-wishlist" to="/cart">
          <span>🛒</span>
          <span className="wishlist-count">{cart.length}</span>
        </NavLink>
        {isLoggedin ? (
          <NavLink to="/profile">🤵</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
