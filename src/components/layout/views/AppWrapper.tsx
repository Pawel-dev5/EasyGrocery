import React, { useContext, useEffect, useRef, useMemo, useCallback } from 'react';
import { t } from 'i18next';
import { View } from 'react-native';
import { Manager } from 'socket.io-client';
import { REACT_APP_API } from '@env';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { Menu } from 'components/layout/sections';
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
import { findObjectInArray } from 'utils/helpers/arrayHelpers';

export const AppWrapper = ({
	children,
	routeName,
	variant = 'grey',
	navigation,
	bottomSheet,
	visible,
	onClose,
	floatedItems,
	customPadding,
	isLoading,
	bottomSheetHeader,
}: AppLayoutInterface) => {
	const { isAuth, lang, setLang, getNotificationsCounter, setSocket, setNotifications, notifications, socket, user } =
		useContext(GlobalContextData);

	// BOTTOMSHEET CONFIG
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%', '58%', '88.8%'], []);
	const handleSheetChanges = useCallback((index: number) => {
		// console.log('handleSheetChanges', index);
	}, []);

	useEffect(() => {
		if (isAuth) {
			getNotificationsCounter();
			// SOCKET.IO START
			const manager = new Manager(REACT_APP_API, {
				reconnectionDelayMax: 10000,
			});
			const socket = manager.socket('/');
			setSocket(socket);
		}
	}, []);

	// SOCKET.IO CONFIG
	if (socket) {
		socket.off('notificationsUpdate').once('notificationsUpdate', (data: any) => {
			if (data?.attributes?.users_permissions_user?.data?.attributes?.email === user?.email) {
				const checkedNotification = findObjectInArray(notifications, 'id', data?.id);
				if (checkedNotification) {
					return null;
				} else setNotifications([...notifications, data]);
			}
		});
	}

	const onSwipeLeft = () => {};

	const onSwipeRight = () => navigation && navigation?.goBack && navigation?.goBack();

	const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

	const handleClosePress = () => {
		bottomSheetRef?.current?.close();
		if (onClose) onClose();
	};

	return (
		<StyledAppLayout>
			<StyledAppNavbar variant={variant}>
				<View style={{ width: 45, aspectRatio: 1 }}>
					{navigation?.canGoBack() && (
						<StyledButton onPress={() => navigation?.goBack()}>
							<Icon variant={variant} name="angle-left" size={30} />
						</StyledButton>
					)}
				</View>

				<StyledText variant={variant}>{routeName}</StyledText>

				<Menu variant={variant} navigation={navigation} lang={lang} setLang={setLang} />
			</StyledAppNavbar>

			{isLoading ? (
				<Loader size={100} />
			) : (
				<>
					{children && (
						<StyledChildren onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} customPadding={customPadding}>
							{children}
						</StyledChildren>
					)}

					{bottomSheet && visible && (
						<BottomSheet
							ref={bottomSheetRef}
							index={1}
							snapPoints={snapPoints}
							style={shadowInline}
							enablePanDownToClose
							onChange={handleSheetChanges}
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
							{floatedItems?.map(({ id, icon, variant, size, onPress }) => (
								<StyledBottomAddListButton key={id} onPress={onPress} style={shadowInline}>
									<Icon name={icon} size={size} variant={variant} />
								</StyledBottomAddListButton>
							))}
						</StyledFloatingAddListButtonWrapper>
					)}
				</>
			)}
		</StyledAppLayout>
	);
};
