import React, { useContext } from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { t } from 'i18next';
import { REACT_APP_API } from '@env';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// MODELS
import { ShopsContextData } from 'components/shops/hooks/useShops';
import { StyledListShopCategories, StyledShopImage } from 'components/lists/partials/Styles';

export const ListShops = () => {
	const { editedSingleList, setNewShop, newShop } = useContext(ListsContextData);

	const { shops } = useContext(ShopsContextData);

	return (
		<>
			<ScrollView contentContainerStyle={styles.scrollView} horizontal>
				{shops?.map((shop) => {
					const {
						id,
						attributes: {
							title,
							// image: {
							// 	data: {
							// 		attributes: { url, alternativeText },
							// 	},
							// },
						},
					} = shop;

					const isActiveShop = () => {
						if (id === newShop?.id)
							return {
								transform: [{ scale: 1.12 }],
							};
						if (id === editedSingleList?.shop?.data?.id && newShop === null)
							return {
								transform: [{ scale: 1.12 }],
							};
					};
					return (
						<TouchableOpacity key={id} onPress={() => setNewShop(shop)}>
							{/* <StyledShopImage
								source={{ uri: `${REACT_APP_API}${url.substring(1)}` }}
								style={[{ resizeMode: 'contain' }, isActiveShop()]}
								alt={alternativeText}
							/> */}
							<Text style={[isActiveShop()]}>{title}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
			<View>
				{newShop !== null && (
					<View>
						{newShop?.attributes?.orders?.map(({ id, value }) => (
							<StyledListShopCategories key={id}>{value}</StyledListShopCategories>
						))}
					</View>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		minWidth: '100%',
		justifyContent: 'space-between',
		paddingVertical: 16,
	},
});
