import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { REACT_APP_API } from '@env';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
	if (!config) {
		// eslint-disable-next-line
		config = {};
	}

	if (!config.headers) {
		// eslint-disable-next-line
		config.headers = {};
	}

	config.baseURL = `${REACT_APP_API}api/`;
	config.headers['Accept-Language'] = 'en';
	// config.headers['Authorization'] = tmp;

	if (!config.headers.withoutAuthorization) {
		config.headers.Authorization = config.headers?.token;
	}

	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
	axiosInstance.interceptors.request.use(
		(e) => onRequest(e),
		(e) => onRequestError(e),
	);
	axiosInstance.interceptors.response.use(
		(e) => onResponse(e),
		(e) => onResponseError(e),
	);
	return axiosInstance;
}
