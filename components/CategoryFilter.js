import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CategoryFilter({ categories, selectedCategory, onFilter, onClearFilter }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => isSelected ? onClearFilter() : onFilter(cat)}
              style={[styles.button, isSelected && styles.selected]}
            >
              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {isSelected ? `${cat} ✖` : cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#4b84e4',
    paddingHorizontal: 8,
  },
  button: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#FFD70033',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  selected: {
    backgroundColor: '#FFD700',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedText: {
    color: '#4b84e4',
  },
});
