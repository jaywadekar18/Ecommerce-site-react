import { createContext, useState } from "react";
import { toast } from "react-toastify";
export const ProductContext = createContext();
export const DEFAULT_FILTER_VALUES = {
  search: "",
  category: [],
  rating: 0,
  price: "",
};
export function ProductProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTER_VALUES);
  const [wishlist, setWishlist] = useState([]);

  const addProductInCart = (newProduct) => {
    const isProductInCart = cart.find(
      (product) => product._id === newProduct._id
    );
    if (isProductInCart) {
      setCart((list) =>
        list.map((product) => {
          if (product._id === newProduct._id) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        })
      );
      toast.success("Quantity of product in Cart is Incriesed!");
      return;
    }
    toast.success("Item added in Cart!");
    setCart((list) => [...list, { ...newProduct, quantity: 1 }]);
  };

  const removeProductFromCart = (productId) => {
    setCart((list) => list.filter(({ _id }) => _id !== productId));
    toast.success("Item removed from Cart!");
  };
  const updateCart = (productId, action) => {
    setCart((currentCart) => {
      return currentCart.map((product) => {
        if (product._id === productId) {
          if (action === "increment") {
            return { ...product, quantity: product.quantity + 1 };
          } else if (action === "decrement") {
            if (product.quantity === 1) {
              return product;
            }
            return { ...product, quantity: product.quantity - 1 };
          }
        }
        return product;
      });
    });
  };
  const addProductInWishlist = (newProduct) => {
    const isProductInWishlist = wishlist.find(
      (product) => product._id === newProduct._id
    );
    if (isProductInWishlist) {
      return;
    }

    setWishlist((list) => [...list, newProduct]);
    toast.success("Item added in Wishlist!");
  };
  const removeProductFromWishlist = (productId) => {
    toast.success("Item removed from Wishlist!");
    setWishlist((list) => list.filter(({ _id }) => _id !== productId));
  };
  return (
    <ProductContext.Provider
      value={{
        cart,
        addProductInCart,
        removeProductFromCart,
        updateCart,
        addProductInWishlist,
        wishlist,
        removeProductFromWishlist,
        filters,
        setFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
