import React, { useContext, useState } from "react";
import { ProductContext } from "../shared/ProductContext";

function Cart() {
    const { cart, removeProductFromCart, updateCart } =
        useContext(ProductContext);

    useState(() => { }, [cart]);
    console.log("cart", cart);
    const handleQuantity = (_id, action) => {
        updateCart(_id, action)
    };
    const removeProduct = (_id) => {
        removeProductFromCart(_id)
    }
    const totalPrice = () => {
        return cart.reduce((total, product) => {
            return total = product.price * (product.quantity || 0) + total
        }, 0)
    }
    const totalOriginalPrice = () => {
        return cart.reduce((total, product) => {
            return total = product.originalPrice * (product.quantity || 0) + total
        }, 0)
    }
    return (
        <div className="cart-container">
            <div className="cart-card-list">
                {cart.length > 0 &&
                    cart.map((product) => (
                        <div className="cart-card">
                            <img src={product.imageLink} alt="prod img" />
                            <div className="cart-detail">
                                <div>
                                    <p>{product.name}</p>
                                    <p>{product.author}</p>
                                    <p>Rs.{product.price}</p>
                                </div>
                                <div className="cart-action-btns">
                                    <button
                                        onClick={() => handleQuantity(product._id, "decrement")}
                                    >
                                        -
                                    </button>

                                    {product?.quantity ?? 0}
                                    <button
                                        onClick={() => handleQuantity(product._id, "increment")}
                                    >+</button>
                                </div>
                                <button
                                    className="remove-item-btn"
                                    onClick={() => removeProduct(product._id)}
                                >X</button>

                            </div>
                        </div>
                    ))}
            </div>
            <div className="checkout-section border">
                <p> Order details</p>

                <p>Original price Rs. {totalOriginalPrice()}</p>

                <p>Discount Rs. {totalOriginalPrice() - totalPrice()}</p>
                <p>Total price Rs. {totalPrice()}</p>

            </div>
        </div>
    );
}

export default Cart;
