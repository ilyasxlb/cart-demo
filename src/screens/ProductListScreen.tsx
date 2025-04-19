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
    <SafeAreaView style={{flex: 1}}>
      {productStore.loading ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>Загрузка...</Text>
      ) : (
        <FlatList
          data={productStore.products}
          renderItem={({item}) => (
            <ProductCard {...item} onAddToCart={() => cartStore.add(item)} />
          )}
          keyExtractor={(item: Product) => item.id}
          contentContainerStyle={{padding: 8}}
        />
      )}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Options')}>
        <Text style={styles.cartText}>🛒 {cartStore.totalItems}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  cartButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007AFF',
    borderRadius: 24,
    padding: 12,
  },
  cartText: {color: '#fff', fontWeight: 'bold'},
});
