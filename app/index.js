import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { CartProvider } from '../contexts/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomHeader({ title }) {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={require('../assests/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ header: () => <CustomHeader title="Home" /> }}
      />
      <Stack.Screen
        name="Details"
        component={ProductDetailsScreen}
        options={{ header: () => <CustomHeader title="Details" /> }}
      />
    </Stack.Navigator>
  );
}

export default function Index() {
  return (
    <CartProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'Cart') iconName = 'cart';
                else if (route.name === 'Wishlist') iconName = 'heart';

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#FFD700', 
              tabBarInactiveTintColor: '#FFFFFF',
              tabBarStyle: { backgroundColor: '#4b84e4' },
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Cart"
              component={CartScreen}
              options={{ header: () => <CustomHeader title="Cart" /> }}
            />
            <Tab.Screen
              name="Wishlist"
              component={WishlistScreen}
              options={{ header: () => <CustomHeader title="Wishlist" /> }}
            />
          </Tab.Navigator>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4b84e4', 
    padding: 15,
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    color: '#FFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});