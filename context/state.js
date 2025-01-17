import { createContext, useContext } from 'react';
import { getStorage, writeStorage } from 'next-persist';

const sharedState = {
  cart: [],
  favorites: [],
  cartTotal: 0,

  setSharedState: (location, product, add = true) => {
    if (add) {
      if (location !== 'cartTotal') {
        sharedState[location].push(product);
      } else {
        sharedState[location] += product.price;
      }
    } else {
      const position = sharedState[location].indexOf(product);
      sharedState[location].splice(position, 1);
    }
    writeStorage(sharedState);
  },
};

export function AppWrapper({ children }) {
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

const nextPersistConfig = {
  allowList: ['cart', 'favorites', 'cartTotal'],
};

let AppContext = createContext(getStorage(nextPersistConfig, sharedState));

export function useAppContext() {
  AppContext = createContext(getStorage(nextPersistConfig, sharedState));
  return useContext(AppContext);
}
