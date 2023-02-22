import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { REACT_APP_SHOPS_API } from '@env';

// REDUX
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { globalSetAlert } from 'redux/slices/global';
import { selectSocket } from 'redux/slices/socket';
import { AlertTypes } from 'redux/slices/global/models';

// MODELS
import { AddProductInterface, ProductInterface } from 'components/shops/models/hooks';

// UTILS
import { listQuery, productQuery, shopsPromotionQuery, shopsQuery } from 'utils/queries';

// HELPERS
import { categoriesHandler } from 'components/shops/helpers/categoriesHandler';
import { convertListShopAttrubites } from 'components/lists/helpers/convertListShopAttrubites';

// MODELS
import { SocketErrorInterface } from 'config/models';

export const useProductsList = ({ url, category }: { url: string; category: string }) => {
	const dispatch = useAppDispatch();
	const socketState = useAppSelector(selectSocket);
	const baseApi = `${REACT_APP_SHOPS_API}api/${url}`;

	const [productsList, setProductsList] = useState<ProductInterface[] | null>(null);
	const [lastWeekPromotions, setLastWeekPromotions] = useState<ProductInterface[] | null>(null);
	const [similarProductsList, setSimilarProductsList] = useState<ProductInterface[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [totalProductsCount, setTotalProductsCount] = useState(0);
	const [totalPromotionsCount, setTotalPromotionsCount] = useState(0);

	const getProducts = async (searchValue: string) => {
		setIsLoading(true);

		axios({
			method: 'get',
			url: `${baseApi}?${shopsQuery(url, categoriesHandler(category), 1, searchValue)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalProductsCount(resp?.data?.meta?.pagination?.total);
				const newArr: any = [];
				resp?.data?.data?.forEach((item: any) => {
					newArr.push({ id: item?.id, ...item?.attributes });
				});
				setProductsList(newArr);
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
			url: `${baseApi}?${shopsPromotionQuery(url, categoriesHandler(category), 1, searchValue)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				setTotalPromotionsCount(resp?.data?.meta?.pagination?.total);
				const newArr: any = [];
				resp?.data?.data?.forEach((item: any) => {
					newArr.push({ id: item?.id, ...item?.attributes });
				});
				setLastWeekPromotions(newArr);
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
				if (productsList) {
					const newArr: any = [];
					resp?.data?.data?.forEach((item: any) => {
						newArr.push({ id: item?.id, ...item?.attributes });
					});
					setProductsList([...productsList, ...newArr]);
				}
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
				if (lastWeekPromotions) {
					const newArr: any = [];
					resp?.data?.data?.forEach((item: any) => {
						newArr.push({ id: item?.id, ...item?.attributes });
					});
					setLastWeekPromotions([...lastWeekPromotions, ...newArr]);
				}
			})
			.catch((error) => {
				if (error?.response?.data?.error?.message) {
					const { message, status, name } = error.response.data.error.message;
					dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
				}
			})
			.finally(() => callback());
	};

	const addProductToList = ({ list, product, callbackOnSuccess }: AddProductInterface) => {
		if (product && product !== null) {
			const { id: productId, ...rest } = product;

			const deletePricesId = () =>
				rest?.prices?.map((item) => {
					const { id: itemId, ...restItem } = item;
					return restItem;
				});

			axios
				.put(`lists/${list?.id}?${listQuery}`, {
					data: {
						items: [...list.items, { ...rest, prices: deletePricesId() }],
					},
				})
				.then((resp) => {
					// SOCKET UPDATE STATES
					if (socketState?.socket)
						socketState?.socket.emit(
							'listUpdate',
							{
								data: convertListShopAttrubites(resp?.data?.data),
							},
							(error: SocketErrorInterface) => {
								if (error?.response?.data?.error) {
									const { message, status, name } = error.response.data.error;
									dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
								}
							},
						);
				})
				.catch((error) => {
					if (error?.response?.data?.error) {
						const { message, status, name } = error.response.data.error;
						dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
					}
				})
				.finally(() => {
					if (callbackOnSuccess) callbackOnSuccess();
				});
		}
	};

	const getProductSimilarItems = (slicedTitle: string[]) => {
		axios({
			method: 'get',
			url: `${baseApi}?${productQuery(url, category, 1, slicedTitle)}`,
			headers: {
				Authorization: null,
			},
		})
			.then((resp) => {
				const newArr: any = [];
				resp?.data?.data?.forEach((item: any) => {
					const pricesKey = `${url}Prices`;
					const newPrices: any = item?.attributes[pricesKey as keyof ProductInterface];
					newArr.push({ id: item?.id, ...{ ...item?.attributes, prices: newPrices } });
				});
				setSimilarProductsList(newArr);
			})
			.catch((error) => {
				if (error?.response?.data?.error?.message) {
					const { message, status, name } = error.response.data.error.message;
					dispatch(globalSetAlert({ id: uuidv4(), type: AlertTypes.ERROR, message, status, name }));
				}
			})
			.finally(() => setIsLoading(false));
	};

	return {
		isLoading,
		productsList,
		lastWeekPromotions,
		totalProductsCount,
		totalPromotionsCount,
		similarProductsList,
		getProducts,
		getProductsOffset,
		addProductToList,
		getProductSimilarItems,
	};
};
