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
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { clientsApi } from "./settings/clientsApi";
import { toast } from "react-toastify";
import { authApi } from "./authApi";
import { versionsApi } from "./settings/versionsApi";
import { supportLogsApi } from "./support/supportLogs/supportLogsApi";
import { roadmapApi } from "./support/roadmap/roadmapApi";
import { auditChecklistsApi } from "./auditChecklistsApi";
import { usersApi } from "./user/usersApi";
import { loggerApi } from "./logger/loggerApi";
import { softwareLogSubscriptionApi } from "./support/subscriptions/softwareLogSubscriptionApi";
import { forumTagsApi } from "./forum/forumTags/forumTagsApi";
import { forumTopicsApi } from "./forum/forumTopics/forumTopicsApi";
import { forumCommentsApi } from "./forum/forumComments/forumCommentsApi";
import { forumUsersApi } from "./forum/forumUsers/forumUsersApi";
import { forumTopicUsersApi } from "./forum/forumUsers/forumTopicUsersApi";
import { forumLikesApi } from "./forum/forumLikes/forumLikesApi";
import { reportHazardIdentificationApi } from "./reportHazardIdentification/reportHazardIdentificationApi";
import { hazardClassificationApi } from "./hazardClassification/hazardClassificationApi";
import { reportApi } from "./report/reportApi";
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

const middleware: Middleware[] = [
  sagaMiddleware,
  routeMiddleware,
  authApi.middleware,
  auditChecklistsApi.middleware,
  usersApi.middleware,
  clientsApi.middleware,
  versionsApi.middleware,
  supportLogsApi.middleware,
  softwareLogSubscriptionApi.middleware,
  roadmapApi.middleware,
  customMiddleware,
  loggerApi.middleware,
  forumTagsApi.middleware,
  forumTopicsApi.middleware,
  forumCommentsApi.middleware,
  forumUsersApi.middleware,
  forumTopicUsersApi.middleware,
  forumLikesApi.middleware,
  reportHazardIdentificationApi.middleware,
  hazardClassificationApi.middleware,
  reportApi.middleware,
];

//used for lading state from local storage - unnecessary for now
//const persistedState = loadState();

const reducers = createRootReducer(history);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
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
