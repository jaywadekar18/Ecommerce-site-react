import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { AuthContext } from "../shared/AuthContext";
function Navbar() {
    const { cart, wishlist } = useContext(ProductContext);
    const { isLoggedin } = useContext(AuthContext);
    return (
        <div className="navbar">
            <NavLink className="homepage-title" to="/home">
                Book store
            </NavLink>
            <div>
                <input placeholder="search any item here..." />
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
