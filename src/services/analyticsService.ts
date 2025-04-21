import {OptionKey} from '@services/optionsService.ts';
import {Product} from '@services/productService.ts';

export type AnalyticsPayload = {
  items: Product[];
  options: OptionKey[];
};

export const analyticsService = {
  sendEvent: (_payload: AnalyticsPayload): Promise<void> => {
    return new Promise<void>(resolve => setTimeout(resolve, 0)).then(() => {
      if (Math.random() < 0.2) {
        throw new Error('Сервис аналитики недоступен');
      }
    });
  },
};
