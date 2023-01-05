import styled from 'styled-components/native';

export const StyledLoginContainer = styled.SafeAreaView`
	flex: 1;
	align-items: center;
	min-height: 100%;
	justify-content: center;
	width: 100%;
	z-index: 1000;
	elevation: 1000;
`;

export const StyledInputWrapper = styled.View`
	margin-bottom: 16px;
	width: 300px;
`;

export const StyledLoginButtonsWrapper = styled.View`
	width: 300px;
	margin: 10px 0 16px 0;
	flex-direction: row;
	justify-content: center;
`;

export const StyledRegister = styled.Text`
	margin-left: 8px;
	font-size: 16px;
	color: ${({ theme }) => theme.base2};
`;
