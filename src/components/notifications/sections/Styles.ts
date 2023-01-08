import styled, { css } from 'styled-components/native';

export const StyledNotificationWrapper = styled.View<{ variant: 'UNREAD' | 'SENDREQUEST' | 'ACCEPT' | 'REJECT' | null }>`
	position: relative;
	border-radius: ${({ theme }) => theme.radius[2]};
	margin: 10px 5px;

	${({ variant }) => {
		switch (variant) {
			case 'UNREAD':
				return css`
					padding-left: 5px;
					background-color: ${({ theme }) => theme.warning};
				`;
			case 'SENDREQUEST':
				return css`
					padding-left: 5px;
					background-color: ${({ theme }) => theme.danger};
				`;
			case 'ACCEPT':
				return css`
					padding-left: 5px;
					background-color: ${({ theme }) => theme.base2};
				`;
			case 'REJECT':
				return css`
					padding-left: 5px;
					background-color: ${({ theme }) => theme.accent3};
				`;
			default:
				return null;
		}
	}}
`;

export const StyledNotification = styled.View<{ read: string | null }>`
	width: 100%;
	padding: 10px;
	display: flex;
	background-color: ${({ theme }) => theme.grey100};

	${({ read }) =>
		read !== null
			? css`
					border-top-right-radius: ${({ theme }) => theme.radius[2]};
					border-bottom-right-radius: ${({ theme }) => theme.radius[2]};
			  `
			: css`
					border-radius: ${({ theme }) => theme.radius[2]};
			  `}
`;

export const StyledNotificationBody = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const StyledInviteImg = styled.Image`
	width: 100px;
	height: 100px;
	margin-left: -13px;
`;

export const StyledNotificationInfoWrapper = styled.View<{ title?: boolean }>`
	padding: 6px 0;
	display: flex;
	flex-direction: row;
	align-items: center;

	${({ title }) =>
		title &&
		css`
			margin-top: 0;
			padding-top: 0;
		`}
`;

export const StyledNotificationInfoTitle = styled.Text<{ title?: boolean }>`
	margin-left: 10px;
	font-size: 16px;

	${({ title }) =>
		title &&
		css`
			margin-left: 0px;
			font-size: 18px;
			font-weight: ${({ theme }) => theme.fontWeight.semiBold};
		`}
`;

export const StyledReadWrapper = styled.TouchableOpacity`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	top: -10px;
	right: -10px;
`;

export const StyledButtonWrapper = styled.View`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 5px 0;
`;

export const StyledButton = styled.TouchableOpacity<{ variant?: string }>`
	width: 48%;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.grey200};
	border-radius: ${({ theme }) => theme.radius[2]};
	border: 1px solid ${({ theme }) => theme.grey200};

	${({ variant }) =>
		variant === 'delete' &&
		css`
			background: ${({ theme }) => theme.white};
		`};
`;

export const StyledButtonText = styled.Text`
	font-size: 16px;
	text-align: center;
`;
