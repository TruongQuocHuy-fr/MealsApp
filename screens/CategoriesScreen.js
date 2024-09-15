import React, { useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, isDarkMode ? styles.darkCategoryItem : styles.lightCategoryItem]}
      onPress={() => navigation.navigate('Meals', { 
        categoryId: item.idCategory, 
        categoryName: item.strCategory
      })}
    >
      <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryImage} />
      <Text style={[styles.categoryTitle, isDarkMode ? styles.darkText : styles.lightText]}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
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
  categoryItem: {
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
  lightCategoryItem: {
    backgroundColor: '#f8f8f8',
  },
  darkCategoryItem: {
    backgroundColor: '#444',
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default CategoriesScreen;
