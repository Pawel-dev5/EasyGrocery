import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

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

export const StyledIcon = styled(FontAwesome)<{ variant?: VariantType }>`
	color: ${({ theme, variant }) => (variant === 'transparent' ? theme.white : theme.base1)};
`;

export const StyledInput = styled.TextInput``;
