import {makeAutoObservable, runInAction} from 'mobx';

import {submitOrderRequest} from '@services/orderService.ts';

import {MIN_ORDER_SUM_RUB} from '../../constants.ts';

import {itemsStore} from './itemsStore.ts';
import {optionsStore} from './optionsStore.ts';

type CartStore = {
  cartItems: typeof itemsStore;
  cartOptions: typeof optionsStore;
  canCheckout: boolean;
  isSubmitting: boolean;
  submitOrder: () => Promise<boolean>;
};

// модель/mobx-стор корзины, получаемого путем композиции списка продуктов добавленного в корзину и
// набора опций заказа, получаемого с сервера
export const cartStore: CartStore = {
  cartItems: itemsStore,
  cartOptions: optionsStore,
  isSubmitting: false,

  get canCheckout() {
    return itemsStore.totalPrice >= MIN_ORDER_SUM_RUB;
  },

  submitOrder: async () => {
    cartStore.isSubmitting = true;

    const payload = {
      items: itemsStore.items,
      options: optionsStore.selected,
    };

    return submitOrderRequest(payload)
      .then(() => {
        runInAction(() => {
          itemsStore.clear();
          optionsStore.clear();
        });
        return true;
      })
      .catch(error => {
        return Promise.reject(error);
      })
      .finally(() => {
        runInAction(() => {
          cartStore.isSubmitting = false;
        });
      });
  },
};

makeAutoObservable(cartStore);
