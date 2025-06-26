import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import products from "@assets/data/products"
import { useState } from "react"
import { defaultPizzaImage } from "@/components/ProductListItem"
import Button from "@/components/Button"
import { useCart } from "@/providers/CartProvider"
import { PizzaSize } from "@/types/types"

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailScreen = () => {

    const {id} = useLocalSearchParams();
    const {addItem} = useCart();
    const router = useRouter()
    
    const [selectedSize,setSelectedSize] = useState<PizzaSize>('M')
    const productDetails = products.find((p) => p.id.toString() == id)

    const addToCart = () => {
        
        if(!productDetails){
            return;
        }
        addItem(productDetails, selectedSize)
        router.push("/cart")
    }



    if(!productDetails){
        return <Text>Product not found</Text>
    }
    

    

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title:productDetails.name}} />


            <Image style={styles.image} source={{uri:productDetails.image || defaultPizzaImage}} />


            <Text>Select size: </Text>
            <View style={styles.sizes}>
                {sizes.map((sayZ,index) => (
                    <Pressable 
                        onPress={()=>{setSelectedSize(sayZ)}}
                        style={[styles.size, {backgroundColor: selectedSize==sayZ ? 'gainsboro':'white'}]} 
                        key={index}>
                        <Text style={[styles.sizeText,{color: selectedSize==sayZ ? 'black':'gray'}]}>{sayZ}</Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.price}>${productDetails.price}</Text>
            <Button onPress={addToCart} text="Add to cart"/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex:1,
        padding:10
    },
    image: {
        aspectRatio:1,
        width:"100%"
    },
    sizes: {
        flexDirection:"row",
        justifyContent:"space-around",
    },
    size: {
        backgroundColor:'gainsboro',
        width:50,
        borderRadius:25,
        aspectRatio:1,
        justifyContent:"center",
        alignItems:"center",        
    },
    sizeText: {
        fontSize:20,
        fontWeight:"500"
    },
    price: {
        marginTop:"auto",
        fontSize:18,
        fontWeight:"bold"
    },
})

export default ProductDetailScreen






