import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {OptionItem} from '@components/molecules/Option';
import {ProductCard} from '@components/molecules/ProductCard.tsx';
import {RootStackParamList} from '@navigation/index';
import {OPTIONS_LABELS} from '@services/optionsService.ts';
import {useStores} from '@stores/storeContext';
import {toastStore} from '@stores/toastStore.ts';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Options'>;
const Tab = createMaterialTopTabNavigator();

const ItemsTab = observer(() => {
  const {
    cartStore: {cartItems},
  } = useStores();

  return (
    <FlatList
      data={cartItems.items}
      keyExtractor={(item, i) => item.id + i}
      contentContainerStyle={styles.tabList}
      renderItem={({item}) => {
        console.log('item card', item);
        console.log('itemStore', cartItems.items);
        return (
          <ProductCard
            productData={item}
            onRemoveFromCart={cartItems.removeLine}
            // qty={cartItems.getQtyByProduct(item)}
            // qty={item.qty}
            onIncrement={cartItems.add}
            onDecrement={cartItems.remove}
          />
        );
      }}
    />
  );
});

const OptionsTab = observer(() => {
  const {cartStore} = useStores();
  const {loadAvailable, available, loading, selected, toggle} =
    cartStore.cartOptions;

  useEffect(() => {
    loadAvailable().catch(err => console.warn(err));
  }, [loadAvailable]);

  return loading ? (
    <Text style={styles.loading}>{'Загрузка опций...'}</Text>
  ) : (
    <FlatList
      data={available}
      keyExtractor={opt => opt}
      contentContainerStyle={styles.tabList}
      renderItem={({item}) => (
        <OptionItem
          label={OPTIONS_LABELS[item]}
          selected={selected.includes(item)}
          onToggle={() => toggle(item)}
        />
      )}
    />
  );
});

export const OptionsScreen: React.FC = observer(() => {
  const {cartStore} = useStores();
  const navigation = useNavigation<NavProp>();

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
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: '#28A745'},
          tabBarLabelStyle: {fontWeight: 'bold'},
          tabBarStyle: Platform.OS === 'android' ? {elevation: 0} : undefined,
        }}>
        <Tab.Screen
          name={'ItemsTabScreen'}
          component={ItemsTab}
          options={{title: 'Товары'}}
        />
        <Tab.Screen
          name={'OptionsTabScreen'}
          component={OptionsTab}
          options={{title: 'Опции'}}
        />
      </Tab.Navigator>

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
  safeArea: {flex: 1, paddingVertical: 16},
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
  tabList: {padding: 16},
  listItem: {marginBottom: 8, fontSize: 16},
});
