import React from 'react';

// MODELS
import { View } from 'react-native';

// STYLES
import { StyledAppLayout, StyledAppNavbar, StyledButton, StyledChildren, StyledText } from 'components/layout/views/Styles';
import { Menu } from 'components/layout/sections/Menu';
import { Icon } from 'components/layout/items/Icon';
import { AppLayoutInterface } from 'components/layout/models/views';

export const AppWrapper = ({ children, routeName, variant = 'grey', navigation, lang, setLang }: AppLayoutInterface) => (
	<StyledAppLayout>
		<StyledAppNavbar variant={variant}>
			<View style={{ width: 45, aspectRatio: 1 }}>
				{navigation && (
					<StyledButton onPress={() => navigation.goBack()}>
						<Icon variant={variant} name="angle-left" size={30} />
					</StyledButton>
				)}
			</View>

			<StyledText variant={variant}>{routeName}</StyledText>

			<Menu variant={variant} navigation={navigation} lang={lang} setLang={setLang} />
		</StyledAppNavbar>

		{children && <StyledChildren>{children}</StyledChildren>}
	</StyledAppLayout>
);
