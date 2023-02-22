import { VariantType } from 'components/layout/models/common';
import styled, { css } from 'styled-components/native';

// BottomSheetRenderItem
export const StyledListContainer = styled.View`
	padding: 10px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	max-width: 100%;
`;

export const StyledButtonContainer = styled.Pressable<{ variant: VariantType }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 35px;
	height: 35px;
	border-radius: 35px;

	${({ variant }) => {
		switch (variant) {
			case 'done':
				return css`
					border: 1px solid ${({ theme }) => theme.success};
				`;
			case 'black':
				return css`
					border: 1px solid ${({ theme }) => theme.black};
				`;

			default:
				return null;
		}
	}}
`;

export const StyledListButtonText = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const StyledListButtonDescription = styled.Text`
	font-size: 10px;
	max-width: 100%;
	color: ${({ theme }) => theme.grey500};
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const StyledListCover = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey300};
	margin-right: 10px;
	background: ${({ theme }) => theme.white};
`;

export const StyledListWrapper = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	max-width: 80%;
`;

export const StyledTitleWrapper = styled.View`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 90%;
`;
