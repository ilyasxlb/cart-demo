import {OPTIONS_SERVICE_UNAVAILABLE, REQUEST_DELAY} from '../constants.ts';

export type OptionKey =
  | 'at_the_door'
  | 'need_call'
  | 'intercom_available'
  | 'angry_concierge';

export type OptionState = {
  [key in OptionKey]: boolean;
};

export const fetchOptions = async (): Promise<OptionKey[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < OPTIONS_SERVICE_UNAVAILABLE)
        return reject(new Error('API списка опций не доступен'));
      resolve([
        'at_the_door',
        'need_call',
        'intercom_available',
        'angry_concierge',
      ]);
    }, REQUEST_DELAY);
  });
};

export const OPTIONS_LABELS: Record<OptionKey, string> = {
  at_the_door: 'Оставить у двери',
  need_call: 'Позвонить',
  intercom_available: 'Домофон есть',
  angry_concierge: 'Злой консьерж',
};
