import {OptionKey} from '@services/optionsService.ts';
import {Product} from '@services/productService.ts';

import {
  MIN_ORDER_SUM_RUB,
  ORDER_NOT_ENOUGH_GOODS,
  ORDER_SERVICE_UNAVAILABLE,
  REQUEST_DELAY,
} from '../constants.ts';

type CartLine = Product & {
  qty: number;
};

type OrderPayload = {
  items: CartLine[];
  options: OptionKey[];
};

export const submitOrderRequest = ({
  items,
  options: _options,
}: OrderPayload): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderSum = items.reduce((sum, l) => sum + l.price * l.qty, 0);
      const random = Math.random();

      if (random < ORDER_SERVICE_UNAVAILABLE)
        return reject(new Error('Сервис недоступен'));
      if (random < ORDER_NOT_ENOUGH_GOODS)
        return reject(new Error('Недостаточное количество товара на складе'));
      if (orderSum < MIN_ORDER_SUM_RUB)
        return reject(new Error('Не достигнута минимальная сумма заказа'));

      // console.log('Заказ отправлен:', {items, _options});
      resolve();
    }, REQUEST_DELAY);
  });
};
