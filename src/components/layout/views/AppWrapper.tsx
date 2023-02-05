import React, { useEffect, useRef, useMemo } from 'react';
import { t } from 'i18next';
import { View } from 'react-native';
import { Manager } from 'socket.io-client';
import { REACT_APP_API } from '@env';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// REDUX
import { selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectSocket, setSocket } from 'redux/slices/socket';
import { notificationsSetCounter, notificationsUpdateItemsSocket, selectNotifications } from 'redux/slices/notifications';

// HOOKS
import { useNotifications } from 'components/notifications/hooks/useNotifications';

// COMPONENTS
import { Alert, Menu } from 'components/layout/sections';
import { Icon, Loader } from 'components/layout/common';

// MODELS
import { AppLayoutInterface } from 'components/layout/models/views';

// STYLES
import {
	StyledAppLayout,
	StyledAppNavbar,
	StyledButton,
	StyledChildren,
	StyledText,
	StyledBottomAddListButton,
	StyledBottomSheetBody,
	StyledBottomSheetClose,
	StyledBottomSheetHeader,
	StyledFloatingAddListButtonWrapper,
} from 'components/layout/views/Styles';

// UTILS
import { shadowInline } from 'utils/theme/themeDefault';
import { useSwipe } from 'utils/hooks/useSwipe';
import { filterUnRead } from 'utils/helpers/arrayHelpers';

export const AppWrapper = ({
	children,
	routeName,
	navigation,
	bottomSheet,
	visible,
	onClose,
	floatedItems,
	customPadding,
	isLoading,
	bottomSheetHeader,
	stopSwipe,
}: AppLayoutInterface) => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);
	const socketState = useAppSelector(selectSocket);
	const notificationsState = useAppSelector(selectNotifications);
	const notifications = notificationsState?.items;
	const { user, token, alerts } = globalState;

	const { getNotifications } = useNotifications();

	// BOTTOMSHEET CONFIG
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%', '58%', '88.8%'], []);

	useEffect(() => {
		if (token) {
			if (notifications?.length === 0) getNotifications();

			if (!socketState?.socket) {
				// SOCKET.IO START
				const manager = new Manager(REACT_APP_API, {
					reconnectionDelayMax: 10000,
				});
				const newSocket = manager.socket('/');
				dispatch(setSocket(newSocket));
			}
		}
	}, []);

	// SOCKET.IO CONFIG
	if (socketState?.socket) {
		socketState?.socket.off('notificationsUpdate').once('notificationsUpdate', (data: any) => {
			if (data?.attributes?.users_permissions_user?.data?.attributes?.email === user?.email) {
				dispatch(notificationsUpdateItemsSocket(data));
			}
			return null;
		});
	}

	useEffect(() => {
		dispatch(notificationsSetCounter(filterUnRead(notifications)));
	}, [notifications]);

	const onSwipeLeft = () => {};
	const onSwipeRight = () => {
		if (!stopSwipe && navigation && navigation?.goBack) return navigation?.goBack();
		return null;
	};
	const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

	const handleClosePress = () => {
		bottomSheetRef?.current?.close();
		if (onClose) onClose();
	};

	return (
		<StyledAppLayout>
			<StyledAppNavbar>
				{navigation?.canGoBack() && routeName !== t<string>('general.myLists') && (
					<View style={{ width: 45, aspectRatio: 1 }}>
						<StyledButton onPress={() => navigation?.goBack()}>
							<Icon variant="grey" name="angle-left" size={30} />
						</StyledButton>
					</View>
				)}

				<StyledText
					customMarginLeft={routeName === t<string>('general.myLists') || !navigation?.canGoBack() ? '16px' : null}
				>
					{routeName}
				</StyledText>
			</StyledAppNavbar>

			{isLoading ? (
				<>
					<StyledChildren customPadding={customPadding}>
						<Loader size={120} />
					</StyledChildren>

					<Menu navigation={navigation} />
				</>
			) : (
				<>
					{children && (
						<>
							<StyledChildren onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} customPadding={customPadding}>
								{children}
							</StyledChildren>

							<Menu navigation={navigation} />
						</>
					)}

					{bottomSheet && visible && (
						<BottomSheet
							ref={bottomSheetRef}
							index={1}
							snapPoints={snapPoints}
							style={shadowInline}
							enablePanDownToClose
							backdropComponent={BottomSheetBackdrop}
						>
							<StyledBottomSheetBody>
								<StyledBottomSheetClose onPress={() => handleClosePress()}>
									<Icon name="times" size={20} />
								</StyledBottomSheetClose>

								{bottomSheetHeader && <StyledBottomSheetHeader>{t<string>(bottomSheetHeader)}</StyledBottomSheetHeader>}
								{bottomSheet}
							</StyledBottomSheetBody>
						</BottomSheet>
					)}

					{floatedItems && (
						<StyledFloatingAddListButtonWrapper>
							{floatedItems?.map(({ id, icon, variant: itemVariant, size, onPress }) => (
								<StyledBottomAddListButton key={id} onPress={onPress} style={shadowInline}>
									<Icon name={icon} size={size} variant={itemVariant} />
								</StyledBottomAddListButton>
							))}
						</StyledFloatingAddListButtonWrapper>
					)}
				</>
			)}

			{alerts && alerts[0] && <Alert {...alerts[0]} />}
		</StyledAppLayout>
	);
};
