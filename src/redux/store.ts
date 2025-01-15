import { configureStore } from "@reduxjs/toolkit";
import NetworkReducer, { NetworkApi } from "./network";
import { UserSlice } from "./slices/UserSlice";
import { AppSlice } from "./slices/AppSlice";
import { DirectorySlice } from "./slices/DirectorySlice";

const store = configureStore({
    reducer: {
        [NetworkApi.reducerPath]: NetworkReducer,
        userReducer: UserSlice.reducer,
        appReducer: AppSlice.reducer,
        directoryReducer: DirectorySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(NetworkApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;