import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {FullScreenIndicator} from '@components/atoms/Indicator.tsx';
import {RootStackParamList} from '@navigation/index';
import {OPTIONS_LABELS} from '@services/optionsService.ts';
import {toastStore} from '@stores/toastStore.ts';

import {useStores} from '../appStoreContext.tsx';

type ConfirmationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderConfirmation'
>;

type Section = {
  title: string;
  data: string[];
};

export const OrderConfirmation: React.FC = observer(() => {
  const navigation = useNavigation<ConfirmationNavProp>();
  const {cartStore} = useStores();

  const sections: Section[] = [
    {
      title: 'товары:',
      data: cartStore.cartItems.items.map(
        item => `${item.qty} x ${item.title} = ${item.qty * item.price} ₽`,
      ),
    },
    {
      title: 'опции:',
      data: cartStore.cartOptions.selected.map(opt => OPTIONS_LABELS[opt]),
    },
  ];

  const handleConfirm = () => {
    if (!cartStore.canCheckout) {
      return toastStore.showToast(
        'error',
        'Не достигнута минимальная сумма для покупки',
      );
    }

    cartStore
      .submitOrder()
      .then(() => {
        toastStore.showToast('success', 'Заказ успешно отправлен.');
        navigation.popToTop();
      })
      .catch(err => {
        toastStore.showToast('error', err.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {cartStore.isSubmitting && (
        <FullScreenIndicator caption={'регистрация заказа'} />
      )}
      <Text style={styles.totalText}>
        {'итого: '}
        <Text
          style={
            styles.totalPrice
          }>{`${cartStore.cartItems.totalPrice} ₽`}</Text>
      </Text>
      <View style={styles.divider} />

      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item + idx}
        renderSectionHeader={({section}) => (
          <Text style={styles.heading}>{section.title}</Text>
        )}
        renderItem={({item}) => {
          const match = item.match(/(.*?) = (\d+ ₽)/);
          if (!match) return <Text style={styles.itemText}>{item}</Text>;

          const [, left, right] = match;

          return (
            <Text style={styles.itemText}>
              <Text style={styles.itemLabel}>{left} = </Text>
              <Text style={styles.itemPrice}>{right}</Text>
            </Text>
          );
        }}
        contentContainerStyle={styles.container}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            !cartStore.canCheckout && styles.buttonDisabled,
          ]}
          activeOpacity={!cartStore.canCheckout ? 1 : 0.2}
          onPress={handleConfirm}>
          <Text style={styles.buttonText}>{'Подтвердить'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cancel]}
          onPress={() => navigation.pop()}>
          <Text style={styles.buttonText}>{'Отмена'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {flex: 1, paddingVertical: 16},
  totalText: {
    paddingHorizontal: 16,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 12,
  },
  totalPrice: {fontSize: 18, color: '#009600', marginVertical: 12},
  divider: {height: 2, marginVertical: 0, backgroundColor: '#ddd'},
  itemText: {paddingLeft: 6, fontSize: 14},
  itemLabel: {color: '#666'},
  itemPrice: {fontSize: 16, fontWeight: 'bold'},
  container: {padding: 16, paddingTop: 0, paddingBottom: 200},
  heading: {fontSize: 18, fontWeight: 'bold', marginTop: 12},
  button: {
    marginTop: 'auto',
    marginBottom: 22,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
  },
  cancel: {
    backgroundColor: 'rgba(188,49,40,0.76)',
    padding: 12,
    borderRadius: 6,
    marginBottom: 42,
  },
  buttonDisabled: {
    opacity: 1,
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 32,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});
