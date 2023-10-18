import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { playListSlice } from "./playList/slice";
import { playControllerSlice } from "./playController/slice";
import { songCategorySlice } from "./songCategory/slice";
import songListSlice from "./songList/slice";
// 创建持久化配置
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["playList"],
};
// 组合各切片中的reducer
const rootReducer = combineReducers({
  playList: playListSlice.reducer,
  playController: playControllerSlice.reducer,
  songCategory: songCategorySlice.reducer,
  songList: songListSlice.reducer,
});
// 创建持久化reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// 创建普通store
const store = configureStore({
  reducer: persistedReducer,
});
// 创建持久化store
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export default { store, persistor };
