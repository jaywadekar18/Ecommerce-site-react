import React, { useContext } from "react";
import { ProductContext } from '../shared/ProductContext'
export default function Wishlist() {
  const { wishlist } = useContext(ProductContext);
  return (
    <div>
      wishlist
      <div>
        {wishlist.length > 0 && wishlist.map((product) => <div>{product.name}</div>)}
      </div>
    </div>
  )
}
