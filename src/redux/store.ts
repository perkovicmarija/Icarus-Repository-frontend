import { createHashHistory } from "history/";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "../redux/sagas";
import {
  Action,
  ThunkDispatch,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { clientsApi } from "../api2/clientsApi";
//used for loading and saving state from local storage - unnecessary for now
//import { loadState, saveState } from './localStorage';
//import throttle from 'lodash/throttle';

//const history = createHashHistory({basename: "/icarus/demo/build"});
const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middleware = [
  ...getDefaultMiddleware(),
  sagaMiddleware,
  routeMiddleware,
  clientsApi.middleware,
];

//used for lading state from local storage - unnecessary for now
//const persistedState = loadState();

const reducers = createRootReducer(history);

const store = configureStore({
  reducer: reducers,
  middleware,
});

/*const store = createStore(
    createRootReducer(history),
    //persistedState,
    compose(applyMiddleware(...middlewares))
);*/

//used for saving state from local storage - unnecessary for now
/*store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));*/

sagaMiddleware.run(rootSaga);

const getStore = () => store;
export { store, history, getStore };

export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppDispatch = useDispatch<ThunkAppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
