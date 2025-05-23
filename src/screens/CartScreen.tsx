import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {FlatList, Platform, SafeAreaView, StyleSheet, View} from 'react-native';

import {PrimaryButton} from '@components/atoms/Button.tsx';
import {FullScreenIndicator} from '@components/atoms/Indicator.tsx';
import {OptionItem} from '@components/molecules/Option';
import {ProductCard} from '@components/organisms/ProductCard.tsx';
import {RootStackParamList} from '@navigation/index';
import {OPTIONS_LABELS} from '@services/optionsService.ts';
import {analyticsEventsStore} from '@stores/analyticsEventsStore.ts';
import {toastStore} from '@stores/toastStore.ts';

import {useStores} from '../appStoreContext.tsx';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;
const Tab = createMaterialTopTabNavigator();

const ProductsTab: React.FC = observer(() => {
  const {
    cartStore: {cartItems},
  } = useStores();

  return (
    <FlatList
      data={cartItems.items}
      keyExtractor={(item, i) => item.id + i}
      contentContainerStyle={styles.tabList}
      renderItem={({item}) => <ProductCard product={item} />}
    />
  );
});

const OptionsTab: React.FC = observer(() => {
  const {cartStore} = useStores();
  const {loadAvailable, available, selected, toggle} = cartStore.cartOptions;

  useEffect(() => {
    loadAvailable().catch(error => {
      toastStore.showToast('error', error.message);
      analyticsEventsStore.send({
        type: 'option_fetch_error',
        data: {message: error.message},
      });
    });
  }, [loadAvailable]);

  return (
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

export const CartScreen: React.FC = observer(() => {
  const {cartStore} = useStores();
  const navigation = useNavigation<NavProp>();

  const handleNext = () => {
    if (!cartStore.canCheckout) {
      return toastStore.showToast(
        'error',
        'Не достигнута минимальная сумма для покупки',
      );
    }
    navigation.navigate('OrderConfirmation');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {cartStore.cartOptions.loading && (
        <FullScreenIndicator caption={'доступные опции'} />
      )}
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: '#28A745'},
          tabBarLabelStyle: {fontWeight: 'bold'},
          tabBarStyle: Platform.OS === 'android' ? {elevation: 0} : undefined,
        }}>
        <Tab.Screen
          name={'ItemsTabScreen'}
          component={ProductsTab}
          options={{title: 'Товары'}}
        />
        <Tab.Screen
          name={'OptionsTabScreen'}
          component={OptionsTab}
          options={{title: 'Опции'}}
        />
      </Tab.Navigator>

      <View style={styles.footer}>
        <PrimaryButton
          disabled={!cartStore.canCheckout}
          caption={`Оформить заказ ${cartStore.cartItems.totalPrice} ₽, за ${cartStore.cartItems.totalItems} товаров`}
          onPress={handleNext}
          color={'green'}
        />
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
  tabList: {padding: 16, paddingBottom: 142},
  listItem: {marginBottom: 8, fontSize: 16},
});
