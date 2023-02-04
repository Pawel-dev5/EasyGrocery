import styled, { css } from 'styled-components/native';

export const StyledListCard = styled.View<{ color: string | null; lastElement: boolean; firstElement: boolean }>`
	max-width: 100%;
	min-height: 80px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey200};
	margin: 10px 14px;
	padding: 12px;
	overflow: hidden;
	background: ${({ theme }) => theme.white};

	${({ color }) =>
		color &&
		css`
			background: ${color};
		`}

	${({ lastElement }) =>
		lastElement &&
		css`
			margin-bottom: 21px;
		`}

	${({ firstElement }) =>
		firstElement &&
		css`
			margin-top: 21px;
		`}
`;

export const StyledListCardItem = styled.View`
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start;
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
	max-width: 70%;
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
	max-width: 100%;
	flex-direction: column;
	padding: ${({ theme }) => theme.globalPadding};
`;

export const StyledItemsWrapper = styled.View`
	width: 100%;
	height: 100%;
	border-top-left-radius: 32px;
	border-top-right-radius: 32px;
	padding: 0px 18px;
	background: ${({ theme }) => theme.white};
`;

export const StyledInputTitleWrapper = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const StyledListBackground = styled.View<{ color: string | null }>`
	width: 100%;
	flex: 1;
	background: ${({ theme }) => theme.grey200};
	position: relative;
	${({ color }) =>
		color &&
		css`
			background: ${color};
		`}
`;

export const StyledActionButton = styled.TouchableOpacity`
	width: 42px;
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`;

export const StyledListOptionWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	margin-right: -15px;
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

export const StyledListDescription = styled.Text`
	font-size: 16px;
`;

// ========= END FULL LIST ===========
export const StyledUserCounter = styled.Text`
	font-size: 16px;
	margin-left: 5px;
	margin-top: -2px;
`;
