import React from 'react';

// COMPONENTS
import { Icon, Loader } from 'components/layout/common';

// STYLES
import { StyledRightSwipeDelete } from 'components/lists/partials/Styles';

// MODELS
import { SwipeRigheDeleteInerface } from 'components/lists/models/elements';

export const RightSwipeDelete = ({ onClick, loader }: SwipeRigheDeleteInerface) => (
	<>
		{loader ? (
			<StyledRightSwipeDelete>
				<Loader size={10} />
			</StyledRightSwipeDelete>
		) : (
			<StyledRightSwipeDelete onPress={() => onClick()}>
				<Icon name="trash" size={15} />
			</StyledRightSwipeDelete>
		)}
	</>
);
