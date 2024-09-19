import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import Toast from 'react-native-toast-message';
import ThemeContext from '../context/ThemeContext';
import * as Speech from 'expo-speech'; // Import thư viện expo-speech

const MealsScreen = () => {
  const route = useRoute();
  const { categoryId } = route.params;
  const { addFavorite, removeFavorite, isFavorite: checkIsFavorite } = useFavorites();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  // Hàm thêm/bỏ yêu thích và hiển thị thông báo tương ứng
  const toggleFavorite = () => {
    if (!category) return;
    if (isFavorite) {
      removeFavorite(category.idCategory);
      Toast.show({
        type: 'success',
        text1: 'Removed from Favorites',
        text2: `${category.strCategory} has been removed from your favorites.`,
      });
    } else {
      addFavorite(category);
      Toast.show({
        type: 'success',
        text1: 'Added to Favorites',
        text2: `${category.strCategory} has been added to your favorites!`,
      });
    }
    setIsFavorite(!isFavorite);
  };

  // Hàm đọc tên danh mục bằng giọng nói
  const speakCategoryName = (name) => {
    Speech.speak(name); // Đọc tên danh mục bằng expo-speech
  };

  // Hàm đọc tên món ăn bằng giọng nói
  const speakMealName = (name) => {
    Speech.speak(name); // Đọc tên món ăn bằng expo-speech
  };

  // Fetch dữ liệu từ API và kiểm tra trạng thái yêu thích
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        const categories = response.data.categories;
        const selectedCategory = categories.find(cat => cat.idCategory === categoryId);

        if (selectedCategory) {
          setCategory(selectedCategory);
          setIsFavorite(checkIsFavorite(selectedCategory.idCategory));
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Loading...</Text>
      </View>
    );
  }

  if (!category) {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Không tìm thấy danh mục</Text>
      </View>
    );
  }

  const renderMealItem = ({ item }) => (
    <TouchableOpacity style={styles.mealItem} onPress={() => speakMealName(item.strMeal)}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={category.meals}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.idMeal.toString()}
        ListHeaderComponent={
          <View style={[styles.header, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
            <Image source={{ uri: category.strCategoryThumb }} style={styles.image} />
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]} onPress={() => speakCategoryName(category.strCategory)}>
              {category.strCategory}
            </Text>
            <Text style={[styles.description, isDarkMode ? styles.darkDescription : styles.lightDescription]}>
              {category.strCategoryDescription}
            </Text>
          </View>
        }
      />
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={28}
          color={isFavorite ? 'red' : (isDarkMode ? '#fff' : '#000')}
        />
      </TouchableOpacity>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  darkHeader: {
    backgroundColor: '#1f1f1f',
  },
  lightHeader: {
    backgroundColor: '#f4f4f4',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  darkDescription: {
    color: '#e0e0e0',
  },
  lightDescription: {
    color: '#666',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000',
  },
  mealItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default MealsScreen;
