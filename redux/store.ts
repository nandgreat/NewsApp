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
import changePintTypeSlice from "./change_pin_type/changePintTypeSlice";
import loginSlice from "./login/loginSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    "getTransactionHistorySlice",
    "changType"
  ],
  whitelist: ["loginSlice"],
};

const appReducer = combineReducers({
  loginSlice: loginSlice,
  changType: changePintTypeSlice
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
