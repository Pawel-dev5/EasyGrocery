import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// REDUX
import { useAppDispatch } from 'redux/hooks';
import { globalSetAlert } from 'redux/slices/global';
import { shopsSetshops } from 'redux/slices/shops';

// MODELS
import { ShopDataInterface } from 'components/shops/models/hooks';

// UTILS
import { shopQuery } from 'utils/queries';
import { AlertTypes } from 'redux/slices/global/models';
import { convertListShopAttrubites } from 'components/lists/helpers/convertListShopAttrubites';

export const useShops = () => {
	const dispatch = useAppDispatch();

	const [singleShop, setSingleShop] = useState<ShopDataInterface | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const getShops = async () => {
		setIsLoading(true);
		axios
			.get(`shops?${shopQuery}`)
			.then((resp) => {
				const newArr: any = [];
				resp?.data?.data?.forEach((item: any) => {
					newArr.push(convertListShopAttrubites(item));
				});
				dispatch(shopsSetshops(newArr));
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
		singleShop,
		getShops,
		setSingleShop,
	};
};
