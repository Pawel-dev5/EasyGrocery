import styled from 'styled-components/native';

export const StyledProdImageWrapper = styled.View`
	width: 100%;
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.radius[3]};
	background-color: ${({ theme }) => theme.grey200};
`;
