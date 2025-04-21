import {makeAutoObservable} from 'mobx';

import {MIN_ORDER_SUM_RUB} from '../../constants.ts';

import {itemsStore} from './itemsStore.ts';
import {optionsStore} from './optionsStore.ts';

export const cartStore = {
  cartItems: itemsStore,
  cartOptions: optionsStore,

  get canCheckout(): boolean {
    return itemsStore.totalPrice >= MIN_ORDER_SUM_RUB;
  },
};

makeAutoObservable(cartStore);
