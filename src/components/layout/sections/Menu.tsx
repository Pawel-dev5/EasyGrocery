import React, { useContext } from 'react';
import { Menu as MenuComponent, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { t } from 'i18next';

// REDUX
import { selectGlobal } from 'redux/slices/global';
import { useAppSelector } from 'redux/hooks';

// ROUTER
import { lists, notifications, profile, shops } from 'routes/AppRoutes';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { useAuth } from 'components/auth/hooks/useAuth';

// COMPONENTS
import { Icon, MenuOption, LangSwitcher, LangSwitcherExpanded, NotificationCounter } from 'components/layout/common';
import { SubmitAlert } from 'components/lists/partials';

// STYLES
import { StyledMenuTrigger } from 'components/layout/sections/Styles';

// MODELS
import { MenuInterface } from 'components/layout/models/sections';

export const Menu = ({ variant, navigation }: MenuInterface) => {
	const globalState = useAppSelector(selectGlobal);
	const { notificationsCounter } = useContext(GlobalContextData);
	const { signOut } = useAuth();

	return (
		<>
			{globalState?.token ? (
				<MenuComponent>
					<MenuTrigger>
						<StyledMenuTrigger>
							<Icon variant={variant} name="ellipsis-v" size={20} />
							<NotificationCounter counter={notificationsCounter} />
						</StyledMenuTrigger>
					</MenuTrigger>

					<MenuOptions optionsContainerStyle={{ marginTop: 40, padding: 10 }}>
						<MenuOption onSelect={() => navigation?.navigate(lists.lists)} text={t('general.myLists')} icon="list" />
						<MenuOption
							onSelect={() => navigation?.navigate(notifications.notifications)}
							text={t('notifications.title')}
							icon="bell"
							counter={notificationsCounter}
						/>
						<MenuOption onSelect={() => navigation?.navigate(profile.profile)} text={t('profile.profile')} icon="user" />
						<MenuOption onSelect={() => navigation?.navigate(shops.shops)} text={t('shops.shops')} icon="shopping-basket" />
						<MenuOption
							onSelect={() =>
								SubmitAlert({
									okPressed: () => signOut(),
									okText: t('auth.logout'),
									cancelText: t('general.cancel'),
									cancelPressed: () => {},
									alertTitle: t('auth.confirmSignOut'),
								})
							}
							text={t('auth.logout')}
							icon="sign-out"
						/>

						<LangSwitcherExpanded />
					</MenuOptions>
				</MenuComponent>
			) : (
				<LangSwitcher />
			)}
		</>
	);
};
