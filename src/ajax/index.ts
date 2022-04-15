import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import {
    resultType,
    HuangHttpError,
    RequestMethods,
    HuangHttpResponse,
    HuangHttpRequestConfig
} from "./types.d";

const defaultConfig: AxiosRequestConfig = {
    baseURL: "",
    timeout: 10000,
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    paramsSerializer: params => qs.stringify(params, { indices: false })
};

class HuangHttp {
    constructor() {
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }
    private static initConfig: HuangHttpRequestConfig = {};

    private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

    private httpInterceptorsRequest(): void {
        HuangHttp.axiosInstance.interceptors.request.use(
            (config: HuangHttpRequestConfig) => {
                const $config = config;
                if (typeof config.beforeRequestCallback === "function") {
                    config.beforeRequestCallback($config);
                    return $config;
                }
                if (HuangHttp.initConfig.beforeRequestCallback) {
                    HuangHttp.initConfig.beforeRequestCallback($config);
                    return $config;
                }
                return $config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    private httpInterceptorsResponse(): void {
        const instance = HuangHttp.axiosInstance;
        instance.interceptors.response.use(
            (response: HuangHttpResponse) => {
                const $config = response.config;
                if (typeof $config.beforeResponseCallback === "function") {
                    $config.beforeResponseCallback(response);
                    return response.data;
                }
                if (HuangHttp.initConfig.beforeResponseCallback) {
                    HuangHttp.initConfig.beforeResponseCallback(response);
                    return response.data;
                }
                return response.data;
            },
            (error: HuangHttpError) => {
                const $error = error;
                $error.isCancelRequest = Axios.isCancel($error);
                return Promise.reject($error);
            }
        );
    }

    public request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: HuangHttpRequestConfig
    ): Promise<T> {
        const config = {
            method,
            url,
            ...param,
            ...axiosConfig
        } as HuangHttpRequestConfig;

        return new Promise((resolve, reject) => {
            HuangHttp.axiosInstance
                .request(config)
                .then((response: undefined) => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public post<T, P>(
        url: string,
        params?: T,
        config?: HuangHttpRequestConfig
    ): Promise<P> {
        return this.request<P>("post", url, params, config);
    }

    public get<T, P>(
        url: string,
        params?: T,
        config?: HuangHttpRequestConfig
    ): Promise<P> {
        return this.request<P>("get", url, params, config);
    }
}

export const http = new HuangHttp();
