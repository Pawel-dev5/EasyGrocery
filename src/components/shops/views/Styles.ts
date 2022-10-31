import styled from 'styled-components/native';

export const StyledShopHeader = styled.Text`
	font-size: 24px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-bottom: 16px;
	margin-top: 32px;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const StyledMyShopsWrapper = styled.View`
	align-items: center;
	justify-content: center;
	margin: 0 16px;
`;
