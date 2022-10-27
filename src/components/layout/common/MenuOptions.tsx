import React from 'react';
import { MenuOption as MenuOptionComponent } from 'react-native-popup-menu';

// MODELS
import { MenuOptionInterface } from 'components/layout/models/common';

// STYLES
import { StyledMenuOption, StyledText, StyledMenuIcon } from 'components/layout/common/Styles';

export const MenuOption = ({ onSelect, text, icon, color }: MenuOptionInterface) => (
	<MenuOptionComponent onSelect={onSelect}>
		<StyledMenuOption>
			<StyledText color={color}>{text}</StyledText>
			{icon && <StyledMenuIcon name={icon} color={color} />}
		</StyledMenuOption>
	</MenuOptionComponent>
);
