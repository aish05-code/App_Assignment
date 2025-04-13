import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    setProducts(data);
    setFiltered(data);
    const uniqueCategories = [...new Set(data.map(p => p.category))];
    setCategories(uniqueCategories);
  };

  const handleSearch = query => {
    setSearch(query);
    let updatedList = products;
    if (selectedCategory) {
      updatedList = updatedList.filter(p => p.category === selectedCategory);
    }
    const filteredList = updatedList.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredList);
  };

  const filterByCategory = (cat) => {
    if (selectedCategory === cat) {
      clearFilter();
    } else {
      setSelectedCategory(cat);
      const filteredList = products.filter(p => p.category === cat && p.title.toLowerCase().includes(search.toLowerCase()));
      setFiltered(filteredList);
    }
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    const filteredList = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SearchBar search={search} onSearch={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onFilter={filterByCategory}
        onClearFilter={clearFilter}
      />
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          alignItems: filtered.length === 1 ? 'center' : 'flex-start',
        }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Details', { product: item })}
          />
        )}
      />
    </View>
  );
}
