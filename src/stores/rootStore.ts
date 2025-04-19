import {makeAutoObservable} from 'mobx';

import {cartStore} from './cartStore';
import {productStore} from './productStore';

export const rootStore = {
  productStore,
  cartStore,
};

makeAutoObservable(rootStore);

export type RootStore = typeof rootStore;
