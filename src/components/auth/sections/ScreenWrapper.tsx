import React, { ReactNode } from 'react';

// STYLES
import { StyledOverlay, StyledImageBackground } from 'components/auth/sections/Styles';

export const ScreenWrapper = ({ children }: { children: ReactNode | ReactNode[] }) => (
	// eslint-disable-next-line global-require
	<StyledImageBackground source={require('../../../assets/grocery.jpg')} resizeMode="cover">
		<StyledOverlay />
		{children && children}
	</StyledImageBackground>
);
