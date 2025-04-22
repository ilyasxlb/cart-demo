import {reaction} from 'mobx';

import {AnalyticsPayload} from '@services/analyticsService.ts';
import {OptionKey} from '@services/optionsService.ts';
import {analyticsEventsStore} from '@stores/analyticsEventsStore.ts';
import {cartStore} from '@stores/cartStore';
import {CartLine} from '@stores/cartStore/itemsStore.ts';
import {toastStore} from '@stores/toastStore.ts';

type CartSnapshotPayload = {
  items: CartLine[];
  options: OptionKey[];
};

// Реакция на изменения корзины - отправка события в аналитику
reaction(
  () => ({
    items: cartStore.cartItems.items.map(item => ({
      id: item.id,
      qty: item.qty,
      title: item.title,
      price: item.price,
      image: item.image,
    })),
    options: cartStore.cartOptions.selected.slice(),
  }),
  snapshot => {
    const payload: AnalyticsPayload<CartSnapshotPayload> = {
      type: 'cart_updated',
      data: snapshot,
    };

    analyticsEventsStore.send(payload);
  },
);

// Реакция на изменения хранилища событий аналитики - отображаем сообщения связанные с изменением корзины
reaction(
  () => analyticsEventsStore.events.length,
  _eventsLength => {
    const lastEvent = analyticsEventsStore.lastEvent;
    if (!lastEvent) return;

    const {status, payload, error} = lastEvent;

    if (payload.type !== 'cart_updated') return;

    if (status === 'success') {
      toastStore.showToast('success', 'Отправка аналитики завершена');
    }

    if (status === 'error') {
      toastStore.showToast('error', `Ошибка отправки аналитики: ${error}`);
    }
  },
);
