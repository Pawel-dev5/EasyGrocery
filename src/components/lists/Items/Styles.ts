import styled, { css } from 'styled-components/native';

export const StyledListCard = styled.View<{ type: string }>`
	max-width: 100%;
	min-height: 80px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey200};
	margin: 10px 5px;
	padding: 12px;
	overflow: hidden;
	background: ${({ theme }) => theme.white};
	${({ theme }) => theme.shadow({ color: theme.grey1000 })};

	${({ type }) =>
		type === 'grid' &&
		css`
			max-width: 179px;
		`}
`;

export const StyledListCardItem = styled.View`
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
`;

export const StyledListCardTitleWrapper = styled.View`
	flex-flow: row nowrap;
	justify-content: space-between;
`;

export const StyledListCardTitle = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-bottom: 10px;
`;

export const StyledListCardItemElement = styled.View`
	font-size: 15px;
	align-items: flex-start;
	justify-content: center;
	margin-bottom: 5px;
`;

// ========= START FULL LIST ===========

export const StyledFullListWrapper = styled.View`
	width: 100%;
	flex-direction: column;
	padding: ${({ theme }) => theme.globalPadding};
`;

export const StyledItemsWrapper = styled.View`
	width: 100%;
	height: 76%;
	border-top-left-radius: 32px;
	border-top-right-radius: 32px;
	padding: 24px;
	margin-top: 16px;
	background: ${({ theme }) => theme.white};
`;

export const StyledInputTitleWrapper = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
export const StyledListBackground = styled.View`
	width: 100%;
	flex: 1;
	background: ${({ theme }) => theme.grey200};
`;

export const StyledActionButton = styled.TouchableOpacity`
	width: 42px;
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`;

export const StyledAddItemButton = styled(StyledActionButton)`
	height: 42px;
	border: 1px solid ${({ theme }) => theme.grey200};
`;

export const StyledListTitle = styled.Text`
	font-size: 42px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const StyledAddNewItem = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const StyledListOptionWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 100%;
`;

export const StyledUsersWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 45px;
`;

export const StyledUsersCounter = styled.Text`
	font-size: 16px;
`;

// ========= END FULL LIST ===========
