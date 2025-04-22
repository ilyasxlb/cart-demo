import {PRODUCTS_SERVICE_UNAVAILABLE, REQUEST_DELAY} from '../constants.ts';

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export const fetchProducts = async (
  count: number = 1000,
): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < PRODUCTS_SERVICE_UNAVAILABLE)
        return reject(new Error('API списка товаров не доступен'));

      const products: Product[] = Array.from({length: count}, (_, i) => ({
        id: (i + 1).toString(),
        title: `Товар_${String(i + 1).padStart(4, '0')}`,
        price: Math.round(300 + Math.random() * 3033), // 300 - 3333 ₽
        image: 'https://via.placeholder.com/150',
      }));

      resolve(products);
    }, REQUEST_DELAY);
  });
};
