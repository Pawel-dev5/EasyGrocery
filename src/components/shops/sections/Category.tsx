import React from 'react';
import { t } from 'i18next';

// STYLES
import { StyledCategoryText, StyledShopCategories } from 'components/shops/sections/Styles';
import { shadowInline } from 'utils/theme/themeDefault';

// HELPERS
import { iconHandler } from 'components/shops/helpers/iconHandler';

export const Category = ({ value }: { value: string }) => (
	<StyledShopCategories color={iconHandler(value)?.color} style={shadowInline}>
		{iconHandler(value)?.icon}
		<StyledCategoryText>{t<string>(`shopCategories.${value}`)}</StyledCategoryText>
	</StyledShopCategories>
);
