import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sagas from "./sagas";
import reducers from "./ducks";

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleware = [sagaMiddleware];
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["categories", "products"]
};

const persistReducers = persistReducer(persistConfig, reducers);

const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;
const store = createAppropriateStore(
  persistReducers,
  applyMiddleware(...middleware)
);

sagaMiddleware.run(sagas);
export const persistor = persistStore(store);

export default store;
