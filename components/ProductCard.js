import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CartContext } from '../contexts/CartContext';

const screenWidth = Dimensions.get('window').width;

export default function ProductCard({ product, onPress }) {
  const { wishlist, addToWishlist } = useContext(CartContext);
  const isFav = wishlist.find(item => item.id === product.id);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <TouchableOpacity onPress={() => addToWishlist(product)}>
        <Text style={{ color: isFav ? 'red' : 'gray', marginTop: 5 }}>
          {isFav ? '♥' : '♡'} Wishlist
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth / 2 - 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f8f8',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#4b84e4',
  },
});
