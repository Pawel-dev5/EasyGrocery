import React, { useContext, useEffect } from 'react';
import { t } from 'i18next';
import { View } from 'react-native';
import { Manager } from 'socket.io-client';
import { REACT_APP_API } from '@env';

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
	StyledBottomSheet,
	StyledBottomSheetBody,
	StyledBottomSheetClose,
	StyledBottomSheetHeader,
	StyledFloatingAddListButtonWrapper,
	StyledOverlayBottomSheet,
} from 'components/layout/views/Styles';
import { shadowInline } from 'utils/theme/themeDefault';

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
			if (data?.attributes?.users_permissions_user?.data?.attributes?.email === user?.email)
				setNotifications([...notifications, data]);
		});
	}

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
					{children && <StyledChildren customPadding={customPadding}>{children}</StyledChildren>}

					{bottomSheet && visible && onClose && (
						<>
							<StyledOverlayBottomSheet onPress={() => onClose()} />
							<StyledBottomSheet style={shadowInline}>
								<StyledBottomSheetClose onPress={() => onClose()} />

								<StyledBottomSheetBody>
									{bottomSheetHeader && <StyledBottomSheetHeader>{t<string>(bottomSheetHeader)}</StyledBottomSheetHeader>}
									{bottomSheet}
								</StyledBottomSheetBody>
							</StyledBottomSheet>
						</>
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
