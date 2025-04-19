import {makeAutoObservable} from 'mobx';

import {Product} from '@services/productService';

export const cartStore = {
  items: [] as Product[],
  add: (product: Product): void => {
    cartStore.items.push(product);
  },
  clear: (): void => {
    cartStore.items = [];
  },
  get totalItems(): number {
    return cartStore.items.length;
  },
  get totalPrice(): number {
    return cartStore.items.reduce((sum, p) => sum + p.price, 0);
  },
};

makeAutoObservable(cartStore);
