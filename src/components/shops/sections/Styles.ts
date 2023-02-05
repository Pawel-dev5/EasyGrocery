import styled, { css } from 'styled-components/native';

export const StyledProductWrapper = styled.View`
	width: 45%;
	border-radius: ${({ theme }) => theme.radius[3]};
`;

export const StyledProdTitle = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin: 16px 0 4px;
`;

export const StyledProdDescription = styled.Text`
	font-size: 10px;
	padding-top: 4px;
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

export const StyledAddButton = styled.TouchableOpacity`
	position: absolute;
	top: 5px;
	right: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 40px;
	background-color: ${({ theme }) => theme.white};
`;
