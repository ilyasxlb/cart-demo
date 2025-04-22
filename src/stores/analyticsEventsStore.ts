import {makeAutoObservable, runInAction} from 'mobx';

import {analyticsService} from '@services/analyticsService';

import {MAX_EVENTS} from '../constants.ts';

// набор "типов" ивента, не фиксирован в данной реализации, но имеет базовый набор
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

type AnalyticsEventRecord<T = unknown> = {
  payload: AnalyticsPayload<T>;
  status: 'pending' | 'success' | 'error' | null;
  error: string | null;
};

type AnalyticsEventsStore = {
  events: AnalyticsEventRecord[];
  send: <T>(payload: AnalyticsPayload<T>) => void;
  readonly lastEvent: AnalyticsEventRecord | null;
};

// модель, mobx-стор хранящий список событий со статусом выполнения запросов к "серверу"
// размер в данной реализации не ограничен, как и у Toast очереди сообщений, поэтому "осторожно"
export const analyticsEventsStore: AnalyticsEventsStore = {
  events: [],

  send: <T>(payload: AnalyticsPayload<T>) => {
    // создаем ивент и устанавливаем статус его отправки/выполнения в pending
    const event: AnalyticsEventRecord<T> = {
      payload,
      status: 'pending',
      error: null,
    };

    // добавляем созданный ивент в стор
    analyticsEventsStore.events.push(event);

    if (analyticsEventsStore.events.length > MAX_EVENTS) {
      analyticsEventsStore.events = analyticsEventsStore.events.slice(
        -MAX_EVENTS,
      );
    }

    // выполняем отправку данных на "сервер"
    analyticsService
      .sendEvent(payload)
      .then(() =>
        runInAction(() => {
          // при успешном выполнении запроса, добавляем новое событие,
          // на основе изначально созданного, но имеющее статус "выполнено"
          analyticsEventsStore.events.push({...event, status: 'success'});
        }),
      )
      .catch(error =>
        runInAction(() => {
          // в случае ошибки при выполнении запроса, парсим сообщение ошибки
          const errorMessage =
            error instanceof Error ? error.message : String(error);

          // и на основе ранее созданного ивента, добавляем новое, но имеющее статус "ошибка"
          analyticsEventsStore.events.push({
            ...event,
            status: 'error',
            error: errorMessage,
          });
        }),
      );
  },

  get lastEvent() {
    return (
      analyticsEventsStore.events[analyticsEventsStore.events.length - 1] ??
      null
    );
  },
};

makeAutoObservable(analyticsEventsStore);
