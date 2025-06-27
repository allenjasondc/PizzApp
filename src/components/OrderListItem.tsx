import Colors from '@/constants/Colors';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Order } from '@/types/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link, useSegments } from 'expo-router';

// Extend dayjs with the plugin
dayjs.extend(relativeTime);


type OrderListItemProp = {
  orderD: Order
}

    
const OrderListItem = ({orderD}: OrderListItemProp) => {
    //* This is a hook that returns the current route segments as an array of strings.
    const segments = useSegments()

    //* Strange behavior, but it works
    const orderRoute = `/${segments[0]}/orders/${orderD.id}` as `${string}:${string}`
    
     return (
        <Link href={orderRoute} asChild>
            <Pressable style={styles.container}>
                <View>
                    <Text style={styles.title}>Order #{orderD.id}</Text>
                    <Text style={styles.time}>{dayjs(orderD.created_at).fromNow()}</Text>
                </View>

                <Text style={styles.status}>{orderD.status}</Text>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});



export default OrderListItem;