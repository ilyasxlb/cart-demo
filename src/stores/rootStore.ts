import {makeAutoObservable} from 'mobx';

import {cartStore} from '@stores/cartStore';
import {toastStore} from '@stores/toastStore';

import {productStore} from './productStore';

export const rootStore = {
  productStore,
  cartStore,
  toastStore,
};

makeAutoObservable(rootStore);

export type RootStore = typeof rootStore;
