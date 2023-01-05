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

export const StyledEditInoutWrapper = styled.View`
	max-width: 100%;
`;

export const StyledItemsContainer = styled.View`
	max-width: 100%;
	padding: 10px 0;
	border-bottom-color: ${({ theme }) => theme.grey200};
	border-bottom-width: 1px;
`;

export const StyledListItemsWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;
`;

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
