import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from "react-native"
import { useState } from "react"
import { defaultPizzaImage } from "@/components/ProductListItem"
import { useCart } from "@/providers/CartProvider"
import { PizzaSize } from "@/types/types"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import { useProduct } from "@/api/products"
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
            <Stack.Screen 
              options={{
                title: "Menu",
                headerRight: () => (
                  <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="pencil"
                          size={25}
                          color={Colors.light.tint}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                  </Link>
                ),
                
            }}/>

            <Stack.Screen options={{title:productDetails.name}} />


            <RemoteImage 
                style={styles.image} 
                path={productDetails?.image}
                fallback={defaultPizzaImage}
            />


            

            <Text style={styles.title}>{productDetails.name}</Text>
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
    title: {
        fontSize:20,
        fontWeight:"bold"
    },
    price: {
        fontSize:18,
        fontWeight:"bold"
    },
})

export default ProductDetailScreen






