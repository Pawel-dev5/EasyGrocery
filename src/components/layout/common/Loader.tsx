import React from 'react';
import { ActivityIndicator } from 'react-native';

// STYLES
import { StyledLoaderContainer } from 'components/layout/common/Styles';

export const Loader = () => (
	<StyledLoaderContainer>
		<ActivityIndicator size={100} />
	</StyledLoaderContainer>
);
