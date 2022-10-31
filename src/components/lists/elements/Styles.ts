import styled from 'styled-components/native';

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
