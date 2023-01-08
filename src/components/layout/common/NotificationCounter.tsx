import React from 'react';
import { StyledNotificationCounter, StyledCounter } from 'components/layout/common/Styles';

export const NotificationCounter = ({ counter, variant }: { counter?: number; variant?: 'small' }) => (
	<>
		{counter && counter > 0 ? (
			<StyledNotificationCounter variant={variant}>
				<StyledCounter variant={variant}>{counter}</StyledCounter>
			</StyledNotificationCounter>
		) : null}
	</>
);
