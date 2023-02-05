import styled, { css } from 'styled-components/native';

export const StyledProdImageWrapper = styled.View`
	width: 100%;
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.radius[3]};
	background-color: ${({ theme }) => theme.grey200};
`;

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
