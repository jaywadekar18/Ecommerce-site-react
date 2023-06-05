import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../shared/ProductContext";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
  const { addProductInCart, addProductInWishlist } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((r) => setProduct(r.product))
      .catch((err) => console.log(err));
  }, [id]);
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
              Rs.{product.price}{" "}
              <span className="original-price">Rs.{product.originalPrice}</span>
            </p>
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                addProductInCart(product);
              }}
            >
              Add to cart 🛒
            </button>
            <button
              className="add-to-wishlist-btn"
              onClick={(e) => {
                addProductInWishlist(product);
              }}
            >
              Add to Wishlist 🧡
            </button>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}
