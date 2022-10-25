import React from 'react';
import { t } from 'i18next';
import { Text } from 'react-native';

export const Edit = () => {
	return <Text>{t<string>('profile.edit')}</Text>;
};
