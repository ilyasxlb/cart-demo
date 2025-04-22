import {makeAutoObservable, runInAction} from 'mobx';

import {analyticsService} from '@services/analyticsService';

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

export const analyticsEventsStore = {
  events: [] as AnalyticsEventRecord[],

  send: <T>(payload: AnalyticsPayload<T>) => {
    const event: AnalyticsEventRecord<T> = {
      payload,
      status: 'pending',
      error: null,
    };

    analyticsEventsStore.events.push(event);

    analyticsService
      .sendEvent(payload)
      .then(() =>
        runInAction(() => {
          analyticsEventsStore.events.push({...event, status: 'success'});
        }),
      )
      .catch(error =>
        runInAction(() => {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
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
