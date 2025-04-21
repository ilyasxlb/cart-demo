import {makeAutoObservable, runInAction} from 'mobx';

import {AnalyticsPayload, analyticsService} from '@services/analyticsService';

type AnalyticsError = string;
type AnalyticsStatus = 'success' | 'error' | 'pending';

type AnalyticsStoreProp = {
  status: AnalyticsStatus | null;
  error: AnalyticsError | null;
  lastPayload: AnalyticsPayload | null;
  send: (payload: AnalyticsPayload) => void;
};
export const analyticsEventsStore: AnalyticsStoreProp = {
  status: null,
  error: null,
  lastPayload: null,

  send: (payload: AnalyticsPayload) => {
    analyticsEventsStore.status = 'pending';
    analyticsEventsStore.lastPayload = payload;
    analyticsEventsStore.error = null;

    analyticsService
      .sendEvent(payload)
      .then(() =>
        runInAction(() => {
          analyticsEventsStore.status = 'success';
        }),
      )
      .catch(error =>
        runInAction(() => {
          analyticsEventsStore.status = 'error';
          analyticsEventsStore.error =
            error instanceof Error ? error.message : String(error);
        }),
      );
  },
};

makeAutoObservable(analyticsEventsStore);
