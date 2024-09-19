import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import ThemeContext from '../context/ThemeContext'; // Import the ThemeContext

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext); // Use global theme context

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        Application Settings
      </Text>
      <View style={styles.settingRow}>
        <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Dark Mode</Text>
        <Switch onValueChange={toggleDarkMode} value={isDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  darkContainer: {
    backgroundColor: '#333333',
  },
  darkText: {
    color: '#ffffff',
  },
});

export default SettingsScreen;
