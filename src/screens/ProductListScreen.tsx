import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ProductCard} from '@components/molecules/ProductCard';
import {RootStackParamList} from '@navigation/index';
import {Product} from '@services/productService';
import {useStores} from '@stores/storeContext';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export const ProductListScreen: React.FC = observer(() => {
  const {productStore, cartStore} = useStores();
  const navigation = useNavigation<NavProp>();

  const {loadProducts} = productStore;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {productStore.loading ? (
        <Text style={styles.loadText}>Загрузка...</Text>
      ) : (
        <FlatList
          data={productStore.products}
          style={styles.list}
          renderItem={({item}) => (
            <ProductCard
              {...item}
              onAddToCart={() => cartStore.cartItems.add(item)}
            />
          )}
          keyExtractor={(item: Product) => item.id}
          contentContainerStyle={styles.flatContainer}
        />
      )}
      <View style={styles.footer}>
        <Text style={styles.cartTitle}>{'Ваша корзина:'}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Options')}>
          <Text
            style={
              styles.cartText
            }>{`товаров ${cartStore.cartItems.totalItems} шт.`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  loadText: {textAlign: 'center', marginTop: 20},
  cartButton: {
    marginTop: 'auto',
    marginBottom: 42,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  list: {flexGrow: 0},
  flatContainer: {padding: 8},
  cartTitle: {
    position: 'absolute',
    top: 8,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  cartText: {color: '#fff', fontWeight: 'bold'},
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 32,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});
