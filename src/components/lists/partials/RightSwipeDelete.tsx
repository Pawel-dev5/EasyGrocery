import React from 'react';

// COMPONENTS
import { Icon } from 'components/layout/common';

// STYLES
import { StyledRightSwipeDelete } from 'components/lists/partials/Styles';

// MODELS
import { SwipeRigheDeleteInerface } from 'components/lists/models/elements';

export const RightSwipeDelete = ({ onClick }: SwipeRigheDeleteInerface) => (
	<StyledRightSwipeDelete onPress={() => onClick()}>
		<Icon name="trash" size={15} />
	</StyledRightSwipeDelete>
);
