import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {CartScreen} from '@screens/CartScreen.tsx';
import {OrderConfirmation} from '@screens/OrderConfirmation.tsx';
import {ProductListScreen} from '@screens/ProductListScreen';

export type RootStackParamList = {
  ProductList: undefined;
  Cart: undefined;
  OrderConfirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{title: 'Список товаров'}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Корзина'}}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmation}
        options={{title: 'Подтверждение заказа'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
