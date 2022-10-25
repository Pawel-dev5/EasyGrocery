import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import i18next, { t } from 'i18next';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

export const LangSwitcher = () => {
	const { lang, setLang } = useContext(GlobalContextData);

	return (
		<TouchableOpacity
			onPress={() => {
				if (lang === 'en') {
					setLang('pl');
					i18next.changeLanguage('pl');
				} else {
					setLang('en');
					i18next.changeLanguage('en');
				}
			}}
		>
			<Text>{t('general.languageChange')}</Text>
		</TouchableOpacity>
	);
};
