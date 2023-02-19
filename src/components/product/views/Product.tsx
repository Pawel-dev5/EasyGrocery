import React from 'react';
import { Text, View } from 'react-native';

// REDUX
import { useAppSelector } from 'redux/hooks';
import { selectProduct } from 'redux/slices/product';

// COMPONENTS
import { AppWrapper } from 'components/layout';

export const Product = (props: any) => {
	const productState = useAppSelector(selectProduct);
	const { data } = productState;

	return (
		<AppWrapper {...props} routeName={data?.title}>
			<View>
				<Text>{data?.title}</Text>
			</View>
		</AppWrapper>
	);
};
