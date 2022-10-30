import React, { useContext } from 'react';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { FullList, ShortList } from 'components/lists/items';

// MODELS
import { ListVariant, ListWrapperInterface } from 'components/lists/models/sections';

export const ListWrapper = (props: ListWrapperInterface) => {
	const { lists } = useContext(ListsContextData);
	const { list, variant, type } = props;

	switch (variant) {
		case ListVariant.PREVIEW:
			if (list) return <ShortList {...list} type={type} />;

			return null;
		case ListVariant.FULL:
			return <FullList {...props} lists={lists} />;
		default:
			return null;
	}
};

export const List = (props: ListWrapperInterface) => (
	<ContextProvider>
		<ListWrapper {...props} />
	</ContextProvider>
);
