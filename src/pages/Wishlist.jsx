import React, { useContext } from "react";
import { ProductContext } from "../shared/ProductContext";
import Card from "../shared/Card";
export default function Wishlist() {
  const { wishlist } = useContext(ProductContext);
  return (
    <div>
      <p className="page-heading">Wishlist🧡</p>

      <div className="product-list">
        {wishlist.length > 0 &&
          wishlist.map((product) => <Card key={product.id} item={product} />)}
      </div>
    </div>
  );
}
