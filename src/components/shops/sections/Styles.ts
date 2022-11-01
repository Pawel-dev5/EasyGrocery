import styled, { css } from 'styled-components/native';

export const StyledShopImage = styled.Image`
	width: 150px;
	height: 150px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey300};
	margin-bottom: 20px;
`;

export const StyledShopImageFull = styled(StyledShopImage)`
	width: 80px;
	height: 80px;
	margin-bottom: 0;
`;

export const StyledShopsWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	min-width: 100%;
	justify-content: space-evenly;
	margin-top: 24px;
`;

export const StyledSingleShopHeaderWrapper = styled.View`
	min-width:100%
	max-width:100%
	flex-flow: row nowrap;
	align-items: flex-start;
	justify-content:space-between;
	margin-bottom: 16px;
`;
export const StyledHeader = styled.View`
	flex-flow: row nowrap;
	align-items: center;
`;

export const SingleShopWrapper = styled.View`
	width: 100%;
`;

export const StyledSingleShopHeader = styled.Text`
	font-size: 28px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-left: 16px;
`;

export const StyledCloseButton = styled.TouchableOpacity`
	height: 45px;
	width: 45px;
	align-items: center;
`;

export const StyledShopCategories = styled.Text`
	align-items: center;
	border: 1px solid black;
	text-align: center;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: ${({ theme }) => theme.radius[2]};
`;

export const StyledShopCategoriesWrapper = styled.View`
	padding: 16px 0;
`;

export const StyledCategoriesDescriptionWrapper = styled.View`
	width: 150px;
	margin: auto;
	align-items: center;
	flex-flow: row nowrap;
	justify-content: center;
	padding: 8px;
	margin-bottom: 16px;
	border-bottom-color: black;
	border-bottom-width: 1px;
`;

export const StyledCategoriesDescriptionWrapper2 = styled(StyledCategoriesDescriptionWrapper)`
	border-bottom-color: none;
	border-bottom-width: 0;
	border-top-color: black;
	border-top-width: 1px;
	margin-top: 10px;
`;

export const StyledCategoriesDescription = styled.Text`
	font-size: 16px;
	margin-right: 8px;
`;
