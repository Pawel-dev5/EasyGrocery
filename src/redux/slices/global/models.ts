import { User } from 'config/models';

export type LanguageTypes = 'pl' | 'en';

export interface LanguageInterface {
	lang?: LanguageTypes;
}

export enum AlertTypes {
	ERROR = 'ERROR',
	ALERT = 'ALERT',
}

export interface AlertsInterface {
	id: string;
	type: AlertTypes;
	message: string;
	status: string;
	name: string;
	bottomSheet?: boolean;
}

export interface InitialStateInterface extends LanguageInterface {
	jwt?: string | null;
	token?: string | null;
	user: User | null;
	alerts: AlertsInterface[];
	menuRoute: number;
}
