import {observer} from 'mobx-react-lite';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {Product} from '@services/productService';

import {QuantityControl} from './QuantityControl';

type Props = {
  productData: Product & {qty?: number};
  onAddToCart?: (product: Product) => void;
  onRemoveFromCart?: (product: Product) => void;
  onDecrement?: (product: Product) => void;
  onIncrement?: (product: Product) => void;
};

export const ProductCard: React.FC<Props> = observer(
  ({productData, onAddToCart, onRemoveFromCart, onIncrement, onDecrement}) => {
    const {title, price, image, qty} = productData;

    return (
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{`Цена: ${price.toFixed(0)} ₽`}</Text>

          {/* Контрол инкремента и декремента позиции */}
          {qty && onIncrement && onDecrement && (
            <QuantityControl
              qty={qty}
              onIncrement={() => onIncrement(productData)}
              onDecrement={() => onDecrement(productData)}
            />
          )}

          {/* Кнопка добавления в корзину */}
          {!qty && onAddToCart && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => onAddToCart(productData)}>
              <Text style={styles.buttonText}>{'В корзину'}</Text>
            </TouchableOpacity>
          )}

          {/* Кнопка удалить позицию целиком */}
          {onRemoveFromCart && (
            <TouchableOpacity
              style={[styles.button, styles.removeButton]}
              onPress={() => onRemoveFromCart(productData)}>
              <Text style={styles.buttonText}>{'Удалить'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {width: 100, height: 100},
  info: {flex: 1, padding: 8},
  title: {fontSize: 16, fontWeight: 'bold'},
  price: {marginVertical: 4, color: '#009600'},
  button: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    borderRadius: 4,
  },
  removeButton: {
    backgroundColor: '#f44336',
    marginTop: 4,
  },
  buttonText: {color: '#fff', textAlign: 'center'},
});
