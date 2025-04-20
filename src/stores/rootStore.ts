import {makeAutoObservable} from 'mobx';

import {optionsStore} from '@stores/optionsStore.ts';

import {cartStore} from './cartStore';
import {productStore} from './productStore';

export const rootStore = {
  productStore,
  cartStore,
  optionsStore,
};

makeAutoObservable(rootStore);

export type RootStore = typeof rootStore;
