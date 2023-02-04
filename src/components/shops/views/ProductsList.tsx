import React from 'react';
import { View, Text } from 'react-native';

// COMPONENTS
import { AppWrapper } from 'components/layout';

export const ProductsList = (props: any) => {
	console.log('Lists');

	return (
		<AppWrapper
			{...props}
			routeName="products list title"
			// isLoading={isLoading}
			customPadding="0 0"
		>
			<View>
				<Text>elo</Text>
			</View>
		</AppWrapper>
	);
};
