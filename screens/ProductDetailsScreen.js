import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList
} from 'react-native';
import { CartContext } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  const isFav = wishlist.some(item => item.id === product.id);

  useEffect(() => {
    fetchSimilarProducts();
  }, [product]);

  const fetchSimilarProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      const filtered = data.filter(p =>
        p.category === product.category && p.id !== product.id
      );
      setSimilarProducts(filtered);
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  const handleWishlistToggle = () => {
    isFav ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{product.title}</Text>
        <TouchableOpacity onPress={handleWishlistToggle}>
          <Text style={{ color: isFav ? 'red' : 'gray', fontSize: 22, marginLeft: 10 }}>
            {isFav ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <View style={styles.bottomRow}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => setQuantity(prev => Math.max(1, prev - 1))}
            style={styles.counterBtn}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(prev => prev + 1)}
            style={styles.counterBtn}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleAddToCart} style={styles.cartBtn}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {similarProducts.length > 0 && (
        <View style={styles.similarContainer}>
          <Text style={styles.similarTitle}>Similar Products</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={similarProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.push('Details', { product: item })}
              >
                <ProductCard product={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2A4D69',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  counterBtn: {
    backgroundColor: '#E6F0FA',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600'
  },
  bottomRow: {
    flexDirection: 'row',
    
    alignItems: 'center'
  },
  cartBtn: {
    backgroundColor: '#2A4D69',
    padding: 15,
    borderRadius: 10
  },
  cartText: {
    color: '#fff',
    fontSize: 16
  },
  similarContainer: {
    marginTop: 30
  },
  similarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
