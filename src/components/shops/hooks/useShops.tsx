import React, { createContext, useEffect, useState } from 'react';

// MODELS
import { ContextProviderProps } from 'config/models';
import { ShopDataInterface } from 'components/shops/models/hooks';
import axios from 'axios';

// UTILS
import { shopQuery } from 'utils/queries';

export const useShops = () => {
	const [visible, setVisible] = useState(false);
	const [shops, setShops] = useState<ShopDataInterface[] | []>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [backendError, setBackendError] = useState(true);
	const [singleShop, setSingleShop] = useState<ShopDataInterface | null>(null);

	const getShops = () => {
		axios
			.get(`shops?${shopQuery}`)
			.then((resp) => {
				setIsLoading(false);
				setShops(resp?.data?.data);
			})
			.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	useEffect(() => {
		if (singleShop) return setVisible(true);
		if (singleShop && !visible) return setSingleShop(null);
		setVisible(false);
	}, [singleShop, visible]);

	const handleBottomSheetClose = () => {
		setVisible(false);
		setSingleShop(null);
	};

	return {
		visible,

		shops,
		setShops,
		getShops,
		isLoading,
		backendError,
		singleShop,
		handleBottomSheetClose,
		setSingleShop,
	};
};

export const ShopsContextData = createContext({} as ReturnType<typeof useShops>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<ShopsContextData.Provider value={useShops()}>{children}</ShopsContextData.Provider>
);
