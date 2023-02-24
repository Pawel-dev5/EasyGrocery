import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { t } from 'i18next';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Manager } from 'socket.io-client';
import { REACT_APP_API } from '@env';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// REDUX
import { globalSetGlobalSearchInput, selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectSocket, setSocket } from 'redux/slices/socket';
import { notificationsSetCounter, notificationsUpdateItemsSocket, selectNotifications } from 'redux/slices/notifications';

// HOOKS
import { useNotifications } from 'components/notifications/hooks/useNotifications';
import { useSearchBarAnimation } from 'components/layout/hooks/useSearchBarAnimation';

// COMPONENTS
import { Alert, Menu, SearchBar } from 'components/layout/sections';
import { Icon, Loader } from 'components/layout/common';

// MODELS
import { AppLayoutInterface } from 'components/layout/models/views';

// STYLES
import {
	StyledAppLayout,
	StyledAppNavbar,
	StyledButton,
	StyledChildren,
	StyledBottomAddListButton,
	StyledBottomSheetBody,
	StyledBottomSheetClose,
	StyledBottomSheetHeader,
	StyledFloatingAddListButtonWrapper,
	styles,
} from 'components/layout/views/Styles';

// UTILS
import theme, { shadowInline } from 'utils/theme/themeDefault';
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
	searchActive,
	globalAddInput,
	globalInputLoader,
}: AppLayoutInterface) => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);
	const socketState = useAppSelector(selectSocket);
	const notificationsState = useAppSelector(selectNotifications);
	const notifications = notificationsState?.items;
	const { user, token, alerts, globalSearchInput } = globalState;

	// BOTTOMSHEET CONFIG
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%', '58%', '88.8%'], []);

	// SEARCH BAR ANIMATION CONFIG
	const AnimatedSearchBar = Animated.createAnimatedComponent(SearchBar);
	const [animationStart, setAnimationStart] = useState(false);
	const fontSize = useRef(new Animated.Value(16)).current;
	const borderRadius = useRef(new Animated.Value(0)).current;
	const borderWidth = useRef(new Animated.Value(0)).current;
	const paddingX = useRef(new Animated.Value(0)).current;
	const borderColourIndex = useRef(new Animated.Value(0)).current;
	const backgroundColourIndex = useRef(new Animated.Value(0)).current;
	const backgroundColor = backgroundColourIndex.interpolate({
		inputRange: [0, 1],
		outputRange: [theme.white, theme.grey100],
	});
	const borderColor = borderColourIndex.interpolate({
		inputRange: [0, 1],
		outputRange: [theme.white, theme.grey300],
	});

	const { getNotifications } = useNotifications();
	const { animationOnStart, animationOnReverse } = useSearchBarAnimation({
		fontSize,
		borderRadius,
		borderWidth,
		backgroundColourIndex,
		borderColourIndex,
		paddingX,
	});

	useEffect(() => {
		if (animationStart) {
			Animated.parallel(animationOnStart(), { stopTogether: false }).start();
		} else {
			Animated.parallel(animationOnReverse(), { stopTogether: false }).start();
		}
	}, [animationStart]);

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

	const handleSheetChanges = useCallback((index: number) => {
		if (index === -1 && onClose) onClose();
	}, []);

	return (
		<StyledAppLayout>
			<StyledAppNavbar>
				<View style={styles.componentContainer}>
					{navigation?.canGoBack() && routeName !== t<string>('general.myLists') && (
						<View style={{ width: 45, aspectRatio: 1 }}>
							<StyledButton
								onPress={() => {
									navigation?.goBack();
									if (globalSearchInput) dispatch(globalSetGlobalSearchInput(''));
								}}
							>
								<Icon variant="grey" name="angle-left" size={30} />
							</StyledButton>
						</View>
					)}

					<Animated.View
						style={{
							backgroundColor,
							borderRadius,
							borderWidth,
							borderColor,
							paddingLeft: paddingX,
							paddingRight: paddingX,
							...styles.componentWrapper,
						}}
					>
						<AnimatedSearchBar
							searchActive={searchActive || globalAddInput ? animationStart : false}
							fontSize={fontSize}
							routeName={routeName}
							marginLeft={routeName === t<string>('general.myLists') || !navigation?.canGoBack() ? 16 : undefined}
						/>

						<TouchableOpacity
							onPress={() => {
								setAnimationStart(!animationStart);
								if ((searchActive || globalAddInput) && globalSearchInput !== '') dispatch(globalSetGlobalSearchInput(''));
							}}
							style={styles.componentButton}
						>
							{globalInputLoader ? (
								<Loader size={25} />
							) : (
								<>
									{(searchActive || globalAddInput) && (
										<Icon name={animationStart ? 'times' : `${globalAddInput ? 'plus' : 'search'}`} size={20} />
									)}
								</>
							)}
						</TouchableOpacity>
					</Animated.View>
				</View>
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
							onChange={handleSheetChanges}
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
