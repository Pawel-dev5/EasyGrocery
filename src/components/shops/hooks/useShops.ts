import { useState } from 'react';

export const useShops = () => {
	const [visible, isVisible] = useState();

	return {
		visible,
		isVisible,
	};
};
