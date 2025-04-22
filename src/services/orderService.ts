import {OptionKey} from '@services/optionsService.ts';
import {Product} from '@services/productService.ts';

import {MIN_ORDER_SUM_RUB, REQUEST_DELAY} from '../constants.ts';

type CartLine = Product & {
  qty: number;
};

type OrderPayload = {
  items: CartLine[];
  options: OptionKey[];
};

export const submitOrder = ({items, options}: OrderPayload): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderSum = items.reduce((sum, l) => sum + l.price * l.qty, 0);
      const errorChance = Math.random();

      if (errorChance < 0.2) return reject(new Error('Сервис недоступен'));
      if (errorChance < 0.3)
        return reject(new Error('Недостаточное количество товара на складе'));
      if (orderSum < MIN_ORDER_SUM_RUB)
        return reject(new Error('Не достигнута минимальная сумма заказа'));

      console.log('Заказ отправлен:', {items, options});
      resolve();
    }, REQUEST_DELAY);
  });
};
