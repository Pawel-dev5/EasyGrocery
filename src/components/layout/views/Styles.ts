import styled, { css } from 'styled-components/native';

// MODELS
import { VariantType } from 'components/layout/models/common';

export const StyledChildren = styled.View<{ customPadding?: string }>`
	height: 89%;
	width: 100%;
	background-color: ${({ theme }) => theme.white};
	align-items: center;
	justify-content: flex-start;
	padding: ${({ theme }) => theme.globalPadding};
	padding-top: 0;

	${({ customPadding }) =>
		customPadding &&
		css`
			padding: ${customPadding};
		`}
`;

export const StyledAppLayout = styled.View`
	position: relative;
	width: 100%;
	height: 100%;
	max-height: 100%;
`;

export const StyledAppNavbar = styled.View<{ variant: VariantType }>`
	align-items: center;
	flex-direction: row;
	padding: 0 ${({ theme }) => theme.globalPadding};
	padding-top: 30px;
	height: ${({ theme }) => theme.navbarHeight};
	background-color: ${({ theme }) => theme.white};
	width: 100%;

	${({ variant }) =>
		variant === 'transparent' &&
		css`
			position: absolute;
			z-index: 2;
			background-color: ${({ theme }) => theme.transparent};
		`}

	${({ variant }) =>
		variant === 'grey' &&
		css`
			background-color: ${({ theme }) => theme.appBgColor};
		`}
`;
export const StyledText = styled.Text<{ variant?: VariantType }>`
	text-align: center;
	flex: 1;
	font-size: 18px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
	color: ${({ theme, variant }) => (variant === 'transparent' ? theme.white : theme.base1)};
`;

export const StyledMain = styled.View`
	flex: 1;
`;

export const StyledButton = styled.TouchableOpacity`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

// BOTTOM SHEET

export const StyledBottomSheet = styled.SafeAreaView`
	align-items: center;
	min-height: 25%;
	background: ${({ theme }) => theme.white};
	border-top-left-radius: 21px;
	border-top-right-radius: 21px;
	width: 100%;
	z-index: 1000;
	elevation: 1000;
	position: absolute;
	bottom: 0;
`;

export const StyledBottomSheetBody = styled.View`
	padding: ${({ theme }) => theme.globalPadding};
	align-items: center;
	justify-content: center;
`;

export const StyledBottomAddListButton = styled.TouchableOpacity`
	height: 50px;
	width: 50px;
	border-radius: 50px;
	background: black;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
`;

export const StyledBottomSheetClose = styled.TouchableOpacity`
	margin-top: 10px;
	height: 7px;
	width: 60px;
	background: ${({ theme }) => theme.grey200};
	border-radius: 5px;
`;

export const StyledBottomSheetHeader = styled.Text`
	font-size: 16px;
	padding-bottom: 20px;
	font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const StyledFloatingAddListButtonWrapper = styled.View`
	position: absolute;
	z-index: 999;
	elevation: 999;
	bottom: 10px;
	right: 10px;
`;

export const StyledOverlayBottomSheet = styled.TouchableOpacity`
	position: absolute;
	z-index: 800;
	elevation: 800;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: flex-end;
	background: ${({ theme }) => theme.grey300};
	opacity: 0.7;
`;
