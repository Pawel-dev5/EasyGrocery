import React from 'react';
import { MenuOption as MenuOptionComponent } from 'react-native-popup-menu';

// COMPONENTS
import { NotificationCounter } from 'components/layout/common/NotificationCounter';

// MODELS
import { MenuOptionInterface } from 'components/layout/models/common';

// STYLES
import { StyledMenuOption, StyledText, StyledMenuIcon } from 'components/layout/common/Styles';

export const MenuOption = ({ onSelect, text, icon, color, counter }: MenuOptionInterface) => (
	<MenuOptionComponent onSelect={onSelect}>
		<StyledMenuOption>
			<StyledText color={color}>{text}</StyledText>
			{icon && <StyledMenuIcon name={icon} color={color} />}
			{counter ? <NotificationCounter counter={counter} variant="small" /> : null}
		</StyledMenuOption>
	</MenuOptionComponent>
);
