import { User } from 'config/models';
import { RefObject } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { ColorsKeys } from 'utils/theme/themeDefault';

export type VariantType = 'white' | 'grey' | 'transparent' | 'done' | 'unDone' | 'black';

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

export interface InputInterface extends TextInputProps {
	inputRef?: RefObject<TextInput>;
	ariaInvalid?: boolean;
	name: string;
	type?: 'password' | 'text' | 'number' | 'checkbox' | 'radio' | 'submit' | ' button' | 'date' | 'image';
	customStyle?: any;
	globalSearch?: boolean;
}

export interface SearchInterface {
	name: string;
	placeholder: string;
	textContentType: TextInputProps['textContentType'];
	setSearchIcons: (arg0: string) => void;
	results: any;
	actualUsers?: User[];
	optionOnClick: (user: User) => void;
}
