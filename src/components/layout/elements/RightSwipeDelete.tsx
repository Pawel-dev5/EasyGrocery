import React from 'react';

// COMPONENTS
import { Icon, Loader } from 'components/layout/common';

// STYLES
import { StyledRightSwipeDelete } from 'components/layout/elements/Styles';

// MODELS
import { SwipeRigheDeleteInerface } from 'components/layout/models/elements';

export const RightSwipeDelete = ({ onClick, loader, firstElement, lastElement, variant }: SwipeRigheDeleteInerface) => (
	<StyledRightSwipeDelete
		onPress={() => onClick()}
		disabled={loader}
		firstElement={firstElement}
		lastElement={lastElement}
		variant={variant}
	>
		{loader ? <Loader size={20} /> : <Icon name="trash" size={15} />}
	</StyledRightSwipeDelete>
);
