import ProductListItem from "@/components/ProductListItem";
import { CartItem, Product } from "@/types/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void
}
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {}
});

const CartProvider = ({children}: PropsWithChildren) => {

    const [items,setItems] = useState<CartItem[]>([]);


    //if already in cart, increment quantity
    const addItem = (product: Product, size: CartItem['size']) => {
         const newCartItem: CartItem = {
            id:'1', //generate
            product,
            product_id: product.id,
            size,
            quantity: 1
         }

         setItems([newCartItem, ...items])
    }

    //update qty
    console.log(items)

    return (
        <CartContext.Provider value={{items, addItem}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider  

export const useCart = () => useContext(CartContext)