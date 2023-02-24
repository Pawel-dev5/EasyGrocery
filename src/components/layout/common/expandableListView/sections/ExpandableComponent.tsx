import React, { useState, useEffect } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { t } from 'i18next';

// COMPONENTS
import { Icon } from 'components/layout/common';
import { Item } from 'components/lists/partials';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { ExpandableComponentInterface } from 'components/layout/common/expandableListView/models/sections';

// STYLES
import {
	StyledSortedCategoryTitle,
	StyledSortedCategoryTitleWrapper,
	StyledExpandButton,
} from 'components/layout/common/expandableListView/views/Styles';
import { iconHandler } from 'components/shops/helpers/iconHandler';

export const ExpandableComponent = ({ item, onClickFunction }: ExpandableComponentInterface) => {
	const [layoutHeight, setLayoutHeight] = useState<number | null>(0);

	useEffect(() => {
		if (item.isExpanded) {
			setLayoutHeight(null);
		} else {
			setLayoutHeight(0);
		}
	}, [item?.isExpanded]);

	return (
		<View style={{ width: '100%' }}>
			<StyledExpandButton
				activeOpacity={0.8}
				onPress={onClickFunction}
				isExpanded={item?.isExpanded && item?.items?.length > 0}
				disabled={item?.items?.length === 0}
			>
				<StyledSortedCategoryTitleWrapper>
					{iconHandler(item?.category, item?.isExpanded, 'mini')?.icon}
					<StyledSortedCategoryTitle>{t<string>(`shopCategories.${item?.category}`)}</StyledSortedCategoryTitle>
				</StyledSortedCategoryTitleWrapper>

				{item?.items?.length > 0 && <Icon name={item?.isExpanded ? 'angle-up' : 'angle-down'} size={16} variant="black" />}
			</StyledExpandButton>

			<View
				style={
					{
						height: layoutHeight,
						overflow: 'hidden',
					} as StyleProp<ViewStyle>
				}
			>
				{item?.items?.map((newItem: ItemInterface) => (
					<Item key={newItem?.id} {...newItem} />
				))}
			</View>
		</View>
	);
};
