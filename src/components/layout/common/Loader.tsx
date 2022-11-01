import React from 'react';
import { ActivityIndicator } from 'react-native';

// STYLES
import { StyledLoaderContainer } from 'components/layout/common/Styles';

export const Loader = ({ size }: { size: number }) => (
	<StyledLoaderContainer>
		<ActivityIndicator size={size} />
	</StyledLoaderContainer>
);
