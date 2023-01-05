import React, { ReactNode } from 'react';

// STYLES
import { StyledOverlay, StyledImageBackground } from 'components/auth/sections/Styles';

export const ScreenWrapper = ({ children, props }: { children: ReactNode | ReactNode[]; props: any }) => (
	<StyledImageBackground source={require('../../../assets/grocery.jpg')} resizeMode="cover">
		<StyledOverlay />
		{children && children}
	</StyledImageBackground>
);
