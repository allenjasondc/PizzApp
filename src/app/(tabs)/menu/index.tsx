import { FlatList, View } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import products from "@assets/data/products";


export default function MenuScreen() {
  return (
    <View>
      <FlatList 
          data={products}
          renderItem={({item})=><ProductListItem productD={item} />}
          numColumns={2}
          contentContainerStyle={{gap:10, padding:10}}
          columnWrapperStyle={{gap:10}}
      />
    </View>
  );
}