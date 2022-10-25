import React from 'react';
import { Menu as MenuComponent, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { t } from 'i18next';

// COMPONENTS
import { Icon } from 'components/layout/items/Icon';
import { MenuOption } from 'components/layout/items/MenuOptions';
import { LangSwitcher } from 'components/layout/items/LangSwitcher';

// STYLES
import { StyledMenuTrigger } from 'components/layout/sections/Styles';

// MODELS
import { MenuInterface } from 'components/layout/models/sections';

export const Menu = ({ variant, navigation }: MenuInterface) => {
	const signOut = () => console.log('wylogowuje');
	return (
		<MenuComponent>
			<MenuTrigger>
				<StyledMenuTrigger>
					<Icon variant={variant} name="ellipsis-v" size={20} />
				</StyledMenuTrigger>
			</MenuTrigger>

			<MenuOptions optionsContainerStyle={{ marginTop: 40, padding: 10 }}>
				<MenuOption onSelect={() => navigation.navigate('Lists')} text={t('general.myLists')} icon="home" />
				<MenuOption onSelect={() => signOut()} text={t('auth.logout')} icon="sign-out" />
				<MenuOption onSelect={() => navigation.navigate('Login')} text={t('auth.login')} icon="sign-in" />
				<LangSwitcher />
			</MenuOptions>
		</MenuComponent>
	);
};
