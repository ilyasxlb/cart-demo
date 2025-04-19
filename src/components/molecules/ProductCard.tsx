import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {Product} from '@services/productService';

type Props = Product & {onAddToCart: (product: Product) => void};

export const ProductCard: React.FC<Props> = ({
  id,
  title,
  price,
  image,
  onAddToCart,
}) => (
  <View style={cardStyles.container}>
    <Image source={{uri: image}} style={cardStyles.image} />
    <View style={cardStyles.info}>
      <Text style={cardStyles.title}>{title}</Text>
      <Text style={cardStyles.price}>{price.toFixed(0)} ₽</Text>
      <TouchableOpacity
        style={cardStyles.button}
        onPress={() => onAddToCart({id, title, price, image})}>
        <Text style={cardStyles.buttonText}>В корзину</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const cardStyles = StyleSheet.create({
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
  price: {marginVertical: 4},
  button: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {color: '#fff', textAlign: 'center'},
});
