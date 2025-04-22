import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {runInAction} from 'mobx';
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

import {RootStackParamList} from '@navigation/index';
import {OPTIONS_LABELS} from '@services/optionsService.ts';
import {useStores} from '@stores/storeContext';
import {toastStore} from '@stores/toastStore.ts';

type ConfirmationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

type Section = {
  title: string;
  data: string[];
};

export const ConfirmationScreen: React.FC = observer(() => {
  const navigation = useNavigation<ConfirmationNavProp>();
  const {cartStore} = useStores();

  const sections: Section[] = [
    {
      title: 'Товары',
      data: cartStore.cartItems.items.map(
        item => `${item.title} - ${item.price} ₽`,
      ),
    },
    {
      title: 'Опции',
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
    runInAction(() => {
      cartStore.cartItems.clear();
      cartStore.cartOptions.clear();
      navigation.popToTop();
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text
        style={
          styles.totalText
        }>{`Сумма: ${cartStore.cartItems.totalPrice} ₽`}</Text>

      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item + idx}
        renderSectionHeader={({section}) => (
          <Text style={styles.heading}>{section.title}:</Text>
        )}
        renderItem={({item}) => <Text style={styles.itemText}>• {item}</Text>}
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
          <Text style={styles.buttonText}>Подтвердить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {flex: 1, paddingVertical: 16},
  totalText: {fontSize: 18, marginVertical: 12},
  itemText: {fontSize: 14},
  container: {padding: 16, paddingBottom: 200},
  heading: {fontSize: 18, fontWeight: 'bold', marginVertical: 8},
  button: {
    marginTop: 'auto',
    marginBottom: 42,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
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
