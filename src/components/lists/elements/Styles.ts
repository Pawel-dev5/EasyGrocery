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
	padding: 21px 0;
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
`;

export const StyledAddNewItem = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const StyledSortedCategoryTitle = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-top: 14px;
`;
