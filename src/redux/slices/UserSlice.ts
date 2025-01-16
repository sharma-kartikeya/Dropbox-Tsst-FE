import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { NetworkApi } from "../network";
import { RootState } from "../store";
import { UserResponse } from "../ResopnseTypes";

type UserState = {
    name: string;
    email: string;
    phone: string;
    rootDirectoryId: string;
}

export type UserSliceState = UserState | null;

export const UserSlice = createSlice<UserSliceState, SliceCaseReducers<UserSliceState>, string, SliceSelectors<UserSliceState>>({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state: UserSliceState, action: PayloadAction<UserState>) => {
            return action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(NetworkApi.endpoints.getUserState.matchFulfilled, (state: UserSliceState, action: PayloadAction<UserResponse>) => {
            if (!action.payload.data) {
                return null;
            }

            if (state) {
                state.name = action.payload.data.name;
                state.email = action.payload.data.email;
                state.phone = action.payload.data.phone;
                state.rootDirectoryId = action.payload.data.rootDirectoryId
            } else {
                // If state is null, return a new object
                return {
                    name: action.payload.data.name,
                    email: action.payload.data.email,
                    phone: action.payload.data.phone,
                    rootDirectoryId: action.payload.data.rootDirectoryId
                };
            }
        });

        builder.addMatcher(NetworkApi.endpoints.getUserState.matchRejected, () => {
            return null;
        });

        builder.addMatcher(NetworkApi.endpoints.signup.matchFulfilled, (state: UserSliceState, action: PayloadAction<UserResponse>) => {
            if (!action.payload.data) {
                return null;
            }
            return {
                name: action.payload.data.name,
                email: action.payload.data.email,
                phone: action.payload.data.phone,
                rootDirectoryId: action.payload.data.rootDirectoryId
            };
        });

        builder.addMatcher(NetworkApi.endpoints.loginUser.matchFulfilled, (state: UserSliceState, action: PayloadAction<UserResponse>) => {
            if (!action.payload.data) {
                return null;
            }
            return {
                name: action.payload.data.name,
                email: action.payload.data.email,
                phone: action.payload.data.phone,
                rootDirectoryId: action.payload.data.rootDirectoryId
            };
        });

        builder.addMatcher(NetworkApi.endpoints.logout.matchFulfilled, () => {
            return null;
        });
    },
});

export const UserStateSelector = (state: RootState) => state.userReducer;
export const RootDirectoryIdSelector = (state: RootState) => state.userReducer?.rootDirectoryId
export default UserSlice.reducer;