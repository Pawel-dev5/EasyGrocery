import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { REACT_APP_API } from '@env';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
	if (!config) config = {};
	if (!config.headers) config.headers = {};
	config.baseURL = `${REACT_APP_API}api/`;
	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
	axiosInstance.interceptors.request.use(
		(e) => onRequest(e),
		(e) => onRequestError(e),
	);
	axiosInstance.interceptors.response.use(
		(e) => onResponse(e),
		(e) => onResponseError(e),
	);
	return axiosInstance;
};
