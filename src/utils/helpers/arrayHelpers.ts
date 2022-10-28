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
