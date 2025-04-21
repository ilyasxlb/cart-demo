import {makeAutoObservable} from 'mobx';

import {itemsStore} from './itemsStore.ts';
import {optionsStore} from './optionsStore.ts';

export const cartStore = {
  cartItems: itemsStore,
  cartOptions: optionsStore,
};

makeAutoObservable(cartStore);
