import React, { useState, useContext } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon, Input, Loader } from 'components/layout/common';

// STYLES
import {
	StyledItemTitle,
	StyledItemTitleWrapper,
	StyledListItemsOptions,
	StyledListItemsWrapper,
	StyledCategory,
	StyledItemsCategory,
	StyledItemsContainer,
	StyledCheckButton,
	StyledEditInputWrapper,
	StyledItemButton,
	StyledItemPrice,
	StyledItemPricePromotion,
	StyledItemPricePromotionDescription,
} from 'components/lists/partials/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { EditItemInterface } from 'components/lists/models/elements';
import { ItemTitleVariants } from 'components/lists/models/partials';

export const Item = ({ id, title, done, category, prices }: ItemInterface) => {
	const [editableItem, setEditableItem] = useState<EditItemInterface | null>(null);
	const { updateSingleListItemName, deleteSingleListItem, updateSingleListItemStatus, singleList } =
		useContext(ListsContextData);

	// LOADERS STATES
	const [editLoading, setEditLoading] = useState(false);

	const categories = singleList?.shop?.data?.attributes?.orders;

	const pricesHandler = () => {
		let price;
		let promotionPrice;
		let promotionPriceDescription;

		if (prices && prices[0]) {
			price = prices[0].price;
			promotionPrice = prices[0].promotion === 'null' ? null : prices[0].promotion;
			promotionPriceDescription = prices[0].promotionDescription === 'null' ? null : prices[0].promotionDescription;
		}
		return { price, promotionPrice, promotionPriceDescription };
	};

	const titleLengthHandler = (length: number) => {
		let titleSize: ItemTitleVariants = ItemTitleVariants.DEFAULT;
		if (length) {
			if (length > 0 && length <= 15) {
				titleSize = ItemTitleVariants.LARGE;
			} else if (length > 15 && length <= 30) {
				titleSize = ItemTitleVariants.MEDIUM;
			} else titleSize = ItemTitleVariants.SMALL;
		}

		return titleSize;
	};

	return (
		<StyledItemsContainer>
			<StyledListItemsWrapper>
				<StyledItemTitleWrapper>
					<StyledCheckButton onPress={() => updateSingleListItemStatus(id)}>
						<Icon variant={done ? 'done' : 'unDone'} name={done ? 'check-circle' : 'circle'} size={30} />
					</StyledCheckButton>

					{editableItem !== null ? (
						<StyledEditInputWrapper>
							<Input
								value={editableItem.title!}
								name="title"
								placeholder="title"
								textContentType="nickname"
								onChange={(text) => setEditableItem({ ...editableItem, title: text as unknown as string })}
							/>
						</StyledEditInputWrapper>
					) : (
						<View style={{ flexDirection: 'column', marginLeft: 5, width: '100%' }}>
							<StyledItemTitle length={titleLengthHandler(title?.length)}>{title}</StyledItemTitle>

							<StyledCategory>
								{!pricesHandler().price && <Text>{t<string>(`shopCategories.${editableItem?.category || category}`)}</Text>}

								{pricesHandler().price && (
									<StyledItemPrice overpriced={!!pricesHandler().promotionPrice}>{pricesHandler().price}</StyledItemPrice>
								)}

								{pricesHandler().promotionPrice && (
									<StyledItemPricePromotion>{pricesHandler().promotionPrice}</StyledItemPricePromotion>
								)}
							</StyledCategory>

							<View>
								{pricesHandler().promotionPriceDescription && (
									<StyledItemPricePromotionDescription>
										{pricesHandler().promotionPriceDescription}
									</StyledItemPricePromotionDescription>
								)}
							</View>
						</View>
					)}
				</StyledItemTitleWrapper>

				<StyledListItemsOptions>
					{editableItem !== null ? (
						<StyledItemButton
							onPress={() => {
								setEditLoading(true);

								if (title === editableItem?.title && category === editableItem?.category) {
									setEditLoading(false);
									setEditableItem(null);
									return null;
								}
								updateSingleListItemName(id, editableItem, () => {
									setEditableItem(null);
									setEditLoading(false);
								});
								return null;
							}}
							disabled={editLoading}
						>
							{editLoading ? <Loader size={25} /> : <Icon name="check" size={20} />}
						</StyledItemButton>
					) : (
						<StyledItemButton onPress={() => setEditableItem({ title, category })}>
							<Icon name="edit" size={20} />
						</StyledItemButton>
					)}

					<StyledItemButton onPress={() => deleteSingleListItem(id)}>
						<Icon name="trash" variant="unDone" size={20} />
					</StyledItemButton>
				</StyledListItemsOptions>
			</StyledListItemsWrapper>

			{editableItem !== null && categories && categories?.length > 0 && (
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				<ScrollView contentContainerStyle={styles?.scrollView} horizontal>
					{categories?.map(({ id: catId, value: catValue }) => (
						<StyledItemsCategory
							key={catId}
							onPress={() => setEditableItem({ ...editableItem, category: catValue })}
							active={(catValue === category && editableItem === null) || editableItem?.category === catValue}
						>
							<Text>{t<string>(`shopCategories.${catValue}`)}</Text>
						</StyledItemsCategory>
					))}
				</ScrollView>
			)}
		</StyledItemsContainer>
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
