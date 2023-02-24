// HELPERS
import { findObjectInArray } from 'utils/helpers/arrayHelpers';

// MODELS
import { DataListInterface, ExpandListInterface } from 'components/layout/common/expandableListView/models/views';

export const convertDataToExpand = (initialData: ExpandListInterface[], data: DataListInterface[]) => {
	const newArr: ExpandListInterface[] = [];

	if (data && data?.length > 0) {
		const result = initialData?.every((obj) => obj?.isExpanded === undefined);

		if (result) {
			data?.forEach((dataItem) => newArr.push({ ...dataItem, isExpanded: true }));
		} else {
			data?.forEach((dataItem) => {
				const findOldData = findObjectInArray(initialData, 'category', dataItem.category);
				newArr.push({ ...dataItem, isExpanded: !!findOldData?.isExpanded });
			});
		}
	}
	return newArr;
};
