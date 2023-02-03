import styled, { css } from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { AlertTypes } from 'redux/slices/global/models';

export const StyledIcon = styled(FontAwesome)`
	font-size: 24px;
	color: ${({ theme }) => theme.grey400};
`;

export const StyledMenuTrigger = styled.View`
	position: relative;
	width: 45px;
	height: 45px;
	justify-content: center;
	align-items: center;
`;

export const StyledAlertWrapper = styled.View<{ bottomSheet: boolean; type: AlertTypes }>`
	position: absolute;
	z-index: 1000;
	elevation: 1000;
	margin-left: ${({ theme }) => theme.globalPadding};
	margin-right: ${({ theme }) => theme.globalPadding};
	left: 0;
	width: 92.5%;
	min-height: 50px;
	max-height: 100px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-radius: ${({ theme }) => theme.radius[2]};
	${({ theme }) => theme.shadow({ color: theme.grey1000 })};

	${({ type }) => {
		switch (type) {
			case AlertTypes.ERROR:
				return css`
					background-color: ${({ theme }) => theme.danger};
				`;
			case AlertTypes.ALERT:
				return css`
					background-color: ${({ theme }) => theme.warning};
				`;

			default:
				return null;
		}
	}}
	${({ bottomSheet }) =>
		bottomSheet
			? css`
					bottom: 20%;
			  `
			: css`
					bottom: 5%;
			  `};
`;

export const StyledAlertMessage = styled.Text`
	color: ${({ theme }) => theme.white};
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	max-width: 95%;
	min-width: 95%;
	padding: ${({ theme }) => theme.globalPadding};
`;

export const StyledCircleWrapper = styled.View`
	width: 30px;
	height: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	position: absolute;
	right: 0px;
	top: 0;
`;
