import { View, Text, StyleSheet, Platform } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useCart } from "providers/CartProvider";


const CartScreen = () => {

    const{items} = useCart()


    return (
        <View style={styles.container}>
            <Text>
                Cart items length {items.length}
            </Text>

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:"white"
    }
})


export default CartScreen;

