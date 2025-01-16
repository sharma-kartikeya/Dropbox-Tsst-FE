type BaseResponseType<T = any> = {
    data?: T,
    error?: string
}

export type User = {
    name: string,
    email: string,
    phone: string,
    rootDirectoryId: string
}

export type UserResponse = BaseResponseType<User>;

export type Directory = {
    id: string,
    name: string,
    isFile: boolean,
}

export type DirectoryResponse = BaseResponseType<Directory>;
export type DirectoriesResponse = BaseResponseType<Directory[]>
export type StringResponse = BaseResponseType<string>;

