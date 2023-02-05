import styled, { css } from 'styled-components/native';

export const StyledShopCategories = styled.View<{ color?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-radius: ${({ theme }) => theme.radius[2]};
	height: 150px;
	padding: 10px;

	${({ color }) =>
		color &&
		css`
			background-color: ${color};
		`}
`;

export const StyledCategoryText = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-top: 20px;
	text-align: center;
	white-space: wrap;
`;

export const StyledProductWrapper = styled.View`
	width: 45%;
	/* border: 1px solid black; */
	border-radius: ${({ theme }) => theme.radius[3]};
`;

export const StyledProdTitle = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin: 16px 0 4px;
`;

export const StyledProdDescription = styled.Text`
	font-size: 12px;
	color: ${({ theme }) => theme.grey800};
`;

export const StyledProdPrice = styled(StyledProdTitle)<{ promotion: boolean }>`
	${({ promotion }) =>
		promotion &&
		css`
			font-size: 12px;
			color: ${({ theme }) => theme.grey800};
			text-decoration: line-through;
		`}
`;

export const StyledProdPromotionPrice = styled(StyledProdTitle)`
	color: ${({ theme }) => theme.danger};
`;

export const StyledPricesWrapper = styled.View`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
`;
