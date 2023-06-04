import { createContext, useState } from "react";
export const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [order, setOrder] = useState({});
    const setNewOrder = (c) => {
        setOrder(setOrder);
    };

    return (
        <OrderContext.Provider
            value={{
                order, setNewOrder
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
