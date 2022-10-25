import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
import i18next, { t } from 'i18next';

// ROUTING
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// CONFIG
import 'src/config/i18nConfig';

// CONTEXT
import { ContextProvider } from 'config/useGlobalContext';

// STYLES
import { ThemeProvider } from 'styled-components';
import theme from 'utils/theme/themeDefault';
import { Lists } from 'components/lists';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import { Login } from 'components/auth';

const { Screen, Navigator } = createNativeStackNavigator();

const AppComponent = () => {
	const { lang, setLang } = useContext(GlobalContextData);

	return (
		<NavigationContainer>
			<Navigator
				initialRouteName={t('general.myLists')}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Screen name="Lists">
					{({ navigation }) => (
						<AppWrapper routeName={t('general.myLists')} navigation={navigation} lang={lang} setLang={setLang}>
							<Lists />
						</AppWrapper>
					)}
				</Screen>

				<Screen name="Login">
					{/* <Screen name={t('auth.login')}> */}
					{({ navigation }) => (
						<AppWrapper routeName={t('auth.login')} navigation={navigation} lang={lang} setLang={setLang}>
							<Login />
						</AppWrapper>
					)}
				</Screen>
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
