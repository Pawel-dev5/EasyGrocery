import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { REACT_APP_SHOPS_API } from '@env';

// REDUX
import { useAppDispatch } from 'redux/hooks';
import { globalSetAlert } from 'redux/slices/global';
import { AlertTypes } from 'redux/slices/global/models';

// MODELS
import { ShopDataInterface } from 'components/shops/models/hooks';

// UTILS
import { shopsPromotionQuery, shopsQuery } from 'utils/queries';

// HELPERS
import { convertPrices } from 'components/shops/helpers/convertPrices';
import { categoriesHandler } from 'components/shops/helpers/categoriesHandler';

export const useProductsList = ({ url, category }: { url: string; category: string }) => {
	const dispatch = useAppDispatch();
	const baseApi = `${REACT_APP_SHOPS_API}api/${url}`;

	const [productsList, setProductsList] = useState<ShopDataInterface[] | null>(null);
	const [lastWeekPromotions, setLastWeekPromotions] = useState<ShopDataInterface[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [totalProductsCount, setTotalProductsCount] = useState(0);
	const [totalPromotionsCount, setTotalPromotionsCount] = useState(0);

	const getProducts = async () => {
		setIsLoading(true);

		axios({
			method: 'get',
			url: `${baseApi}?${shopsQuery(url, categoriesHandler(category), 1)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalProductsCount(resp?.data?.meta?.pagination?.total);
				setProductsList(convertPrices({ url, data: resp?.data?.data }));
			})
			.catch((error) => {
				if (error?.response?.data?.error?.message) {
					const { message, status, name } = error.response.data.error.message;
					dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
				}
			})
			.finally(() => setIsLoading(false));

		axios({
			method: 'get',
			url: `${baseApi}?${shopsPromotionQuery(url, categoriesHandler(category), 1)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalPromotionsCount(resp?.data?.meta?.pagination?.total);
				setLastWeekPromotions(convertPrices({ url, data: resp?.data?.data }));
			})
			.catch((error) => {
				if (error?.response?.data?.error?.message) {
					const { message, status, name } = error.response.data.error.message;
					dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
				}
			})
			.finally(() => setIsLoading(false));
	};

	const getProductsOffset = (start: number, callback: () => void) => {
		axios({
			method: 'get',
			url: `${baseApi}?${shopsQuery(url, categoriesHandler(category), start)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalProductsCount(resp?.data?.meta?.pagination?.total);
				if (productsList) setProductsList([...productsList, ...convertPrices({ url, data: resp?.data?.data })]);
			})
			.catch((error) => {
				if (error?.response?.data?.error?.message) {
					const { message, status, name } = error.response.data.error.message;
					dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
				}
			})
			.finally(() => callback());

		axios({
			method: 'get',
			url: `${baseApi}?${shopsPromotionQuery(url, categoriesHandler(category), start)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalPromotionsCount(resp?.data?.meta?.pagination?.total);
				if (lastWeekPromotions)
					setLastWeekPromotions([...lastWeekPromotions, ...convertPrices({ url, data: resp?.data?.data })]);
			})
			.catch((error) => {
				if (error?.response?.data?.error?.message) {
					const { message, status, name } = error.response.data.error.message;
					dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
				}
			})
			.finally(() => callback());
	};

	return {
		isLoading,
		productsList,
		lastWeekPromotions,
		totalProductsCount,
		totalPromotionsCount,
		getProducts,
		getProductsOffset,
	};
};
