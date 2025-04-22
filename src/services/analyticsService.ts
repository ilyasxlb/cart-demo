import {REQUEST_DELAY} from '../constants.ts';

export type AnalyticsEventType =
  | 'cart_update'
  | 'order_submit'
  | 'order_success'
  | 'order_failure'
  | string;

export type AnalyticsPayload<T = unknown> = {
  type: AnalyticsEventType;
  data: T;
};

export const analyticsService = {
  sendEvent: <T>(payload: AnalyticsPayload<T>): Promise<void> => {
    console.log('Отправка аналитики:', payload);

    return new Promise((resolve, reject) => {
      const processFail = Math.random() < 0.2;

      setTimeout(() => {
        if (processFail) {
          reject(new Error('Сервис недоступен'));
        } else {
          console.log('Аналитика успешно отправлена');
          resolve();
        }
      }, REQUEST_DELAY);
    });
  },
};
