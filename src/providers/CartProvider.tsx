import ProductListItem from "@/components/ProductListItem";
import { CartItem, Product } from "@/types/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import {randomUUID} from 'expo-crypto'


type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity:(itemID: string, amount: -1 | 1) => void,
    total: number
}
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0
});

const CartProvider = ({children}: PropsWithChildren) => {
    const [items,setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        
        //if already in cart, increment quantity
        const existingItem = items.find(
            (item) => item.product == product && item.size == size
        )

        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }

         const newCartItem: CartItem = {
            id: randomUUID(), //generate
            product,
            product_id: product.id,
            size,
            quantity: 1
         }

         setItems([newCartItem, ...items])
    }

    //update qty
    const updateQuantity = (itemID: string, amount: -1 | 1) => {
        //console.log(itemID, amount)
        
        setItems(
            items.map(item =>
                item.id !== itemID 
                ? item : {...item, quantity: item.quantity + amount}
            )
            .filter((item) => item.quantity > 0)
        )
    }


    //console.log(items)

    const total = items.reduce((sum, item)=> (sum += item.product.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider  

export const useCart = () => useContext(CartContext)