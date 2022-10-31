import styled from 'styled-components/native';

export const StyledShopImage = styled.Image`
	width: 150px;
	height: 150px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey300};
	margin-bottom: 20px;
`;

export const StyledShopsWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	min-width: 100%;
	justify-content: space-evenly;
`;
