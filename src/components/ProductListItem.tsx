import Colors from '@/constants/Colors';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Product } from '@/types/types';
import { Link } from 'expo-router';


export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"


type ProductListItemProp = {
  productD: Product
}


const ProductListItem = ({productD}: ProductListItemProp) => {
  return (
    <Link href={`/menu/${productD.id}`} asChild>
      <Pressable style={styles.container}>
        <Image style={styles.image} source={{uri: productD.image || defaultPizzaImage}}/>
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
    flex:1
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