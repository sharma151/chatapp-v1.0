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
