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
	placeholder: string;
	keyboardType?: string;
	textContentType: string;
	autoComplete?: string;
	ariaInvalid?: boolean;
	onBlur?: () => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	value?: HTMLInputElement | string;
	name: string;
	type?: 'password' | 'text' | 'number' | 'checkbox' | 'radio' | 'submit' | ' button' | 'date' | 'image';
}
