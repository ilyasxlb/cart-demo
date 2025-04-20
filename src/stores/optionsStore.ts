import {makeAutoObservable, runInAction} from 'mobx';

import {fetchOptions, OptionKey} from '@services/optionsService';

export const optionsStore = {
  available: [] as OptionKey[], // доступные опции
  selected: [] as OptionKey[], // выбранные
  loading: false,

  loadAvailable: async (): Promise<void> => {
    optionsStore.loading = true;
    try {
      const options = await fetchOptions();
      runInAction(() => {
        optionsStore.available = options;
      });
    } finally {
      runInAction(() => {
        optionsStore.loading = false;
      });
    }
  },

  toggle: (opt: OptionKey): void => {
    optionsStore.selected = optionsStore.selected.includes(opt)
      ? optionsStore.selected.filter(o => o !== opt)
      : [...optionsStore.selected, opt];
  },

  clear: (): void => {
    optionsStore.selected = [];
  },
};

makeAutoObservable(optionsStore);
