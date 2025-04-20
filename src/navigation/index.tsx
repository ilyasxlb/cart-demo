import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {ConfirmationScreen} from '@screens/ConfirmationScreen';
import {OptionsScreen} from '@screens/OptionsScreen';
import {ProductListScreen} from '@screens/ProductListScreen';
import {StoreProvider} from '@stores/storeContext';

export type RootStackParamList = {
  ProductList: undefined;
  Options: undefined;
  Confirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => (
  <StoreProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{title: 'Каталог'}}
        />
        <Stack.Screen
          name="Options"
          component={OptionsScreen}
          options={{title: 'Опции'}}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{title: 'Подтвердить'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </StoreProvider>
);
