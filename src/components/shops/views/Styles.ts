import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

export const StyledShopImage = styled.Image`
	width: 100%;
	height: 150px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey300};
	margin-bottom: 20px;
`;

export const StyledShopsWrapper = styled.View`
	flex-direction: column;
	flex-wrap: nowrap;
	min-width: 100%;
	justify-content: center;
	margin-top: 24px;
`;

// SHOP
export const StyledShopImageFull = styled.Image`
	width: 100%;
	height: 140px;
	margin-bottom: 0;
	object-fit: cover;
`;

export const StyledHeader = styled.View`
	flex-flow: row nowrap;
	align-items: center;
`;

export const StyledShopCategoriesWrapper = styled.View`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: flex-start;
	margin-top: 24px;
	width: 100%;
	max-width: 100%;
	height: 100%;
`;

export const StyledListHeaderWrapper = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	width: 100%;
	height: 50px;
	background-color: ${({ theme }) => theme.grey100};
`;

export const StyledListHeader = styled.Text`
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const StyledCategoryWrapper = styled.View<{ active: boolean }>`
	width: auto;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px 10px;
	border-radius: ${({ theme }) => theme.radius[3]};
	border: 1px solid ${({ theme }) => theme.grey900};

	${({ active }) =>
		active &&
		css`
			border: 1px solid ${({ theme }) => theme.base2};
		`}
`;

export const StyledCategoryText = styled.Text<{ active: boolean }>`
	color: ${({ theme }) => theme.grey900};

	${({ active }) =>
		active &&
		css`
			color: ${({ theme }) => theme.base2};
		`}
`;

export const StyledListSeparator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${({ theme }) => theme.grey400};
`;

export const ProductListInlineStyle = StyleSheet.create({
	contentContainer: {
		display: 'flex',
		minWidth: '100%',
		justifyContent: 'space-evenly',
		paddingTop: 16,
	},
	categoriesContainer: {
		paddingBottom: 20,
		paddingLeft: 16,
		justifyContent: 'space-evenly',
	},
	bottomSheetBody: {
		display: 'flex',
		minWidth: '100%',
		justifyContent: 'space-evenly',
		paddingTop: 16,
		paddingLeft: 8,
		paddingRight: 8,
	},
});
