import Colors from '@/constants/Colors';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/types/database.types';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"


type ProductListItemProp = {
  productD: Tables<"products">
}


const ProductListItem = ({productD}: ProductListItemProp) => {
     //* This is a hook that returns the current route segments as an array of strings.
    const segments = useSegments()

    //* Strange behavior, but it works
    const productRoute = `/${segments[0]}/menu/${productD.id}` as `${string}:${string}`


  return (
     <Link href={productRoute} asChild>
      <Pressable style={styles.container}>
        <RemoteImage 
          style={styles.image} 
          path={productD.image}
          fallback={defaultPizzaImage}
        />
        <Text style={styles.name}>{productD.name}</Text>
        <Text style={styles.price}>{productD.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    padding:10,
    borderRadius:10,
    flex:1,
    maxWidth: "50%"
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    color:Colors.light.tint
  },
  image: {
    width:"100%",
    resizeMode:"contain",
    aspectRatio:1
  },
});



export default ProductListItem;