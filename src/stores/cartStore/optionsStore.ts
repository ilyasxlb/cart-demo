import {makeAutoObservable, runInAction} from 'mobx';

import {fetchOptions, OptionKey} from '@services/optionsService.ts';

type OptionsProp = {
  available: OptionKey[];
  selected: OptionKey[];
  loading: boolean;
  loadAvailable: () => Promise<void>;
  toggle: (opt: OptionKey) => void;
  clear: () => void;
};

export const optionsStore: OptionsProp = {
  available: [], // доступные опции
  selected: [], // выбранные
  loading: false,

  loadAvailable: async () => {
    optionsStore.loading = true;
    try {
      const fetchedOptions = await fetchOptions();
      runInAction(() => {
        optionsStore.available = fetchedOptions;
      });
    } finally {
      runInAction(() => {
        optionsStore.loading = false;
      });
    }
  },

  toggle: opt => {
    optionsStore.selected = optionsStore.selected.includes(opt)
      ? optionsStore.selected.filter(o => o !== opt)
      : [...optionsStore.selected, opt];
  },

  clear: () => {
    optionsStore.selected = [];
  },
};

makeAutoObservable(optionsStore);
