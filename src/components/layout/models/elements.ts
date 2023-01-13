export enum SwipeVariants {
	NOTIFICATION = 'notification',
}

export interface SwipeRigheDeleteInerface {
	onClick: () => void;
	loader: boolean;
	firstElement?: boolean;
	lastElement?: boolean;
	variant?: SwipeVariants;
}
