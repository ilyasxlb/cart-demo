import {makeAutoObservable, runInAction} from 'mobx';

import {fetchProducts, Product} from '@services/productService';

type ProductStore = {
  products: Product[];
  loading: boolean;
  loadProducts: () => Promise<void>;
};

export const productStore: ProductStore = {
  products: [],
  loading: false,

  loadProducts: async () => {
    productStore.loading = true;
    return fetchProducts()
      .then(data => {
        runInAction(() => {
          productStore.products = data;
        });
      })
      .catch(error => {
        runInAction(() => {
          productStore.products = [];
        });
        throw error;
      })
      .finally(() => runInAction(() => (productStore.loading = false)));
  },
};

makeAutoObservable(productStore);
