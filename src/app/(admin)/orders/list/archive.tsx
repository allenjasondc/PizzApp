import { FlatList, StyleSheet, Text, View } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";


export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
          data={orders}
          renderItem={({item})=><OrderListItem orderD={item} />}
          contentContainerStyle={{gap:10, padding:10}}
          // columnWrapperStyle={{gap:10}}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor: "aliceblue",
    padding:10
  },
})