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
					color: green;
				`;
			case 'unDone':
				return css`
					color: red;
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
	margin-bottom: 16px;
`;
