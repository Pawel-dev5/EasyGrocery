/* eslint-disable global-require */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import i18next from 'i18next';

// REDUX
import { globalSetLang, selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

// STYLES
import { StyledLangSwitcher, StyledLangWrapper, StyledLangTitle } from 'components/layout/common/Styles';

export const LangSwitcher = ({ expanded = false }: { expanded?: boolean }) => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);

	return (
		<TouchableOpacity
			onPress={() => {
				if (globalState?.lang === 'en') {
					dispatch(globalSetLang('pl'));
					i18next.changeLanguage('pl');
				} else {
					dispatch(globalSetLang('en'));
					i18next.changeLanguage('en');
				}
			}}
		>
			{globalState?.lang !== 'pl' ? (
				<>
					{expanded ? (
						<StyledLangWrapper>
							<StyledLangTitle>Polski</StyledLangTitle>
							<StyledLangSwitcher source={require('../../../assets/flags/PL.png')} />
						</StyledLangWrapper>
					) : (
						<StyledLangSwitcher source={require('../../../assets/flags/PL.png')} />
					)}
				</>
			) : (
				<>
					{expanded ? (
						<StyledLangWrapper>
							<StyledLangTitle>English</StyledLangTitle>

							<StyledLangSwitcher source={require('../../../assets/flags/EN.png')} />
						</StyledLangWrapper>
					) : (
						<StyledLangSwitcher source={require('../../../assets/flags/EN.png')} />
					)}
				</>
			)}
		</TouchableOpacity>
	);
};
