import React, { useContext } from 'react';
import { t } from 'i18next';
import { Text, TouchableOpacity, View } from 'react-native';

// ROUTES
import { profile } from 'routes/AppRoutes';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

export const Profile = ({ navigation }: { navigation: any }) => {
	const { signIn } = useContext(GlobalContextData);

	return (
		<View>
			<Text>{t<string>('profile.profile')}</Text>
			<TouchableOpacity onPress={() => navigation.navigate(profile.edit)}>
				<Text>{t<string>('profile.edit')}</Text>
			</TouchableOpacity>
		</View>
	);
};
