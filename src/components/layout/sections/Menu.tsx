import React, { useContext } from 'react';
import { Menu as MenuComponent, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { t } from 'i18next';

// ROUTER
import { auth, lists, profile } from 'routes/AppRoutes';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { Icon, MenuOption, LangSwitcher } from 'components/layout/common';

// STYLES
import { StyledMenuTrigger } from 'components/layout/sections/Styles';

// MODELS
import { MenuInterface } from 'components/layout/models/sections';

export const Menu = ({ variant, navigation }: MenuInterface) => {
	const { isAuth, signOut } = useContext(GlobalContextData);

	return (
		<MenuComponent>
			<MenuTrigger>
				<StyledMenuTrigger>
					<Icon variant={variant} name="ellipsis-v" size={20} />
				</StyledMenuTrigger>
			</MenuTrigger>

			<MenuOptions optionsContainerStyle={{ marginTop: 40, padding: 10 }}>
				{isAuth && (
					<>
						<MenuOption onSelect={() => navigation.navigate(lists.lists)} text={t('general.myLists')} icon="list" />
						<MenuOption onSelect={() => navigation.navigate(profile.profile)} text={t('profile.profile')} icon="user" />
						<MenuOption onSelect={() => signOut()} text={t('auth.logout')} icon="sign-out" />
					</>
				)}

				{!isAuth && (
					<>
						<MenuOption onSelect={() => navigation.navigate(auth.login)} text={t('auth.login')} icon="sign-in" />
						<MenuOption onSelect={() => navigation.navigate(auth.register)} text={t('auth.register')} icon="user" />
					</>
				)}
				<LangSwitcher />
			</MenuOptions>
		</MenuComponent>
	);
};
