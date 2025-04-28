import {observer} from 'mobx-react-lite';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {QuantityControl} from '@components/molecules/QuantityControl';
import {Product} from '@services/productService';

import {useStores} from '../../appStoreContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = observer(({product}) => {
  const {cartStore} = useStores();
  const {id, title, price} = product;

  const quantity = cartStore.cartItems.getQuantity(id);

  const isAddedToCart = quantity > 0;

  const onAddToCart = () => {
    cartStore.cartItems.add(product);
  };

  const onIncrement = () => {
    cartStore.cartItems.add(product);
  };

  const onDecrement = () => {
    cartStore.cartItems.remove(product);
  };

  const onRemoveFromCart = () => {
    cartStore.cartItems.removeCartItem(product);
  };

  return (
    <View style={styles.container}>
      <Image source={require('@assets/placeholder.png')} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>
          {`Цена: ${price} ₽`}
          {isAddedToCart && (
            <>
              <Text style={styles.price}>{`   x ${quantity} =  `}</Text>
              <Text style={styles.priceDetails}>
                {`${(price * quantity).toLocaleString()} ₽`}
              </Text>
            </>
          )}
        </Text>

        {/* Кнопка добавления в корзину */}
        {!isAddedToCart && (
          <TouchableOpacity style={styles.button} onPress={onAddToCart}>
            <Text style={styles.buttonText}>{'В корзину'}</Text>
          </TouchableOpacity>
        )}

        {isAddedToCart && (
          <View style={styles.actions}>
            {/* Контрол инкремента и декремента позиции */}
            <QuantityControl
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
            {/* Кнопка удалить позицию целиком */}
            <TouchableOpacity
              style={[styles.removeButton]}
              onPress={onRemoveFromCart}>
              <Text style={styles.buttonText}>{'Удалить'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    margin: 'auto',
    resizeMode: 'contain',
    width: 100,
    height: 50,
  },
  info: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: '#777',
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 8,
    marginRight: 20,
    fontWeight: '500',
  },
  priceDetails: {
    marginLeft: 20,
    fontSize: 16,
    color: '#009600',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    borderRadius: 4,
  },
  removeButton: {
    flex: 1,
    marginLeft: 16,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(188,49,40,0.76)',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
