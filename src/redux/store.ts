import { createHashHistory } from "history/";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "../redux/sagas";
import {
  Action,
  Middleware,
  ThunkDispatch,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { clientsApi } from "./clientsApi";
import { toast } from "react-toastify";
import { authApi } from "./authApi";
import { versionsApi } from "./versionsApi";
import { supportLogsApi } from "./support/supportLogsApi";
import { roadmapApi } from "./support/roadmapApi";
//used for loading and saving state from local storage - unnecessary for now
//import { loadState, saveState } from './localStorage';
//import throttle from 'lodash/throttle';

//const history = createHashHistory({basename: "/icarus/demo/build"});
const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const customMiddleware: Middleware = (middlewareAPI) => {
  // called at start, left to right
  return function (next) {
    // called at start, right to left
    return function (action) {
      // called per action
      // code before `next` call runs
      var ret = next(action);
      // code after next call runs
      if (action.meta?.baseQueryMeta?.response?.status === 401) {
        console.log(
          "rafa",
          action.meta?.baseQueryMeta?.response?.status,
          action
        );
        toast("Unauthorized", {
          autoClose: 3000,
          type: "error",
        });
        middlewareAPI.dispatch({ type: "LOGOUT_401" });
        localStorage.removeItem("token");
      }
      return ret;
    };
  };
};

const middleware = [
  ...getDefaultMiddleware(),
  sagaMiddleware,
  routeMiddleware,
  authApi.middleware,
  clientsApi.middleware,
  versionsApi.middleware,
  supportLogsApi.middleware,
  roadmapApi.middleware,
  customMiddleware,
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
