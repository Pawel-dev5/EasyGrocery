import React from 'react';
import { t } from 'i18next';
import { Text, TouchableOpacity, View } from 'react-native';

// ROUTES
import { profile } from 'routes/AppRoutes';

export const Profile = ({ navigation }: { navigation: any }) => {
	return (
		<View>
			<Text>{t<string>('profile.profile')}</Text>
			<TouchableOpacity onPress={() => navigation.navigate(profile.edit)}>
				<Text>{t<string>('profile.edit')}</Text>
			</TouchableOpacity>
		</View>
	);
};
