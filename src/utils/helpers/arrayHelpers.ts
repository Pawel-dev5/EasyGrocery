export const removeObjectFromArray = <T, U extends keyof T>(array: T[], key: U, arg: any) => {
	if (array && Array.isArray(array)) {
		const removeIndex = array?.findIndex((item) => item[key] === arg);

		if (removeIndex !== -1) {
			array.splice(removeIndex, 1);
		}
	}

	return array;
};

export const CheckIfArrayContainsString = (array: string[], string: string) => array?.includes(string);

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

export const checkArrayType = (arr: any[], type: string) => arr?.every((element) => typeof element === type);

export const updateArray = <T, U extends keyof T>(array: T[], value: T, key: U = 'id' as U) => {
	const newArray = array || [];

	// If array doesn't exist return newArray with value
	if (array?.length === 0) {
		newArray.push(value);
		return newArray;
	}

	// If array is typeof string[]
	if (checkArrayType(newArray, 'string') && typeof value === 'string') {
		if (CheckIfArrayContainsString(newArray as any, value)) return newArray;
		newArray.push(value);
		return newArray;
	}

	// If array is typeof obj[]
	const item = findObjectInArray(newArray, key, value[key]);
	if (item) {
		const updatedItems = newArray.map((arrayItem) => {
			if (arrayItem[key] !== item[key]) {
				// Since we only want to update one item, preserve all others as they are now
				return { ...arrayItem };
			}

			// Use the provided callback to create an updated item
			const itemData = { ...item };
			const updatedItem = Object.assign(itemData, value);
			return { ...updatedItem };
		});

		return updatedItems;
	}
	newArray.push(value);
	return newArray;
};

export const updateAllObjectsInArray = <T>(array: T[], updateItemCallback: (item: T) => any): T[] =>
	array?.map((item) => updateItemCallback(item));

export const insertElementUnderIndex = <T>(array: T[], newElement: T, underElementId: any, key: keyof T): T[] => {
	const elementIndex = array.findIndex((el) => el[key] === underElementId);
	const updatedArray = [...array];
	updatedArray.splice(elementIndex + 1, 0, newElement);
	return updatedArray;
};

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export const arrayFromNumber = (value: number): number[] => Array.from(Array(value).keys());

export const updateObjectInArray = <T, U extends keyof T>(array: T[], key: U, arg: any, updateItemCallback: any) => {
	if (array && Array.isArray(array) && array.length > 0) {
		const updatedItems = array.map((item) => {
			if (item[key] !== arg) {
				// Since we only want to update one item, preserve all others as they are now
				return item;
			}

			// Use the provided callback to create an updated item
			const updatedItem = updateItemCallback(item);
			return updatedItem;
		});

		return updatedItems;
	}

	return array;
};
