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
	align-items: flex-end;
	margin-top: 24px;
	width: 100%;
	max-width: 100%;
	height: 100%;
`;
