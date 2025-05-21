import { Stack, useLocalSearchParams } from "expo-router"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import products from "@assets/data/products"
import { useState } from "react"
import { defaultPizzaImage } from "@/components/ProductListItem"
import Colors from "@/constants/Colors"

const sizes = ['S', 'M', 'L', 'XL']

const ProductDetailScreen = () => {

    const {id} = useLocalSearchParams();
    const [selectedSize,setSelectedSize] = useState('M')
    const productDetails = products.find(p => p.id.toString() == id)

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
        fontSize:20,
        color:Colors.light.tint
    },
})

export default ProductDetailScreen






