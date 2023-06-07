import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

function Card({ item, children }) {
  const { addProductInWishlist, removeProductFromWishlist, wishlist } =
    useContext(ProductContext);
  const navigate = useNavigate();

  const navigateToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };
  const isProductPresentInWishlist = (_id) => {
    return Boolean(wishlist.find((product) => product._id === _id));
  };
  return (
    <div className="card" onClick={() => navigateToProductPage(item._id)}>
      <img className="card-image" src={item.imageLink} alt="book image" />
      <div className="card-detail">
        <p className="card-title-container">
          <span className="card-title">{item.name}</span>
          <span className="rating"> {item.rating}★</span>
        </p>
        <p className="author">{item.author}</p>
        <p className="price">
          <span>Rs.{item.price}</span>{" "}
          <span className="original-price">Rs.{item.originalPrice}</span>{" "}
        </p>
        <div className="card-action-btns">
          {children}
          {isProductPresentInWishlist(item._id) ? (
            <button
              className="add-to-wishlist-btn"
              onClick={(e) => {
                removeProductFromWishlist(item._id);
                e.stopPropagation();
              }}
            >
              Remove from wishlist
            </button>
          ) : (
            <button
              className="add-to-wishlist-btn"
              onClick={(e) => {
                addProductInWishlist(item);
                e.stopPropagation();
              }}
            >
              Add to Wishlist 🧡
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
