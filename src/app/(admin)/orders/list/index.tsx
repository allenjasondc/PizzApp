import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/api/orders/subscriptions";

export default function OrderScreen() {  

  const {data: orders, isLoading, error} = useAdminOrderList({archived: false})
  
  useInsertOrderSubscription()

  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Failed to fetch products</Text>
  }

  
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