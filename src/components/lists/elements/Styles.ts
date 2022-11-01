import styled, { css } from 'styled-components/native';

export const StyledRightSwipeDelete = styled.TouchableOpacity`
	margin: 10px 0;
	padding: 12px;
	align-items: center;
	justify-content: center;
	border-top-right-radius: ${({ theme }) => theme.radius[2]};
	border-top-left-radius: 0;
	border-bottom-right-radius: ${({ theme }) => theme.radius[2]};
	border-bottom-left-radius: 0;
	border: 1px solid ${({ theme }) => theme.grey200};
	background: ${({ theme }) => theme.danger};
`;

export const StyledItemTitle = styled.Text`
	font-size: 16px;
	margin-left: 10px;
`;

export const StyledItemTitleWrapper = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const StyledListItemsOptions = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 50px;
`;

export const StyledListItemsWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;
	padding: 10px 0;
	border-bottom-color: ${({ theme }) => theme.grey200};
	border-bottom-width: 1px;
`;

export const StyledEditButton = styled.TouchableOpacity<{ variant: string }>`
	width: 48%;
	margin: 10px 0;
	align-items: center;
	padding: 16px;
	min-height: 50px;
	color: red;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey400};
	background: ${({ theme }) => theme.grey400};

	${({ variant }) =>
		variant === 'delete' &&
		css`
			background: ${({ theme }) => theme.white};
		`};
`;

export const StyledEditButtonsWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	padding-top: 21px;
`;

export const StyledShopImage = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey300};
	margin-right: 14px;
	background: ${({ theme }) => theme.white};
`;
