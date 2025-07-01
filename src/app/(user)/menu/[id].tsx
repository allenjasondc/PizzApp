import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import { useState } from "react"
import { defaultPizzaImage } from "@/components/ProductListItem"
import Button from "@/components/Button"
import { useCart } from "@/providers/CartProvider"
import { PizzaSize } from "@/types/types"
import { useProduct } from "@/api/products"
import { ActivityIndicator } from "react-native"
import RemoteImage from "@/components/RemoteImage"

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailScreen = () => {

    const {id: idString} = useLocalSearchParams();
    const id = parseFloat(typeof idString == "string" ? idString : idString[0])

    const {data: productDetails, error, isLoading} = useProduct(id);

    const {addItem} = useCart();
    const router = useRouter()
    
    const [selectedSize,setSelectedSize] = useState<PizzaSize>('M')

    const addToCart = () => {
        
        if(!productDetails){
            return;
        }
        addItem(productDetails, selectedSize)
        router.push("/cart")
    }

    if(isLoading){
        return <ActivityIndicator />
      }
    
      if(error){
        return <Text>Failed to fetch products</Text>
      }

    

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title:productDetails.name}} />


            <RemoteImage 
                style={styles.image} 
                path={productDetails?.image}
                fallback={defaultPizzaImage}
            />


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






