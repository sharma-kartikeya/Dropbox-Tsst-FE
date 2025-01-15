import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NetworkApi } from "../network";

export type AppState = {
    loading: boolean;
}

export const AppSlice = createSlice<AppState, SliceCaseReducers<AppState>, string, SliceSelectors<AppState>>({
    name: 'app',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoading: (state: AppState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(NetworkApi.endpoints.getUserState.matchPending, (state: AppState, action: PayloadAction<any>) => {
            state.loading = true;
        });

        builder.addMatcher(NetworkApi.endpoints.getUserState.matchFulfilled, (state: AppState, action: PayloadAction<any>) => {
            state.loading = false;
        });

        builder.addMatcher(NetworkApi.endpoints.getUserState.matchRejected, (state: AppState, action: PayloadAction<any>) => {
            state.loading = false;
        });
    }
})

export const AppLoadingSelector = (state: RootState) => state.appReducer.loading;