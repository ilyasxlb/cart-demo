import {makeAutoObservable, runInAction} from 'mobx';

import {fetchProducts, Product} from '@services/productService';

export const productStore = {
  products: [] as Product[],
  loading: false,
  loadProducts: async () => {
    productStore.loading = true;
    try {
      const data = await fetchProducts();
      runInAction(() => {
        productStore.products = data;
      });
    } finally {
      runInAction(() => {
        productStore.loading = false;
      });
    }
  },
};

makeAutoObservable(productStore);
