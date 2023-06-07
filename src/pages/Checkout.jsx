import React, { useContext, useState } from "react";
import { ProductContext } from "../shared/ProductContext";
import { AuthContext } from "../shared/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const { cart, removeProductFromCart, updateCart } =
    useContext(ProductContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [address, setAddress] = useState(user.address[0]);
  const navigate = useNavigate();
  console.log("cart", cart);
  const handleAdress = (address) => {
    setAddress(address);
  };
  const handleOrder = () => {
    toast.success("Order placed Successfulllyyy!!!!!!!!");
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };
  return (
    <div>
      <p className="page-heading">Checkout 🚚</p>
      <div className="checkout-page-container">
        <div className="checkout-order-detail">
          <p className="page-sub-heading">Select delivery address</p>
          {user?.address?.map(
            ({ _id, name, street, state, zipCode, mobile }, index) => (
              <div className="border address-card">
                <label>
                  <input
                    type="radio"
                    value={_id}
                    name="address"
                    // checked={address}
                    onChange={() => handleAdress(user?.address[index])}
                  />
                  <p>{name},</p> {street},{state},{zipCode}
                  <p>Phone no. {mobile}</p>
                </label>
              </div>
            )
          )}
        </div>
        <div className="checkout-address-section ">
          <p className="page-sub-heading">Summary</p>
          {cart?.length > 0 && (
            <div className="border" style={{ padding: "1rem" }}>
              <p
                className="flex-space-between checkout-page-product-title"
                style={{ fontSize: "1.3rem", color: "grey" }}
              >
                <span>Book name</span> Quantity{" "}
              </p>
              {cart.map((product) => (
                <p className="flex-space-between  checkout-page-product-title">
                  <span className="">{product.name}</span>
                  <span>X {product.quantity}</span>
                </p>
              ))}
            </div>
          )}
          <button className="placeorder-btn" onClick={handleOrder}>
            Place order 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
