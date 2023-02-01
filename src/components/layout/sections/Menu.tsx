import React from 'react';
import { Menu as MenuComponent, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { t } from 'i18next';

// REDUX
import { selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

// ACTIONS
import { logoutAction } from 'redux/actions';

// ROUTER
import { lists, notifications, profile, shops } from 'routes/AppRoutes';

// HOOKS
import { useAuth } from 'components/auth/hooks/useAuth';

// COMPONENTS
import { Icon, MenuOption, LangSwitcher, NotificationCounter } from 'components/layout/common';
import { SubmitAlert } from 'components/lists/partials';

// STYLES
import { StyledMenuTrigger } from 'components/layout/sections/Styles';

// MODELS
import { MenuInterface } from 'components/layout/models/sections';
import { selectNotifications } from 'redux/slices/notifications';

export const Menu = ({ variant, navigation }: MenuInterface) => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);
	const notificationState = useAppSelector(selectNotifications);
	const notificationsCounter = notificationState?.counter;

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
									okPressed: () => {
										signOut();
										dispatch(logoutAction());
									},
									okText: t('auth.logout'),
									cancelText: t('general.cancel'),
									cancelPressed: () => {},
									alertTitle: t('auth.confirmSignOut'),
								})
							}
							text={t('auth.logout')}
							icon="sign-out"
						/>

						<LangSwitcher expanded />
					</MenuOptions>
				</MenuComponent>
			) : (
				<LangSwitcher />
			)}
		</>
	);
};
