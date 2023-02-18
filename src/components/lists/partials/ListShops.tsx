import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { t } from 'i18next';

// REDUX
import { selectShops } from 'redux/slices/shops';
import { useAppSelector } from 'redux/hooks';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// STYLES
import { StyledListShopCategories, StyledShopImage, ListShopsInlineStyles } from 'components/lists/partials/Styles';

export const ListShops = () => {
	const shopState = useAppSelector(selectShops);
	const { shops } = shopState;
	const { editedSingleList, setNewShop, newShop } = useContext(ListsContextData);

	return (
		<>
			{/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
			<ScrollView contentContainerStyle={ListShopsInlineStyles?.scrollView} horizontal>
				{shops?.map((shop) => {
					const isActiveShop = () => {
						if (shop?.id === newShop?.id)
							return {
								transform: [{ scale: 1.12 }],
							};
						if (shop?.id === editedSingleList?.shop?.id && newShop === null)
							return {
								transform: [{ scale: 1.12 }],
							};
						return null;
					};
					return (
						<TouchableOpacity key={shop?.id} onPress={() => setNewShop(shop)}>
							<StyledShopImage source={{ uri: shop?.image?.url }} style={[{ resizeMode: 'cover' }, isActiveShop()]} />
						</TouchableOpacity>
					);
				})}
			</ScrollView>
			<View>
				{newShop !== null && (
					<View>
						{newShop?.orders?.map(({ id, value }) => (
							<StyledListShopCategories key={id}>{t<string>(`shopCategories.${value}`)}</StyledListShopCategories>
						))}
					</View>
				)}
			</View>
		</>
	);
};
