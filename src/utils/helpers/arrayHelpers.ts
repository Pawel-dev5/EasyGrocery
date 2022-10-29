export const findObjectInArray = <T, U extends keyof T>(array: T[], key: U, arg?: any) => {
	if (array?.length > 0) {
		let searchedObject = -1;

		if (key && arg) {
			searchedObject = array?.findIndex((item) => item[key] === arg);
		}
		if (key && !arg) {
			searchedObject = array?.findIndex((item) => item[key]);
		}
		if (searchedObject >= 0) {
			return array[searchedObject];
		}
	}

	return null;
};

export const removeObjectFromArray = <T, U extends keyof T>(array: T[], key: U, arg: any) => {
	if (array && Array.isArray(array)) {
		const removeIndex = array?.findIndex((item) => item[key] === arg);

		if (removeIndex !== -1) {
			array.splice(removeIndex, 1);
		}
	}

	return array;
};
