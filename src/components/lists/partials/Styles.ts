import styled, { css } from 'styled-components/native';

export const StyledRadioButtonWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 16px 0;
`;

export const StyledRadioButton = styled.TouchableOpacity<{ color: string }>`
	width: 50px;
	height: 50px;
	border-radius: ${({ theme }) => theme.radius[2]};

	${({ color }) =>
		color &&
		css`
			background: ${color};
		`}
`;

export const StyledShopImage = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey300};
	margin-right: 14px;
	background: ${({ theme }) => theme.white};
`;

export const StyledListShopCategories = styled.Text`
	width: 100%;
	align-items: center;
	padding: 8px 0;
	margin-bottom: 8px;
	text-align: center;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey300};
`;
