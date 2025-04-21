import React from 'react';

import {ToastBar} from '@components/organisms/ToastBar.tsx';
import {AppNavigator} from '@navigation/index';
import {StoreProvider} from '@stores/storeContext';

export const App: React.FC = () => (
  <StoreProvider>
    <AppNavigator />
    <ToastBar />
  </StoreProvider>
);
