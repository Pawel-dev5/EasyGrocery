import styled from 'styled-components/native';

export const StyledOverlay = styled.View`
	height: 100%;
	width: 100%;
	position: absolute;
	background-color: ${({ theme }) => theme.white};
	opacity: 0.7;
	z-index: 900;
	elevation: 900;
`;

export const StyledImageBackground = styled.ImageBackground`
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 800;
	elevation: 800;
`;
