import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';

import generalPl from 'utils/translations/pl/general.json';
import generalEn from 'utils/translations/en/general.json';

export const defaultNS = 'translation';
export const resources = {
	pl: {
		translation: generalPl,
	},
	en: {
		translation: generalEn,
	},
} as const;

i18n
	.use(initReactI18next)
	.use(intervalPlural)
	.init({
		lng: 'pl',
		ns: ['translation'],
		defaultNS,
		resources,
		fallbackLng: ['en', 'pl'],
	});

export default i18n;
