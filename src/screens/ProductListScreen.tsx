import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {PrimaryButton} from '@components/atoms/Button.tsx';
import {FullScreenIndicator} from '@components/atoms/Indicator.tsx';
import {ProductCard} from '@components/organisms/ProductCard.tsx';
import {RootStackParamList} from '@navigation/index';
import {Product} from '@services/productService';
import {analyticsEventsStore} from '@stores/analyticsEventsStore.ts';
import {toastStore} from '@stores/toastStore.ts';

import {useStores} from '../appStoreContext.tsx';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export const ProductListScreen: React.FC = observer(() => {
  const {productStore, cartStore} = useStores();
  const navigation = useNavigation<NavProp>();

  const {loadProducts} = productStore;

  useEffect(() => {
    loadProducts().catch(error => {
      toastStore.showToast('error', error.message);
      analyticsEventsStore.send({
        type: 'products_fetch_error',
        data: {message: error.message},
      });
    });
  }, [loadProducts]);

  const handleCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {productStore.loading && (
        <FullScreenIndicator caption={'список товаров'} />
      )}
      <FlatList
        data={productStore.products}
        style={styles.list}
        renderItem={({item}) => <ProductCard product={item} />}
        keyExtractor={(item: Product) => item.id}
        contentContainerStyle={styles.flatContainer}
      />
      <View style={styles.footer}>
        <Text style={styles.cartTitle}>{'Ваша корзина:'}</Text>
        <PrimaryButton
          onPress={handleCart}
          caption={`товаров ${cartStore.cartItems.totalItems} шт.`}
          color={'blue'}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {flex: 1, paddingVertical: 16},
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {fontSize: 24, zIndex: 10},
  list: {
    flexGrow: 0,
    paddingHorizontal: 8,
  },
  flatContainer: {
    padding: 8,
    paddingBottom: 142,
  },
  cartTitle: {
    position: 'absolute',
    top: 8,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
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
