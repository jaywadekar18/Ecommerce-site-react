import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { ProductContext } from './ProductContext'

function Card({ item }) {
    const { addProductInCart, addProductInWishlist } = useContext(ProductContext);
    const navigate = useNavigate();

    const navigateToProductPage = (productId) => {
        navigate(`/product/${productId}`)
    }
    return (
        <div className='card' onClick={() => navigateToProductPage(item._id)}>

            <img className='card-image' src={item.imageLink} />
            <div className='card-detail'>
                <p>{item.name}</p>
                <p>{item.author}</p>
                <p>Rs.{item.price}  <span>  {item.rating}⭐</span></p>
                <div className='card-action-btns'>

                    <button onClick={(e) => { addProductInCart(item); e.stopPropagation() }}>Add to cart</button>
                    <button onClick={(e) => { addProductInWishlist(item); e.stopPropagation() }}>Add to Wishlist</button>
                </div>
            </div>
        </div>
    )
}

export default Card