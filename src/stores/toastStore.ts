import {makeAutoObservable, runInAction} from 'mobx';

export type Toast = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

export const toastStore = {
  queue: [] as Toast[],
  nextId: 1,

  showToast: (type: Toast['type'], message: string) => {
    const toast: Toast = {id: toastStore.nextId++, type, message};
    toastStore.queue.push(toast);
    setTimeout(() => {
      runInAction(() => {
        toastStore.queue = toastStore.queue.filter(t => t.id !== toast.id);
      });
    }, 3000);
  },
};

makeAutoObservable(toastStore);
