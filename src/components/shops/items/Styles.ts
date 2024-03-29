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

export const StyledShopCategories = styled.View<{ color?: string; active: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-radius: ${({ theme }) => theme.radius[2]};
	height: 150px;
	padding: 12px;
	width: 100%;

	${({ color }) =>
		color &&
		css`
			background-color: ${color};
		`}
	${({ active }) =>
		active &&
		css`
			width: 100%;
			justify-content: space-around;
		`}
`;

export const StyledHeader = styled.View<{ active: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;

	${({ active }) =>
		active &&
		css`
			align-items: center;
			justify-content: flex-start;
			flex-direction: row;
			margin-bottom: 8px;
		`}
`;

export const StyledCategoryText = styled.Text<{ active: boolean }>`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-top: 8px;
	text-align: center;
	white-space: wrap;

	${({ active }) =>
		active &&
		css`
			font-size: 18px;
			margin-top: 0;
			margin-left: 8px;
		`}
`;
