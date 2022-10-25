import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const StyledIcon = styled(FontAwesome)`
	font-size: 24px;
	color: ${({ theme }) => theme.grey400};
`;

export const StyledMenuTrigger = styled.View`
	width: 45px;
	height: 45px;
	justify-content: center;
	align-items: center;
`;
