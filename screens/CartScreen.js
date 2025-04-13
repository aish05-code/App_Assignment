import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../contexts/CartContext';

export default function CartScreen() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.quantity}>Quantity: {item.quantity || 1}</Text>
                  <Text style={styles.price}>${(item.price * (item.quantity || 1)).toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>x</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.total}>Total: ${total}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  empty: { fontSize: 18, textAlign: 'center', marginTop: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#E6F0FA',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  image: { width: 60, height: 60, marginRight: 12, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  quantity: { fontSize: 14, color: '#555' },
  price: { fontSize: 16, color: '#2A4D69', marginTop: 4 },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
    color: '#2A4D69',
  },
  remove: {
    fontSize: 22,
    marginLeft: 10,
  },
});
