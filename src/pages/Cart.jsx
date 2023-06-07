import React, { useContext, useState } from "react";
import { ProductContext } from "../shared/ProductContext";
import { NavLink, useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeProductFromCart, updateCart } =
    useContext(ProductContext);
  const navigate = useNavigate();
  useState(() => {}, [cart]);
  console.log("cart", cart);
  const handleQuantity = (_id, action) => {
    updateCart(_id, action);
  };
  const removeProduct = (_id) => {
    removeProductFromCart(_id);
  };
  const totalPrice = () => {
    return cart.reduce((total, product) => {
      return (total = product.price * (product.quantity || 0) + total);
    }, 0);
  };
  const totalOriginalPrice = () => {
    return cart.reduce((total, product) => {
      return (total = product.originalPrice * (product.quantity || 0) + total);
    }, 0);
  };
  return (
    <div>
      <p className="page-heading">Cart 🛒</p>
      <div className="cart-container">
        <div className="cart-card-list">
          {cart.length > 0 &&
            cart.map((product) => (
              <div className="cart-card" key={product._id}>
                <img src={product.imageLink} alt="prod img" />
                <div className="cart-detail">
                  <div>
                    <p className="card-title">{product.name}</p>
                    <p className="card-author">{product.author}</p>
                    <p className="price">Rs.{product.price}</p>
                  </div>
                  <div className="cart-action-btns">
                    <button
                      onClick={() => handleQuantity(product._id, "decrement")}
                    >
                      ➖
                    </button>

                    {product?.quantity ?? 0}
                    <button
                      onClick={() => handleQuantity(product._id, "increment")}
                    >
                      ➕
                    </button>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeProduct(product._id)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="checkout-section border">
          <p> Order details</p>

          <p className="flex-space-between">
            <span>Original price</span> <span>Rs. {totalOriginalPrice()}</span>
          </p>

          <p className="flex-space-between">
            <span>Discount</span>
            <span>- Rs. {totalOriginalPrice() - totalPrice()}</span>
          </p>
          <p className="flex-space-between">
            <span> Total price </span>
            <span> Rs. {totalPrice()}</span>
          </p>
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
