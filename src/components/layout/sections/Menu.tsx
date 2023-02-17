import React, { useCallback } from 'react';
import { t } from 'i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { globalSetMenuRoute, selectGlobal } from 'redux/slices/global';

// REDUX
import { selectNotifications } from 'redux/slices/notifications';

// ROUTER
import { lists, notifications as notificationsRoutes, profile, shops } from 'routes/AppRoutes';

// COMPONENTS
import { NotificationCounter } from 'components/layout/common';

// STYLES
import { StyledTabMenuWrapper, StyledMenuIcon, StyledMenuOption, StyledMenuButton } from 'components/layout/sections/Styles';

// MODELS
import { MenuElementsInterface } from 'components/layout/models/sections';

export const Menu = ({ navigation }: { navigation: any }) => {
	const dispatch = useAppDispatch();

	const globalState = useAppSelector(selectGlobal);
	const notificationsState = useAppSelector(selectNotifications);
	const notificationsCounter = notificationsState?.counter;
	const { token, menuRoute } = globalState;
	let menuElements: MenuElementsInterface[] = [];

	if (token) {
		menuElements = [
			{
				id: 1,
				text: t('general.myLists'),
				icon: 'list',
				link: () => navigation?.navigate(lists.lists),
			},
			{
				id: 2,
				text: t('shops.shops'),
				icon: 'shopping-basket',
				link: () => navigation?.navigate(shops.shops),
			},
			{
				id: 3,
				text: t('notifications.title'),
				icon: 'bell',
				counter: notificationsCounter,
				link: () => navigation?.navigate(notificationsRoutes.notifications),
			},
			{
				id: 4,
				text: t('profile.profile'),
				icon: 'user',
				link: () => navigation?.navigate(profile.profile),
			},
		];
	}

	const setColor = useCallback(
		(id: number) => {
			if (menuRoute === id) return 'base2';
			return 'black';
		},
		[menuRoute],
	);
	return (
		<StyledTabMenuWrapper>
			{menuElements?.map(({ id, icon, counter, link }) => (
				<StyledMenuOption key={id}>
					<StyledMenuButton
						onPress={() => {
							link();
							dispatch(globalSetMenuRoute(id));
						}}
					>
						{icon && <StyledMenuIcon name={icon} color={setColor(id)} />}
						{counter ? <NotificationCounter counter={counter} variant="small" /> : null}
					</StyledMenuButton>
				</StyledMenuOption>
			))}
		</StyledTabMenuWrapper>
	);
};
