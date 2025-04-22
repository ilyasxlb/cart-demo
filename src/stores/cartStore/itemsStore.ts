// src/stores/cartStore/itemsStore.ts
import {makeAutoObservable} from 'mobx';

import {Product} from '@services/productService';

export type CartLine = Product & {qty: number};

type ItemsProp = {
  items: CartLine[];
  add: (product: Product) => void;
  remove: (product: Product) => void;
  removeLine: (product: Product) => void;
  clear: () => void;
  readonly totalItems: number;
  readonly totalPrice: number;
};

export const itemsStore: ItemsProp = {
  items: [],

  add: product => {
    const line = itemsStore.items.find(l => l.id === product.id);
    if (line) {
      line.qty += 1;
    } else {
      itemsStore.items.push({...product, qty: 1});
    }
  },

  remove: product => {
    const line = itemsStore.items.find(l => l.id === product.id);
    if (!line) return;

    if (line.qty > 1) {
      line.qty -= 1;
    } else {
      itemsStore.items = itemsStore.items.filter(l => l.id !== product.id);
    }
  },

  removeLine: product => {
    itemsStore.items = itemsStore.items.filter(l => l.id !== product.id);
  },

  clear: () => {
    itemsStore.items = [];
  },

  get totalItems() {
    return itemsStore.items.reduce((sum, l) => sum + l.qty, 0);
  },

  get totalPrice() {
    return itemsStore.items.reduce((sum, l) => sum + l.price * l.qty, 0);
  },
};

makeAutoObservable(itemsStore);
