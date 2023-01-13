import styled, { css } from 'styled-components/native';

// MODELS
import { StyledRightSwipeInterface } from 'components/layout/models/styles';
import { SwipeVariants } from 'components/layout/models/elements';

export const StyledSearchWrapper = styled.View`
	position: relative;
`;

export const StyledPopperWrapper = styled.ScrollView`
	background-color: ${({ theme }) => theme.white};
	${({ theme }) => theme.shadow({ color: theme.grey1000 })};
	position: absolute;
	top: 40px;
	background-color: ${({ theme }) => theme.grey200};
	width: 100%;
	height: auto;
	max-height: 210px;
	padding-top: 5px;
	border-bottom-left-radius: ${({ theme }) => theme.radius[2]};
	border-bottom-right-radius: ${({ theme }) => theme.radius[2]};
`;

export const StyledUserWrapper = styled.Text<{ notLast: boolean; colorType?: string }>`
	padding: 14px 16px;
	font-size: 16px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	${({ notLast }) =>
		notLast
			? css`
					border-bottom-color: ${({ theme }) => theme.grey300};
					border-bottom-width: 1px;
			  `
			: css`
					border-bottom-left-radius: ${({ theme }) => theme.radius[2]};
					border-bottom-right-radius: ${({ theme }) => theme.radius[2]};
			  `}

	${({ colorType }) => {
		switch (colorType) {
			case 'FULL':
				return css`
					background-color: ${({ theme }) => theme.base2};
				`;
			case 'PENDING':
				return css`
					background-color: ${({ theme }) => theme.warning};
				`;
			default:
				return null;
		}
	}}
`;

// SWIPES
export const StyledRightSwipeDelete = styled.TouchableOpacity<StyledRightSwipeInterface>`
	margin: 9px 0;
	padding: 12px;
	max-width: 40px;
	height: 82%;
	align-items: center;
	justify-content: center;
	border-top-right-radius: ${({ theme }) => theme.radius[2]};
	border-top-left-radius: 0;
	border-bottom-right-radius: ${({ theme }) => theme.radius[2]};
	border-bottom-left-radius: 0;
	border: 1px solid ${({ theme }) => theme.grey200};
	background: ${({ theme }) => theme.danger};

	${({ variant }) => {
		switch (variant) {
			case SwipeVariants.NOTIFICATION:
				return css`
					height: 90%;
				`;

			default:
				return null;
		}
	}}

	${({ lastElement }) =>
		lastElement &&
		css`
			margin-bottom: 22px;
		`}

	${({ firstElement }) =>
		firstElement &&
		css`
			height: 72%;
			margin-top: 22px;
		`}
`;
