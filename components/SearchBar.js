// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ search, onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={onSearch}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4b84e4',
    padding: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});
