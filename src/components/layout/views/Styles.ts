import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

export const StyledChildren = styled.View<{ customPadding?: string }>`
	height: 81.5%;
	width: 100%;
	background-color: ${({ theme }) => theme.white};
	align-items: center;
	justify-content: flex-start;
	padding: 0 ${({ theme }) => theme.globalPadding};

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

export const StyledAppNavbar = styled.View`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: row;
	flex-wrap: nowrap;
	padding-top: 50px;
	height: ${({ theme }) => theme.navbarHeight};
	background-color: ${({ theme }) => theme.white};
	width: 100%;
	padding-right: 16px;
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
export const StyledBottomSheetBody = styled.View`
	padding: ${({ theme }) => theme.globalPadding};
	align-items: center;
	justify-content: center;
	position: relative;
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
	position: absolute;
	top: 0px;
	right: -10px;

	height: 40px;
	width: 40px;
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
	bottom: 70px;
	right: 10px;
`;

export const StyledTabMenuItem = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const styles = StyleSheet.create({
	componentWrapper: {
		width: '89%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		overflow: 'hidden',
	},
	componentContainer: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' },
	componentButton: { width: 35, height: 35, justifyContent: 'center', alignItems: 'flex-end' },
});
