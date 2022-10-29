const updateObject = (oldObject: object, newValues: object) => {
	if (oldObject && newValues) {
		return Object.assign(oldObject, newValues);
	}

	return oldObject;
};

const checkIfObjectIsNotEmpty = (object: object) => Object.keys(object).length > 0; // if empty return false

export { updateObject, checkIfObjectIsNotEmpty };
