import {reaction} from 'mobx';

import {toastStore} from '@stores/toastStore.ts';

import {analyticsEventsStore} from './analyticsEventsStore';
import {cartStore} from './cartStore';

reaction(
  () => ({
    items: cartStore.cartItems.items.slice(),
    options: cartStore.cartOptions.selected.slice(),
  }),
  snapshot => {
    analyticsEventsStore.send(snapshot);
  },
);

reaction(
  () => analyticsEventsStore.status,
  status => {
    status === 'success' &&
      toastStore.showToast('success', 'Аналитика отправлена');
    status === 'error' &&
      toastStore.showToast(
        'error',
        `Ошибка отправки аналитики: ${analyticsEventsStore.error}`,
      );
  },
);
