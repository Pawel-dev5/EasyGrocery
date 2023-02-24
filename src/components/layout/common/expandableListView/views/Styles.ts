import styled, { css } from 'styled-components/native';

export const StyledSortedCategoryTitleWrapper = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	height: 100%;
	width: 90%;
`;

export const StyledSortedCategoryTitle = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-left: 8px;
`;

export const StyledExpandButton = styled.TouchableOpacity<{ isExpanded: boolean }>`
	width: 100%;
	height: 50px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;

	${({ isExpanded }) =>
		!isExpanded &&
		css`
			border-bottom-color: ${({ theme }) => theme.grey300};
			border-bottom-width: 1px;
		`}
`;
