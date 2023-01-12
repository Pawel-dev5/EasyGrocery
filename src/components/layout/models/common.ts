import { User } from 'config/models';
import { ChangeEvent, RefObject } from 'react';
import { TextInput } from 'react-native';
import { ColorsKeys } from 'utils/theme/themeDefault';

export type VariantType = 'white' | 'grey' | 'transparent' | 'done' | 'unDone';

export interface IconInterface {
	name: string;
	variant?: VariantType;
	size?: number;
}

export interface MenuOptionInterface {
	onSelect: () => void;
	text: string;
	icon?: string;
	color?: ColorsKeys;
	counter?: number;
}

export interface InputInterface {
	name: string;
	inputRef?: RefObject<TextInput>;
	value?: HTMLInputElement | string;
	placeholder: string;
	textContentType: string;
	onFocus?: () => void;
	keyboardType?: string;
	autoComplete?: string;
	ariaInvalid?: boolean;
	onBlur?: () => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
	onSubmitEditing?: () => void;
	onKeyPress?: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: 'password' | 'text' | 'number' | 'checkbox' | 'radio' | 'submit' | ' button' | 'date' | 'image';
	blurOnSubmit?: boolean;
}

export interface SearchInterface {
	name: string;
	placeholder: string;
	textContentType: string;
	setSearchIcons: (arg0: string) => void;
	results: any;
	actualUsers?: User[];
	optionOnClick: (user: User) => void;
}
