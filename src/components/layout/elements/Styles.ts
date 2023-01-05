import styled from 'styled-components/native';

export const StyledPopperWrapper = styled.View`
	${({ theme }) => theme.shadow({ color: theme.grey1000 })};
	background-color: #fff;
	border-radius: ${({ theme }) => theme.radius[2]};
	width: 22rem;
	max-height: 17rem;
	max-width: 11rem;
	min-height: 12rem;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 0 0.5rem;
`;
