import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RootStackParamList} from '@navigation/index';
import {OPTIONS_LABELS} from '@services/optionsService.ts';
import {useStores} from '@stores/storeContext';

type ConfirmationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

export const ConfirmationScreen: React.FC = observer(() => {
  const navigation = useNavigation<ConfirmationNavProp>();
  const {cartStore, optionsStore} = useStores();

  const handleConfirm = () => {
    cartStore.clear();
    optionsStore.clear();
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.priceText}>{`Сумма: ${cartStore.totalPrice.toFixed(
        0,
      )} ₽`}</Text>

      <Text>Товары:</Text>

      <FlatList
        data={cartStore.items}
        style={styles.list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Text>{`• ${item.title} — ${item.price.toFixed(0)} ₽`}</Text>
        )}
      />

      <Text style={styles.optionsText}>{'Опции:'}</Text>
      {optionsStore.selected.map(opt => (
        <Text key={opt}>{`• ${OPTIONS_LABELS[opt]}`}</Text>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Подтвердить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {flex: 1, padding: 16},
  priceText: {fontSize: 18, marginVertical: 12},
  list: {flexGrow: 0},
  optionsText: {marginTop: 12},
  button: {
    marginTop: 'auto',
    marginBottom: 42,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
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
  },
});
