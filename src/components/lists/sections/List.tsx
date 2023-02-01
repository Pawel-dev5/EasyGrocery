import React from 'react';

// COMPONENTS
import { FullList, ShortList } from 'components/lists/items';

// MODELS
import { ListVariant, ListWrapperInterface } from 'components/lists/models/sections';

export const List = (props: ListWrapperInterface) => {
	const { list, variant, lists: actualList, index } = props;

	switch (variant) {
		case ListVariant.PREVIEW:
			if (list) return <ShortList {...list} actualList={actualList} index={index} />;

			return null;
		case ListVariant.FULL:
			return <FullList {...props} actualList={actualList} />;
		default:
			return null;
	}
};
