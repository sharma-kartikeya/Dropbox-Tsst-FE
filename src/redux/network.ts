import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginFormState } from '../pages/LoginPage'
import { SignupFormState } from '../pages/SignupPage'
import { DirectoriesResponse, DirectoryResponse, StringResponse, UserResponse } from './ResopnseTypes';

export const NetworkApi = createApi({
    reducerPath: 'network',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({

        getUserState: builder.query<UserResponse, any>({
            query: () => {
                return {
                    url: `user/me`,
                    method: 'GET',
                }
            },
        }),

        signup: builder.mutation<UserResponse, SignupFormState>({
            query: (body) => ({
                url: `user/signup`,
                method: 'POST',
                body,
            }),
        }),

        loginUser: builder.mutation<UserResponse, LoginFormState>({
            query: (body) => ({
                url: `user/login`,
                method: 'POST',
                body,
            })
        }),

        logout: builder.mutation<StringResponse, null>({
            query: () => ({
                url: `user/logout`,
                method: 'POST',
            })
        }),

        folder: builder.query<DirectoriesResponse, string | undefined>({
            query: (folderId) => ({
                url: 'file/folder',
                method: 'GET',
                params: {
                    folderId: folderId
                },
                credentials: 'include',
                cacheTime: 3600
            })
        }),

        createFolder: builder.mutation<DirectoryResponse, { name: string, parentFolderId: string }>({
            query: (body) => ({
                url: 'file/create-folder',
                method: 'POST',
                body
            })
        })
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetUserStateQuery, useLoginUserMutation, useSignupMutation, useLogoutMutation, useFolderQuery, useLazyFolderQuery, useCreateFolderMutation } = NetworkApi
export default NetworkApi.reducer