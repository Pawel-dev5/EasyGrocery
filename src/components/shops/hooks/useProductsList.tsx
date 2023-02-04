import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// REDUX
import { useAppDispatch } from 'redux/hooks';
import { globalSetAlert } from 'redux/slices/global';

// MODELS
import { ShopDataInterface } from 'components/shops/models/hooks';

// UTILS
import { AlertTypes } from 'redux/slices/global/models';
import { shopsQuery } from 'utils/queries';
import { CarrefourCategories } from 'utils/productCategoriesHandler';

export const useProductsList = ({ url, category }: { url: string; category: string }) => {
	const dispatch = useAppDispatch();
	const baseApi = `http://localhost:1337/api/${url}`;

	const [productsList, setProductsList] = useState<ShopDataInterface[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [totalProductsCount, setTotalProductsCount] = useState(0);

	const categoriesHandler = () => {
		const newArr = [];
		if (url === 'carrefours') {
			Object.entries(CarrefourCategories).forEach(([key, value]) => {
				if (key === category) newArr.push(...value);
			});
		} else newArr.push(category);

		return newArr;
	};

	const getProducts = async () => {
		setIsLoading(true);

		axios({
			method: 'get',
			url: `${baseApi}?${shopsQuery(url, categoriesHandler(), 1)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalProductsCount(resp?.data?.meta?.pagination?.total);
				setProductsList(resp?.data?.data);
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
			url: `${baseApi}?${shopsQuery(url, categoriesHandler(), start)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalProductsCount(resp?.data?.meta?.pagination?.total);
				if (productsList) setProductsList([...productsList, ...resp.data.data]);
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
		totalProductsCount,
		getProducts,
		getProductsOffset,
	};
};
