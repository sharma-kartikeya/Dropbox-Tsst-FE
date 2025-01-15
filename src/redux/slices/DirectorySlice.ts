import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NetworkApi } from "../network";
import { UserResponse } from "../ResopnseTypes";


type DirectoryState = {
    currentFolderId: string;
    currentFolderName: string;
    currentPath?: string;
} | null

export const DirectorySlice = createSlice<DirectoryState, SliceCaseReducers<DirectoryState>, string, SliceSelectors<DirectoryState>>({
    name: 'directory',
    initialState: null,
    reducers: {
        setCurrentDirectory: (state: DirectoryState, action: PayloadAction<DirectoryState>) => {
            if (state && action.payload) {
                state.currentFolderId = action.payload.currentFolderId;
                state.currentFolderName = action.payload.currentFolderName;
                state.currentPath = action.payload.currentPath;
            } else {
                return action.payload;
            }
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(NetworkApi.endpoints.getUserState.matchFulfilled, (state: DirectoryState, action: PayloadAction<UserResponse>) => {
            if (!action.payload.data) {
                return null;
            }

            if (state) {
                state.currentFolderId = action.payload.data.rootDirectoryId;
                state.currentFolderName = "Root";
            } else {
                return {
                    currentFolderId: action.payload.data.rootDirectoryId,
                    currentFolderName: "Root",
                }
            }
        })

        builder.addMatcher(NetworkApi.endpoints.loginUser.matchFulfilled, (state: DirectoryState, action: PayloadAction<UserResponse>) => {
            if (!action.payload.data) {
                return null;
            }

            if (state) {
                state.currentFolderId = action.payload.data.rootDirectoryId;
                state.currentFolderName = "Root";
            } else {
                return {
                    currentFolderId: action.payload.data.rootDirectoryId,
                    currentFolderName: "Root",
                }
            }
        })

        builder.addMatcher(NetworkApi.endpoints.signup.matchFulfilled, (state: DirectoryState, action: PayloadAction<UserResponse>) => {
            if (!action.payload.data) {
                return null;
            }

            if (state) {
                state.currentFolderId = action.payload.data.rootDirectoryId;
                state.currentFolderName = "Root";
            } else {
                return {
                    currentFolderId: action.payload.data.rootDirectoryId,
                    currentFolderName: "Root",
                }
            }
        })
    }
})

export const CurrentDirectorySelector = (state: RootState) => state.directoryReducer;
export const { setCurrentDirectory } = DirectorySlice.actions;