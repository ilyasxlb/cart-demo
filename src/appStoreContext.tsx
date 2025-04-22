import React, {createContext, useContext, ReactNode} from 'react';

import {RootStore, rootStore} from '@stores/rootStore.ts';

const AppStoreContext = createContext<RootStore>(rootStore);
export const StoreProvider: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <AppStoreContext.Provider value={rootStore}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useStores = (): RootStore => useContext(AppStoreContext);
