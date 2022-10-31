import styled, { css } from 'styled-components/native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

// MODELS
import { VariantType } from 'components/layout/models/common';
import { ColorsKeys } from 'utils/theme/themeDefault';

export const StyledMenuOption = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const StyledText = styled.Text<{ color?: ColorsKeys }>`
	color: ${({ theme, color }) => (color ? theme[color] : theme.base1)};
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	font-size: 16px;
`;

export const StyledMenuIcon = styled(FontAwesome)<{ color?: ColorsKeys }>`
	font-size: 16px;
	color: ${({ theme, color }) => (color ? theme[color] : theme.base1)};
`;

export const StyledIcon = styled(FontAwesome5)<{ variant?: VariantType }>`
	color: ${({ theme, variant }) => (variant === 'transparent' ? theme.white : theme.base1)};

	${({ variant }) => {
		switch (variant) {
			case 'done':
				return css`
					color: ${({ theme }) => theme.success};
				`;
			case 'unDone':
				return css`
					color: ${({ theme }) => theme.danger};
				`;
			case 'white':
				return css`
					color: ${({ theme }) => theme.white};
				`;

			default:
				return null;
		}
	}}
`;

export const StyledInput = styled.TextInput`
	width: 250px;
	height: 44px;
	border: 1px solid ${({ theme }) => theme.grey200};
	border-radius: ${({ theme }) => theme.radius[2]};
	padding: 12px;
`;

export const StyledProgressBarContainer = styled.View`
	height: 7px;
	width: 80%;
	position: relative;
`;

export const StyledProgressBarBaseBox = styled.View`
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	border-radius: 3px;
	transition: width 10s ease-in-out;
`;

export const StyledProgressBarBackground = styled(StyledProgressBarBaseBox)`
	background: ${({ theme }) => theme.grey300};
	width: 100%;
`;

export const StyledProgressBarProgress = styled(StyledProgressBarBaseBox)`
	background: ${({ theme }) => theme.grey600};
	width: ${({ percent }) => percent}%;
`;

export const StyledProgressBarWrapper = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const StyledProgressBarCounter = styled.View`
	min-width: 10%;
	justify-content: flex-end;
	align-items: flex-end;
`;

// =========  LOADER  ===========
export const StyledLoaderContainer = styled.View`
	flex: 1;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	padding: 10px;
`;
