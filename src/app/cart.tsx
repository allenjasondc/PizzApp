import { View, Text, StyleSheet, Platform, FlatList } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";


const CartScreen = () => {

    const{items, total, checkOut} = useCart()


    return (
        <View style={styles.container}>
            <Text>
                Cart items length {items.length}
            </Text>

            <FlatList
                data={items}
                renderItem={({item})=><CartListItem cartItem={item}></CartListItem>}
                contentContainerStyle={{padding: 10, gap: 10}}
                
            />

            <Text style={styles.totalAmount}>Total: ${total}</Text>
            <Button text="Check out" onPress={checkOut} />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        padding: 10
    },
    totalAmount: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 500
    },
})


export default CartScreen;

