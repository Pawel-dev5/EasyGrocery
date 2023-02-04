import styled from 'styled-components/native';

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

export const StyledShopImageFull = styled(StyledShopImage)`
	width: 80px;
	height: 80px;
	margin-bottom: 0;
`;

export const StyledSingleShopHeaderWrapper = styled.View`
	min-width: 100%;
	max-width: 100%;
	flex-flow: row nowrap;
	align-items: flex-start;
	justify-content: space-between;
	margin-bottom: 16px;
`;
export const StyledHeader = styled.View`
	flex-flow: row nowrap;
	align-items: center;
`;

export const SingleShopWrapper = styled.ScrollView`
	width: 100%;
`;

export const StyledSingleShopHeader = styled.Text`
	font-size: 28px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-left: 16px;
`;

export const StyledShopCategories = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
	text-align: center;
	margin-bottom: 10px;
	border-radius: ${({ theme }) => theme.radius[2]};
	/* width: 45%; */
	height: 150px;
`;

export const StyledShopCategoriesWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	margin-top: 24px;
	width: 100%;
	max-width: 100%;
	height: 100%;
`;
