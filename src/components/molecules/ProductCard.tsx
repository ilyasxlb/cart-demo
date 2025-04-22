// import React from 'react';
// import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
//
// import {Product} from '@services/productService';
//
// type Props = Product & {
//   onAddToCart?: (product: Product) => void;
//   onRemoveFromCart?: (product: Product) => void;
// };
//
// export const ProductCard: React.FC<Props> = ({
//   id,
//   title,
//   price,
//   image,
//   onAddToCart,
//   onRemoveFromCart,
// }) => (
//   <View style={cardStyles.container}>
//     <Image source={{uri: image}} style={cardStyles.image} />
//     <View style={cardStyles.info}>
//       <Text style={cardStyles.title}>{title}</Text>
//       <View style={cardStyles.priceRow}>
//         <Text style={cardStyles.price}>{'Цена:'}</Text>
//         <Text style={cardStyles.priceValue}>{`${price} ₽`}</Text>
//       </View>
//       {onAddToCart && (
//         <TouchableOpacity
//           style={cardStyles.button}
//           onPress={() => onAddToCart({id, title, price, image})}>
//           <Text style={cardStyles.buttonText}>{'В корзину'}</Text>
//         </TouchableOpacity>
//       )}
//       {onRemoveFromCart && (
//         <TouchableOpacity
//           style={cardStyles.button}
//           onPress={() => onRemoveFromCart({id, title, price, image})}>
//           <Text style={cardStyles.buttonText}>{'Удалить'}</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   </View>
// );
//
// const cardStyles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     marginVertical: 8,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     overflow: 'hidden',
//     elevation: 2,
//   },
//   image: {width: 100, height: 100},
//   info: {flex: 1, padding: 8},
//   title: {fontSize: 16, fontWeight: 'bold'},
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   price: {marginVertical: 4, marginRight: 8},
//   priceValue: {
//     color: '#009600',
//     textAlign: 'left',
//     fontSize: 18,
//   },
//   button: {
//     marginTop: 8,
//     backgroundColor: '#007AFF',
//     paddingVertical: 6,
//     borderRadius: 4,
//   },
//   buttonText: {color: '#fff', textAlign: 'center'},
// });
import {observer} from 'mobx-react-lite';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {Product} from '@services/productService';

import {QuantityControl} from './QuantityControl';

type Props = {
  productData: Product & {qty: number};
  /** Добавить единицу */
  onAddToCart?: (product: Product) => void;
  /** Удалить всё */
  onRemoveFromCart?: (product: Product) => void;
  /** Уменьшить на 1 */
  onDecrement?: (product: Product) => void;
  /** Увеличить на 1 */
  onIncrement?: (product: Product) => void;
};

export const ProductCard: React.FC<Props> = observer(
  ({
    productData,
    // qty,
    onAddToCart,
    onRemoveFromCart,
    onIncrement,
    onDecrement,
  }) => {
    const {title, price, image, qty} = productData;

    return (
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{`Цена: ${price.toFixed(0)} ₽`}</Text>

          {/* Режим управления количеством */}
          {qty && onIncrement && onDecrement && (
            <QuantityControl
              qty={qty}
              onIncrement={() => onIncrement(productData)}
              onDecrement={() => onDecrement(productData)}
            />
          )}

          {/* Режим «В корзину» */}
          {!qty && onAddToCart && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => onAddToCart(productData)}>
              <Text style={styles.buttonText}>{'В корзину'}</Text>
            </TouchableOpacity>
          )}

          {/* Режим «Удалить товар целиком» */}
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
