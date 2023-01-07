import styled, { css } from 'styled-components/native';

// STYLES
import { StyledActionButton } from 'components/lists/items/Styles';

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
	padding: 8px 0;
`;

export const StyledItemsCategoryWrapper = styled.View`
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	max-width: 70%;
	margin-top: 10px;
`;

export const StyledAddItemButton = styled(StyledActionButton)`
	height: 42px;
	border: 1px solid ${({ theme }) => theme.grey200};
	margin-left: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledAddNewItem = styled.View`
	width: 88%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
`;

export const StyledSortedCategoryTitle = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-top: 14px;
`;

export const StyledUsersWrapper = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
`;

export const StyledUserTitle = styled.Text<{ colorType?: string }>`
	margin-right: 8px;
	padding: 4px 8px;
	border-radius: ${({ theme }) => theme.radius[1]};

	${({ colorType }) => {
		switch (colorType) {
			case 'FULL':
				return css`
					border: 2px solid ${({ theme }) => theme.base2};
				`;
			case 'PENDING':
				return css`
					border: 2px solid ${({ theme }) => theme.warning};
				`;
			default:
				return css`
					border: 2px solid ${({ theme }) => theme.grey400};
				`;
		}
	}}
`;

export const StyledEditFormWrapper = styled.SafeAreaView`
	margin: 8px 0;
`;

export const StyledEditFormWrapperTitle = styled.Text`
	margin-bottom: 8px;
	font-size: 16px;
`;

export const StyledAddUserButton = styled.TouchableOpacity<{ active: boolean }>`
	border-radius: 50%;
	width: 27px;
	height: 27px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.radius[1]};
	border: 1px solid ${({ theme }) => theme.grey400};
	${({ active }) =>
		active &&
		css`
			background-color: ${({ theme }) => theme.grey400};
		`}
`;

export const StyledAddUserWrapper = styled.View`
	margin-top: 8px;
`;
