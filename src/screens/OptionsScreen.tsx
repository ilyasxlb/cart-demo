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
  View,
} from 'react-native';

import {OptionItem} from '@components/molecules/Option';
import {RootStackParamList} from '@navigation/index';
import {OPTIONS_LABELS} from '@services/optionsService.ts';
import {useStores} from '@stores/storeContext';
import {toastStore} from '@stores/toastStore.ts';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Options'>;

export const OptionsScreen: React.FC = observer(() => {
  const {cartStore} = useStores();
  const navigation = useNavigation<NavProp>();

  const {loadAvailable, available, loading, selected, toggle} =
    cartStore.cartOptions;

  useEffect(() => {
    loadAvailable().catch(error => {
      console.log('Ошибка загрузки списка опций', error);
    });
  }, [loadAvailable]);

  const handleNext = () => {
    if (!cartStore.canCheckout) {
      return toastStore.showToast(
        'error',
        'Не достигнута минимальная сумма для покупки',
      );
    }
    navigation.navigate('Confirmation');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Text style={styles.loading}>{'Загрузка опций...'}</Text>
      ) : (
        <FlatList
          data={available}
          keyExtractor={opt => opt}
          renderItem={({item}) => (
            <OptionItem
              label={OPTIONS_LABELS[item]}
              selected={selected.includes(item)}
              onToggle={() => toggle(item)}
            />
          )}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            !cartStore.canCheckout && styles.buttonDisabled,
          ]}
          activeOpacity={!cartStore.canCheckout ? 1 : 0.2}
          onPress={handleNext}>
          <Text style={styles.buttonText}>{'Оформить'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {flex: 1, padding: 16},
  loading: {textAlign: 'center', marginTop: 20},
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
  button: {
    marginTop: 'auto',
    marginBottom: 42,
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 6,
  },
  buttonDisabled: {
    opacity: 1,
    backgroundColor: '#aaa',
  },
  buttonText: {color: '#fff', textAlign: 'center'},
});
