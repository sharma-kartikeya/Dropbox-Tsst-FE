import { useDispatch } from "react-redux";
import { useLazyGetUserStateQuery, useLoginUserMutation, useSignupMutation, useLogoutMutation, useFolderQuery, useLazyFolderQuery, useCreateFolderMutation, useUploadFileMutation, useLazyGetLinkQuery, NetworkApi } from "../redux/network";
import { AppDispatch } from "../redux/store";
import { useState } from "react";
import { ApiEndpointQuery, BaseQueryFn, DefinitionsFromApi, EndpointDefinition, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition } from "@reduxjs/toolkit/query";
import { UserResponse } from "../redux/ResopnseTypes";
import { LoginFormState } from '../pages/login/LoginPage';
import { SignupFormState } from "../pages/signup/SignupPage";

export enum ActionType {
    USER_STATE = 'USER_STATE',
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP',
    LOGOUT = 'LOGOUT',
    GET_FOLDER_CONTENT = 'GET_FOLDER_CONTENT',
    CREATE_FOLDER = 'CREATE_FOLDER',
    UPLOAD_FILE = 'UPLOAD_FILE',
    FILE_GET_LINK = 'FILE_GET_LINK',
    FILE_PUT_LINK = 'FILE_PUT_LINK',
}

type BaseAction<A> = {
    type: ActionType;
    args: A
}

export type UserStateAction = BaseAction<null>;
export type LoginAction = BaseAction<LoginFormState>;
export type SignupAction = BaseAction<SignupFormState>;
export type LogoutAction = BaseAction<null>;
export type GetFolderAction = BaseAction<string>;
export type CreateFolderAction = BaseAction<{ name: string, parentFolderId: string }>;
export type UplaodFileAction = BaseAction<{ file: File, folderId: string }>
export type GetFileLinkAction = BaseAction<string>;


const useActionDispatcher = () => {
    const dispatch = useDispatch<any>();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isError, setIsError] = useState<boolean>();
    const [error, setError] = useState<boolean>();

    const [fetchUserState] = useLazyGetUserStateQuery();
    const [dispatchLoginApi] = useLoginUserMutation();
    const [dispatchSignUpApi] = useSignupMutation();
    const [dispatchLogoutApi] = useLogoutMutation();
    const [fetchFolder] = useLazyFolderQuery();
    const [dispatchCreateFolderApi] = useCreateFolderMutation();
    const [dispatchFileUploadApi] = useUploadFileMutation();
    const [fetchFileLink] = useLazyGetLinkQuery();

    const dispatcher = (action: BaseAction<unknown>) => {
        switch (action.type) {
            case ActionType.USER_STATE:
                const userStateAction = action as UserStateAction
                return dispatch(fetchUserState(userStateAction.args));
            case ActionType.LOGIN:
                const loginAction = action as LoginAction;
                return dispatch(dispatchLoginApi(loginAction.args));
            case ActionType.SIGNUP:
                const signupAction = action as SignupAction;
                return dispatch(dispatchSignUpApi(signupAction.args));
            case ActionType.LOGOUT:
                const logoutAction = action as LogoutAction;
                return dispatch(dispatchLogoutApi(logoutAction.args));
            case ActionType.GET_FOLDER_CONTENT:
                const getFolderAction = action as GetFolderAction;
                return dispatch(fetchFolder(getFolderAction.args));
            case ActionType.CREATE_FOLDER:
                const createFolderAction = action as CreateFolderAction;
                return dispatch(dispatchCreateFolderApi(createFolderAction.args));
            case ActionType.UPLOAD_FILE:
                const uplaodFileAction = action as UplaodFileAction;
                const formData = new FormData();
                formData.set('file', uplaodFileAction.args.file);
                formData.set('folderId', uplaodFileAction.args.folderId);
                return dispatch(dispatchFileUploadApi(formData));
            case ActionType.FILE_GET_LINK:
                const getFileLinkAction = action as GetFileLinkAction;
                return dispatch(fetchFileLink(getFileLinkAction.args));
            default:
                return null
        }
    }

    return dispatcher;
}

const getEndpoint = (type: ActionType) => {

    const [fetchUserState] = useLazyGetUserStateQuery()
    const [dispatchLoginApi] = useLoginUserMutation()
    const [dispatchSignUpApi] = useSignupMutation()
    const [dispatchLogoutApi] = useLogoutMutation()
    const [fetchFolder] = useLazyFolderQuery()
    const [dispatchCreateFolderApi] = useCreateFolderMutation()
    const [dispatchFileUploadApi] = useUploadFileMutation()
    const [fetchFileLink] = useLazyGetLinkQuery()

    switch (type) {
        case ActionType.USER_STATE:
            return fetchUserState;
        case ActionType.LOGIN:
            return dispatchLoginApi;
        case ActionType.SIGNUP:
            return dispatchSignUpApi;
        case ActionType.LOGOUT:
            return dispatchLogoutApi;
        case ActionType.GET_FOLDER_CONTENT:
            return fetchFolder;
        case ActionType.CREATE_FOLDER:
            return dispatchCreateFolderApi;
        case ActionType.UPLOAD_FILE:
            return dispatchFileUploadApi;
        case ActionType.FILE_GET_LINK:
            return fetchFileLink;
        // case ActionType.FILE_PUT_LINK:
        //     return NetworkApi.endpoints.putLink;
        default:
            return null
    }
}

export default useActionDispatcher;