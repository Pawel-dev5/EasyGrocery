import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { t } from 'i18next';
import axios from 'axios';
import 'expo-dev-client';

// ROUTING
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, lists, notifications, profile, shops } from 'routes/AppRoutes';

// CONFIG
import 'src/config/i18nConfig';
import { setupInterceptorsTo } from 'config/axiosConfig';

// REDUX
import { Provider } from 'react-redux';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { selectGlobal } from 'redux/slices/global';
import { useAppSelector } from 'redux/hooks';

// STYLES
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme/themeDefault';

// COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import { Forgot, Login, Register } from 'components/auth';
import { Profile } from 'components/user';
import { ListVariant } from 'components/lists/models/sections';
import { Lists } from 'components/lists';
import { List } from 'components/lists/sections';
import { Shops, Shop, ProductsList } from 'components/shops';
import { Notifications } from 'components/notifications';
import { useAuth } from 'components/auth/hooks/useAuth';

const { Screen, Navigator } = createNativeStackNavigator();

setupInterceptorsTo(axios);

const AppComponent = () => {
	const globalState = useAppSelector(selectGlobal);
	const { loginStoredUser } = useAuth();

	useEffect(() => {
		loginStoredUser();
	}, []);

	return (
		<NavigationContainer>
			<Navigator
				initialRouteName={t<string>('general.myLists')}
				screenOptions={{
					headerShown: false,
				}}
			>
				{globalState?.token && (
					<>
						<Screen name={lists.lists}>{(props) => <Lists {...props} />}</Screen>
						<Screen name={lists.singleList}>{(props) => <List variant={ListVariant.FULL} {...props} />}</Screen>
						<Screen name={profile.profile}>{(props) => <Profile {...props} />}</Screen>
						<Screen name={shops.shops}>{(props) => <Shops {...props} />}</Screen>
						<Screen name={shops.shop}>{(props) => <Shop {...props} />}</Screen>
						<Screen name={shops.productsList}>{(props) => <ProductsList {...props} />}</Screen>
						<Screen name={notifications.notifications}>{(props) => <Notifications {...props} />}</Screen>
					</>
				)}

				{!globalState?.token && (
					<>
						<Screen name={auth.login}>{(props) => <Login {...props} />}</Screen>
						<Screen name={auth.register}>{(props) => <Register {...props} />}</Screen>
						<Screen name={auth.passwordForgot}>{(props) => <Forgot {...props} />}</Screen>
					</>
				)}
			</Navigator>

			{/* eslint-disable-next-line react/style-prop-object */}
			<StatusBar style="dark" />
		</NavigationContainer>
	);
};

const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ThemeProvider theme={theme}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<MenuProvider>
						<AppComponent />
					</MenuProvider>
				</GestureHandlerRootView>
			</ThemeProvider>
		</PersistGate>
	</Provider>
);

export default App;
