import React, {createContext, useContext, ReactNode} from 'react';

import {RootStore, rootStore} from './rootStore';

const StoreContext = createContext<RootStore>(rootStore);
export const StoreProvider: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStores = (): RootStore => useContext(StoreContext);
