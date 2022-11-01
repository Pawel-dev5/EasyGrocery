import styled, { css } from 'styled-components/native';

export const StyledRadioButtonWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 16px 0;
`;
export const StyledRadioButton = styled.TouchableOpacity<{ color: string }>`
	width: 50px;
	height: 50px;
	border-radius: ${({ theme }) => theme.radius[2]};

	${({ color }) =>
		color &&
		css`
			background: ${color};
		`}
`;
