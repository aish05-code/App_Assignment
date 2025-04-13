# E-Commerce Mobile App  

A simple e-commerce product listing mobile application built with **React Native** and **Expo**, integrating the **FakeStore API** for product data. The app supports product listing, detailed views, cart management, wishlist functionality, and search/filter features.  

## Features  

- **Product Listing**: Displays a grid of products with images, titles, and prices.  
- **Product Details**: Includes product description, price, quantity selector, and options to add to cart or wishlist.  
- **Cart Management**: Stores selected products in the cart using AsyncStorage and calculates the total price dynamically.  
- **Wishlist Feature**: Allows users to add or remove items from the wishlist.  
- **Search & Filtering**: Provides real-time search and category-based filtering.  
- **Navigation**: Implemented using React Navigation for seamless transitions between screens.  

## Tech Stack  

- **React Native** (Expo CLI)  
- **React Navigation**  
- **Context API** for state management  
- **AsyncStorage** for persistent cart data  
- **FakeStore API** for dynamic product data  

[Download Demo Video](./demo.mp4)

## Installation & Setup  

1. **Clone the repository**  
   ```sh  
   git clone https://github.com/aish05-code/Simplify_E-com.git  
   cd Simplify_E-com 
   ```  

2. **Install dependencies**  
   ```sh  
   npm install  
   ```  

3. **Start the application**  
   ```sh  
   npx expo start  
   ```  

4. **Run on emulator or device**  
   - Scan the QR code with the Expo Go app (Android/iOS)  
   - Or launch in an emulator using `a` (Android) or `i` (iOS) in the terminal  

## Deployment  

To build the app for production:  
```sh  
eas build  
```  

## Future Enhancements  

- Implement persistent wishlist storage.  
- Improve UI/UX with animations and enhanced styling.  
- Add user authentication for personalized shopping experience.  

