import styled from 'styled-components/native';

export const StyledListCard = styled.View`
	max-width: 100%;
	min-height: 80px;
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey200};
	margin: 10px 0;
	padding: 12px;
	overflow: hidden;
	background: ${({ theme }) => theme.white};
	${({ theme }) => theme.shadow({ color: theme.grey1000 })};
`;

export const StyledListCardItem = styled.View`
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
`;

export const StyledListCardTitleWrapper = styled.View`
	flex-flow: row nowrap;
	justify-content: space-between;
`;

export const StyledListCardTitle = styled.Text`
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	margin-bottom: 10px;
`;

export const StyledListCardItemElement = styled.View`
	font-size: 15px;
	align-items: flex-start;
	justify-content: center;
	margin-bottom: 5px;
`;
