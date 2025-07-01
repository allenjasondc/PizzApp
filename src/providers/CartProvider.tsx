import ProductListItem from "@/components/ProductListItem";
import { CartItem } from "@/types/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import {randomUUID} from 'expo-crypto'
import { Tables } from "@/types/database.types";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order_items";

type Product = Tables<"products">

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity:(itemID: string, amount: -1 | 1) => void,
    total: number,
    checkOut: () => void
}
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
    checkOut: () => {}
});

const CartProvider = ({children}: PropsWithChildren) => {
    const [items,setItems] = useState<CartItem[]>([]);

    const {mutate: insertOrder} = useInsertOrder()
    const {mutate: insertOrderItems} = useInsertOrderItems()
    const router = useRouter()

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


    const checkOut = () => {
        //console.warn("Check out")
        insertOrder(
            {total}, 
            {onSuccess: saveOrderItems}
        )
    }

    const saveOrderItems = (order: Tables<"orders">) => {
        const orderItems = items.map((carItem) => ({
            order_id: order.id,
            product_id: carItem.product_id,
            quantity: carItem.quantity,
            size: carItem.size
        }))

        insertOrderItems(orderItems, {
            onSuccess() {
                console.log(order)
                clearCart()
                router.push(`/(user)/orders/${order.id}`)
            }
        })
        
        
    }

    const clearCart = () => {
        setItems([])
    }

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total, checkOut}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider  

export const useCart = () => useContext(CartContext)