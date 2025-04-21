import {makeAutoObservable} from 'mobx';

import {Product} from '@services/productService.ts';

type ItemsProp = {
  items: Product[];
  add: (product: Product) => void;
  clear: () => void;
  readonly totalItems: number;
  readonly totalPrice: number;
};
export const itemsStore: ItemsProp = {
  items: [],

  add: (product: Product): void => {
    itemsStore.items.push(product);
  },

  clear: (): void => {
    itemsStore.items = [];
  },

  get totalItems(): number {
    return itemsStore.items.length;
  },

  get totalPrice(): number {
    return itemsStore.items.reduce((sum, p) => sum + p.price, 0);
  },
};

makeAutoObservable(itemsStore);
