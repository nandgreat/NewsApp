import AsyncStorage from "@react-native-async-storage/async-storage";

import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import loginSlice from "./login/loginSlice";
import newsListSlice from "./newsList/newsListSlice";
import sendNotificationSlice from "./push_notification/sendNotificationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    "newsListSlice",
    "sendNotificationSlice"
  ],
  whitelist: ["loginSlice"],
};

const appReducer = combineReducers({
  loginSlice: loginSlice,
  newsListSlice: newsListSlice,
  sendNotificationSlice: sendNotificationSlice
});

export const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "login/logout") {

    // Clearing AsyncStorage
    AsyncStorage.clear();

    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
      },
      immutableCheck: { warnAfter: 128 },
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
