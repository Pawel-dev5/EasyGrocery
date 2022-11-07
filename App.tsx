import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { t } from 'i18next';
import axios from 'axios';

// ROUTING
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, lists, profile, shops } from 'routes/AppRoutes';

// CONFIG
import 'src/config/i18nConfig';
import { setupInterceptorsTo } from 'config/axiosConfig';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { ContextProvider } from 'config/useGlobalContext';

// STYLES
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme/themeDefault';

// COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import { Login, Register } from 'components/auth';
import { Profile } from 'components/user';
import { ListVariant } from 'components/lists/models/sections';
import { Lists } from 'components/lists';
import { List } from 'components/lists/sections';
import { Shops } from 'components/shops';

const { Screen, Navigator } = createNativeStackNavigator();

setupInterceptorsTo(axios);

const AppComponent = () => {
	const { isAuth } = useContext(GlobalContextData);

	return (
		<NavigationContainer>
			<Navigator
				initialRouteName={t('general.myLists')}
				screenOptions={{
					headerShown: false,
				}}
			>
				{isAuth && (
					<>
						<Screen name={lists.lists}>{(props) => <Lists {...props} />}</Screen>
						<Screen name={lists.singleList}>{(props) => <List variant={ListVariant.FULL} {...props} />}</Screen>
						<Screen name={profile.profile}>{(props) => <Profile {...props} />}</Screen>
						<Screen name={shops.shops}>{(props) => <Shops {...props} />}</Screen>
					</>
				)}

				{!isAuth && (
					<>
						<Screen name={auth.login}>{(props) => <Login {...props} />}</Screen>
						<Screen name={auth.register}>{(props) => <Register {...props} />}</Screen>
					</>
				)}
			</Navigator>
			<StatusBar style="dark" />
		</NavigationContainer>
	);
};

const App = () => (
	<ThemeProvider theme={theme}>
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ContextProvider>
				<MenuProvider>
					<AppComponent />
				</MenuProvider>
			</ContextProvider>
		</GestureHandlerRootView>
	</ThemeProvider>
);

export default App;
