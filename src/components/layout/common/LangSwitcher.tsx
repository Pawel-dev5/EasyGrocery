import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import i18next from 'i18next';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// STYLES
import { StyledLangSwitcher, StyledLangWrapper, StyledLangTitle } from 'components/layout/common/Styles';

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
			{lang !== 'pl' ? (
				<StyledLangSwitcher source={require('../../../assets/flags/PL.png')} />
			) : (
				<StyledLangSwitcher source={require('../../../assets/flags/EN.png')} />
			)}
		</TouchableOpacity>
	);
};
export const LangSwitcherExpanded = () => {
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
			{lang !== 'pl' ? (
				<StyledLangWrapper>
					<StyledLangTitle>Polski</StyledLangTitle>
					<StyledLangSwitcher source={require('../../../assets/flags/PL.png')} />
				</StyledLangWrapper>
			) : (
				<StyledLangWrapper>
					<StyledLangTitle>English</StyledLangTitle>

					<StyledLangSwitcher source={require('../../../assets/flags/EN.png')} />
				</StyledLangWrapper>
			)}
		</TouchableOpacity>
	);
};
