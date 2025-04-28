import {makeAutoObservable} from 'mobx';

import {Product} from '@services/productService';

// CartItem позволяет группировать одинаковые товары
// для хранения товаров в корзине, используется дополнительное свойство quantity
// оно автоматически добавляется в методе add, и инкрементирует этот счетчик,
// при добавлении в корзину товара с таким же ID
export type CartItem = {
  quantity: number;
} & Product;

type ItemsProp = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (product: Product) => void;
  removeCartItem: (product: Product) => void;
  clear: () => void;
  readonly totalItems: number;
  readonly totalPrice: number;
  readonly getQuantity: (productId: string) => number;
};

export const itemsStore: ItemsProp = {
  items: [],

  add: product => {
    const cartItem = itemsStore.items.find(l => l.id === product.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      itemsStore.items.push({...product, quantity: 1});
    }
  },

  remove: product => {
    const cartItem = itemsStore.items.find(l => l.id === product.id);
    if (!cartItem) return;

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      itemsStore.items = itemsStore.items.filter(l => l.id !== product.id);
    }
  },

  removeCartItem: product => {
    itemsStore.items = itemsStore.items.filter(l => l.id !== product.id);
  },

  clear: () => {
    itemsStore.items = [];
  },

  get totalItems() {
    return itemsStore.items.reduce((sum, l) => sum + l.quantity, 0);
  },

  get totalPrice() {
    return itemsStore.items.reduce((sum, l) => sum + l.price * l.quantity, 0);
  },

  getQuantity(productId: string) {
    return this.items.find(item => item.id === productId)?.quantity ?? 0;
  },
};

makeAutoObservable(itemsStore);
