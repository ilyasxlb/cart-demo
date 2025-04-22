import {ANALYTICS_SERVICE_UNAVAILABLE, REQUEST_DELAY} from '../constants.ts';

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
  sendEvent: <T>(_payload: AnalyticsPayload<T>): Promise<void> => {
    // console.log('Отправка аналитики:', _payload);

    return new Promise((resolve, reject) => {
      const random = Math.random();

      setTimeout(() => {
        if (random < ANALYTICS_SERVICE_UNAVAILABLE) {
          reject(new Error('Сервис недоступен'));
        } else {
          // console.log('Аналитика успешно отправлена', payload);
          resolve();
        }
      }, REQUEST_DELAY);
    });
  },
};
