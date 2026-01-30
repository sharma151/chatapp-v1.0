import { AxiosResponse } from "axios";

export interface AxioxInterface<T> extends AxiosResponse<T> {
  message: string;
}

export interface AxiosResponseInterface<T> {
  data: AxioxInterface<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
}

export interface AxiosPaginatedResponseInterface<T> {
  data: {
    data: {
      paginatedResult: T;
      metadata: {
        totalPages: number;
        currentPage: number;
        nextPage: number;
        totalData: number;
      };
    };
  };
}

export interface AvailableUsersResponse {
  admin: string;
  createdAt: string;
  isGroupChat: boolean;
  name: string;
  participants: UserResponse[];
  lastMessage: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
