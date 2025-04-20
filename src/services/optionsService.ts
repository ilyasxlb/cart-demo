export type OptionKey =
  | 'at_the_door'
  | 'need_call'
  | 'intercom_available'
  | 'angry_concierge';

export type OptionState = {
  [key in OptionKey]: boolean;
};

export const fetchOptions = async (): Promise<OptionKey[]> =>
  Promise.resolve([
    'at_the_door',
    'need_call',
    'intercom_available',
    'angry_concierge',
  ]);

export const OPTIONS_LABELS: Record<OptionKey, string> = {
  at_the_door: 'Оставить у двери',
  need_call: 'Позвонить',
  intercom_available: 'Домофон есть',
  angry_concierge: 'Злой консьерж',
};
