import { User } from 'config/models';
import { ChangeEvent } from 'react';
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
}

export interface InputInterface {
	name: string;
	value?: HTMLInputElement | string;
	placeholder: string;
	textContentType: string;
	keyboardType?: string;
	autoComplete?: string;
	ariaInvalid?: boolean;
	onBlur?: () => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
	onSubmitEditing?: any;
	onKeyPress?: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: 'password' | 'text' | 'number' | 'checkbox' | 'radio' | 'submit' | ' button' | 'date' | 'image';
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
