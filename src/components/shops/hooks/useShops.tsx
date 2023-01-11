import React, { createContext, useEffect, useState } from 'react';

// MODELS
import { ContextProviderProps } from 'config/models';
import { ShopDataInterface } from 'components/shops/models/hooks';
import axios from 'axios';

// UTILS
import { shopQuery } from 'utils/queries';

export const useShops = () => {
	const [shops, setShops] = useState<ShopDataInterface[] | []>([]);
	const [singleShop, setSingleShop] = useState<ShopDataInterface | null>(null);
	const [bottomSheetActive, setBottomSheetActive] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [backendError, setBackendError] = useState(true);

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
		if (singleShop) return setBottomSheetActive(true);
		if (singleShop && !bottomSheetActive) return setSingleShop(null);
		return setBottomSheetActive(false);
	}, [singleShop, bottomSheetActive]);

	const handleBottomSheetClose = () => {
		setBottomSheetActive(false);
		setSingleShop(null);
	};

	return {
		bottomSheetActive,
		shops,
		isLoading,
		backendError,
		singleShop,
		setShops,
		getShops,
		handleBottomSheetClose,
		setSingleShop,
		setBottomSheetActive,
	};
};

export const ShopsContextData = createContext({} as ReturnType<typeof useShops>);

export const ContextProvider = ({ children }: ContextProviderProps) => (
	<ShopsContextData.Provider value={useShops()}>{children}</ShopsContextData.Provider>
);
