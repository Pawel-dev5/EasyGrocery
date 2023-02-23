import styled, { css } from 'styled-components/native';

export const StyledEditButton = styled.TouchableOpacity<{ variant?: string }>`
	width: 48%;
	margin: 10px 0;
	align-items: center;
	padding: 16px;
	min-height: 50px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey200};
	background: ${({ theme }) => theme.grey200};

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
	padding: 0;
	padding-bottom: 16px;
`;

export const StyledItemsCategoryWrapper = styled.View`
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	max-width: 70%;
	margin-top: 10px;
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
	height: 33px;

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
	width: 33px;
	height: 33px;
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

export const StyledEditListWrapper = styled.ScrollView<{ bottomSheetHeight: number }>`
	${({ bottomSheetHeight }) => {
		switch (bottomSheetHeight) {
			case 1:
				return css`
					height: 74.8%;
				`;
			default:
				return css`
					height: 100%;
				`;
		}
	}}
`;
