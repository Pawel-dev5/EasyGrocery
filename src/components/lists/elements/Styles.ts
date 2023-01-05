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

export const StyledCategory = styled.Text`
	font-size: 10px;
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
`;

export const StyledEditButton = styled.TouchableOpacity<{ variant?: string }>`
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
	padding: 21px 0;
`;

export const StyledItemsCategoryWrapper = styled.View`
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	max-width: 70%;
	margin-top: 10px;
`;

export const StyledEditInoutWrapper = styled.View`
	max-width: 100%;
`;
export const StyledItemsContainer = styled.View`
	max-width: 100%;
	padding: 10px 0;
	border-bottom-color: ${({ theme }) => theme.grey200};
	border-bottom-width: 1px;
`;

export const StyledItemsCategory = styled.TouchableOpacity<{ active: boolean }>`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	margin-right: 16px;
	border: 1px solid ${({ theme }) => theme.grey200};
	border-radius: ${({ theme }) => theme.radius[2]};
	padding: 4px 8px;
	background: ${({ theme }) => theme.grey100};

	${({ active }) =>
		active &&
		css`
			background: ${({ theme }) => theme.grey400};
		`};
`;
