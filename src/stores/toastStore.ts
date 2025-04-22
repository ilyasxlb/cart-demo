import {makeAutoObservable, runInAction} from 'mobx';

import {TOAST_DELAY} from '../constants.ts';

export type Toast = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

type ToastStore = {
  queue: Toast[];
  nextId: number;
  showToast: (type: Toast['type'], message: string) => void;
};

export const toastStore: ToastStore = {
  queue: [],
  nextId: 1,

  showToast: (type: Toast['type'], message: string) => {
    const toast: Toast = {id: toastStore.nextId++, type, message};
    toastStore.queue.push(toast);
    setTimeout(() => {
      runInAction(() => {
        toastStore.queue = toastStore.queue.filter(t => t.id !== toast.id);
      });
    }, TOAST_DELAY);
  },
};

makeAutoObservable(toastStore);
