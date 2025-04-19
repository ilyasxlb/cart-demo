import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'Корзина ДЕМО'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
  },
  logo: {
    fontSize: 34,
  },
});
