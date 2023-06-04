import React, { useContext } from 'react'
import { OrderContext } from '../shared/OrderContext'

function Checkout() {
    const { order } = useContext(OrderContext)
    return (
        <div>
            <p>Checkout</p>
            <div>
                <div className='checkout-address-section'></div>
                <div className='checkout-order-detail'></div>
            </div>
        </div>
    )
}

export default Checkout