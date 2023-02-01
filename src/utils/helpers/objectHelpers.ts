const updateObject = (oldObject: object, newValues: object) => {
	if (oldObject && newValues) {
		const oldCopy = { ...oldObject };
		const newCopy = { ...newValues };
		return Object.assign(oldCopy, newCopy);
	}

	return oldObject;
};

const checkIfObjectIsNotEmpty = (object: object) => Object.keys(object).length > 0; // if empty return false

export { updateObject, checkIfObjectIsNotEmpty };
