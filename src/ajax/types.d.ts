import {
    Method,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig
} from "axios";

export type resultType = {
    accessToken?: string;
};

export type RequestMethods = Extract<
    Method,
    "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface HuangHttpError extends AxiosError {
    isCancelRequest?: boolean;
}

export interface HuangHttpResponse extends AxiosResponse {
    config: HuangHttpRequestConfig;
}

export interface HuangHttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: HuangHttpRequestConfig) => void;
    beforeResponseCallback?: (response: HuangHttpResponse) => void;
}

export default class HuangHttp {
    request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: HuangHttpRequestConfig
    ): Promise<T>;
    post<T, P>(
        url: string,
        params?: T,
        config?: HuangHttpRequestConfig
    ): Promise<P>;
    get<T, P>(
        url: string,
        params?: T,
        config?: HuangHttpRequestConfig
    ): Promise<P>;
}
