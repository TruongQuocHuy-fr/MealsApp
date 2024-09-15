import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ThemeContext from '../context/ThemeContext';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const renderFavoriteItem = ({ item }) => (
    <View style={[styles.favoriteItem, isDarkMode ? styles.darkFavoriteItem : styles.lightFavoriteItem]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Meals', { 
          categoryId: item.idCategory, 
          categoryName: item.strCategory 
        })}
      >
        <Image source={{ uri: item.strCategoryThumb }} style={styles.favoriteImage} />
        <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>{item.strCategory}</Text> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeFavorite(item.idCategory)} style={styles.deleteButton}>
        <Ionicons name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Bạn chưa có món ăn yêu thích nào.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.idCategory}
        numColumns={2} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  favoriteItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lightFavoriteItem: {
    backgroundColor: '#f8f8f8',
  },
  darkFavoriteItem: {
    backgroundColor: '#444',
  },
  favoriteImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default FavoritesScreen;
