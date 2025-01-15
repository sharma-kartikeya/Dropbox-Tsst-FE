type BaseResponseType<T = any> = {
    data?: T,
    error?: string
}

type UserResponseType = {
    name: string,
    email: string,
    phone: string,
    rootDirectoryId: string
}

export type UserResponse = BaseResponseType<UserResponseType>;

type DirectoryResponseType = {
    id: string,
    name: string,
    isFile: boolean,
}

export type DirectoryResponse = BaseResponseType<DirectoryResponseType>;
export type DirectoriesResponse = BaseResponseType<DirectoryResponseType[]>
export type StringResponse = BaseResponseType<string>;

