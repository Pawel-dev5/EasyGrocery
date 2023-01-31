import { User } from 'config/models';

export type LanguageTypes = 'pl' | 'en';

export interface LanguageInterface {
	lang?: LanguageTypes;
}

export interface InitialStateInterface extends LanguageInterface {
	jwt?: string | null;
	token?: string | null;
	user: User | null;
}
