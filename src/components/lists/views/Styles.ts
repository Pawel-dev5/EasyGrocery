import styled from 'styled-components/native';

export const StyledListsScrollView = styled.View`
	width: 100%;
	overflow: scroll;
`;

export const StyledBottomSheet = styled.SafeAreaView`
	align-items: center;
	min-height: 25%;
	background: ${({ theme }) => theme.white};
	border-top-left-radius: 21px;
	border-top-right-radius: 21px;
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

export const StyledFloatingAddListButton = styled(StyledBottomAddListButton)`
	position: absolute;
	z-index: 999;
	bottom: 10px;
	right: 0;
`;

export const StyledGridList = styled.View`
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const StyledListStyleDisplay = styled.TouchableOpacity`
	height: 50px;
	width: 50px;
	border-radius: 5px;
	background: black;
	align-items: center;
	justify-content: center;
`;
