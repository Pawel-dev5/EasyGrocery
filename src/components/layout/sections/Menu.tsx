import React, { useContext } from 'react';
import { Menu as MenuComponent, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { t } from 'i18next';

// ROUTER
import { lists, profile, shops } from 'routes/AppRoutes';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { Icon, MenuOption, LangSwitcher, LangSwitcherExpanded } from 'components/layout/common';

// STYLES
import { StyledMenuTrigger } from 'components/layout/sections/Styles';

// MODELS
import { MenuInterface } from 'components/layout/models/sections';

export const Menu = ({ variant, navigation }: MenuInterface) => {
	const { isAuth, signOut } = useContext(GlobalContextData);

	return (
		<>
			{isAuth ? (
				<MenuComponent>
					<MenuTrigger>
						<StyledMenuTrigger>
							<Icon variant={variant} name="ellipsis-v" size={20} />
						</StyledMenuTrigger>
					</MenuTrigger>

					<MenuOptions optionsContainerStyle={{ marginTop: 40, padding: 10 }}>
						<MenuOption onSelect={() => navigation.navigate(lists.lists)} text={t('general.myLists')} icon="list" />
						<MenuOption onSelect={() => navigation.navigate(profile.profile)} text={t('profile.profile')} icon="user" />
						<MenuOption onSelect={() => navigation.navigate(shops.shops)} text={t('shops.shops')} icon="shopping-basket" />
						<MenuOption onSelect={() => signOut()} text={t('auth.logout')} icon="sign-out" />

						<LangSwitcherExpanded />
					</MenuOptions>
				</MenuComponent>
			) : (
				<LangSwitcher />
			)}
		</>
	);
};
