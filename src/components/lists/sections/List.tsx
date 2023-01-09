import React, { useContext } from 'react';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { FullList, ShortList } from 'components/lists/items';

// MODELS
import { ListVariant, ListWrapperInterface } from 'components/lists/models/sections';

export const List = (props: ListWrapperInterface) => {
	const { lists } = useContext(GlobalContextData);
	const { list, variant, lists: actualList, setLists } = props;

	switch (variant) {
		case ListVariant.PREVIEW:
			if (list) return <ShortList {...list} lists={actualList} setLists={setLists} />;

			return null;
		case ListVariant.FULL:
			return <FullList {...props} lists={lists} actualList={actualList} setLists={setLists} />;
		default:
			return null;
	}
};
