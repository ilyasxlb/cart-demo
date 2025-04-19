import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import {RootStackParamList} from '@navigation/index';
import {useStores} from '@stores/storeContext';

// Правильный тип пропсов маршрута Confirmation
type ConfirmationRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

type ConfirmationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

export const ConfirmationScreen: React.FC = () => {
  const {params} = useRoute<ConfirmationRouteProp>();
  const navigation = useNavigation<ConfirmationNavProp>();
  const {cartStore} = useStores();

  const handleConfirm = () => {
    // TODO: отправка заказа
    cartStore.clear();
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <View>
        <Text style={{fontSize: 18, marginVertical: 12}}>
          Сумма: {cartStore.totalPrice.toFixed(0)} ₽
        </Text>
        <Text>Товары:</Text>
        <FlatList
          data={cartStore.items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Text>
              • {item.title} — {item.price.toFixed(0)} ₽
            </Text>
          )}
        />
        <Text style={{marginTop: 12}}>Опции:</Text>
        {params.options.map(opt => (
          <Text key={opt}>• {opt}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Подтвердить</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
