export interface ITRack<T = undefined> {
    thumbnails: string[];
    _id: string;
    title: string;
    file: string;
    cate: string[];
    status: boolean;
    count_favorite: number;
    is_blocked: boolean;
    createdAt: string;
    updatedAt: string;
    user: T;
}

export interface IResPagin<T> extends IMeta {
    docs: T[];
}

export interface IMeta {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null | number;
    nextPage: null | number;
}

export type RoleUser = "user" | "admin";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    slug: string;
    password?: string;
    role: RoleUser;
    track: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ITRackSaveLocal {
    fileName: string;
    url_current: string;
    track_parent: string;
    is_active: boolean;
}
