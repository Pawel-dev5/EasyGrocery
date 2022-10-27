import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { t } from 'i18next';

// ROUTING
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, global, profile } from 'routes/AppRoutes';
import axios from 'axios';

// CONFIG
import 'src/config/i18nConfig';
import { setupInterceptorsTo } from 'config/axiosConfig';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { ContextProvider } from 'config/useGlobalContext';

// STYLES
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme/themeDefault';
import { Lists } from 'components/lists';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import { Login, Register } from 'components/auth';
import { Edit, Profile } from 'components/user';

const { Screen, Navigator } = createNativeStackNavigator();

setupInterceptorsTo(axios);

const AppComponent = () => {
	const { lang, setLang, isAuth } = useContext(GlobalContextData);

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
						<Screen name={global.lists}>
							{({ navigation }) => (
								<AppWrapper routeName={t('general.myLists')} navigation={navigation} lang={lang} setLang={setLang}>
									<Lists />
								</AppWrapper>
							)}
						</Screen>
						<Screen name={profile.profile}>
							{({ navigation }) => (
								<AppWrapper routeName={t('profile.profile')} navigation={navigation} lang={lang} setLang={setLang}>
									<Profile navigation={navigation} />
								</AppWrapper>
							)}
						</Screen>
						<Screen name={profile.edit}>
							{({ navigation }) => (
								<AppWrapper routeName={t('profile.edit')} navigation={navigation} lang={lang} setLang={setLang}>
									<Edit />
								</AppWrapper>
							)}
						</Screen>
					</>
				)}

				{!isAuth && (
					<>
						<Screen name={auth.login}>
							{({ navigation }) => (
								<AppWrapper routeName={t('auth.login')} navigation={navigation} lang={lang} setLang={setLang}>
									<Login />
								</AppWrapper>
							)}
						</Screen>
						<Screen name={auth.register}>
							{({ navigation }) => (
								<AppWrapper routeName={t('auth.register')} navigation={navigation} lang={lang} setLang={setLang}>
									<Register />
								</AppWrapper>
							)}
						</Screen>
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
