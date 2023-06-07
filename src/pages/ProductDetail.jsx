import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../shared/ProductContext";
import { useParams, useNavigate } from "react-router-dom";
import loader from "../static/loader.gif";
export default function ProductDetails() {
  const {
    addProductInCart,
    addProductInWishlist,
    wishlist,
    cart,
    removeProductFromWishlist,
  } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((r) => setProduct(r.product))
      .catch((err) => console.log(err));
  }, [id]);
  const isProductPresentInWishlist = (_id) => {
    return Boolean(wishlist.find((product) => product._id === _id));
  };
  const isProductPresentInCart = (_id) => {
    return Boolean(cart.find((product) => product._id === _id));
  };
  // const { imgLink, title, discription, price } = product
  return (
    <>
      {product ? (
        <div className="product-details-main-container">
          <div className="border product-image-container">
            <img src={product.imageLink} className="product-image " />
          </div>
          <div className="product-details">
            <p className="title">{product.name}</p>
            <p className="discription">{product.author}</p>
            <p className="price">
              <span>Rs.{product.price} </span>

              <span className="original-price">Rs.{product.originalPrice}</span>
            </p>
            {isProductPresentInCart(product._id) ? (
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  navigate("/cart");
                }}
              >
                Go to cart 🛒
              </button>
            ) : (
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  addProductInCart(product);
                }}
              >
                Add to cart 🛒
              </button>
            )}

            {isProductPresentInWishlist(product._id) ? (
              <button
                className="add-to-wishlist-btn"
                onClick={(e) => {
                  removeProductFromWishlist(product._id);
                }}
              >
                Remove from wishlist
              </button>
            ) : (
              <button
                className="add-to-wishlist-btn"
                onClick={(e) => {
                  addProductInWishlist(product);
                }}
              >
                Add to Wishlist 🧡
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="loader">
          <img className="loader-img" src={loader} alt="loading-screen" />
        </div>
      )}
    </>
  );
}
