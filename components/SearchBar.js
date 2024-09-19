// components/SearchBar.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery, isDarkMode }) => {
  return (
    <TextInput
      style={[
        styles.searchInput,
        isDarkMode ? styles.darkInput : styles.lightInput,
      ]}
      placeholder="Search categories..."
      placeholderTextColor={isDarkMode ? "#ccc" : "#666"}
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  lightInput: {
    backgroundColor: '#fff',
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
});

export default SearchBar;

