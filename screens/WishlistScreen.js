import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../contexts/CartContext';

export default function WishlistScreen() {
  const { wishlist, removeFromWishlist } = useContext(CartContext);

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.empty}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                <Text style={styles.remove}>x</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    backgroundColor: '#F4F8FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  image: { width: 60, height: 60, marginRight: 12, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  price: { fontSize: 16, color: '#2A4D69', marginTop: 4 },
  remove: {
    fontSize: 22,
    marginLeft: 10,
  },
});
