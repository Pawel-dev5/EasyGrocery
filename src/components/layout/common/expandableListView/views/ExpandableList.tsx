import React, { useCallback, useEffect, useState } from 'react';
import { LayoutAnimation, Platform, UIManager, View, Text, TouchableOpacity } from 'react-native';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';

// COMPONENTS
import { ExpandableComponent } from 'components/layout/common/expandableListView/sections';
import { Icon } from 'components/layout/common/Icon';

// MODELS
import { ExpandListDataInterface, ExpandableListInterface } from 'components/layout/common/expandableListView/models/views';

// HELPERS
import { convertDataToExpand } from 'components/layout/common/expandableListView/helpers/expandHelpers';

export const ExpandableList = ({ data, bottomSheetHeight, onDragEnd }: ExpandableListInterface) => {
	const [listDataSource, setListDataSource] = useState<ExpandListDataInterface[]>(convertDataToExpand([], data));
	const [multiSelect, setMultiSelect] = useState(true);

	if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);

	useEffect(() => {
		setListDataSource(convertDataToExpand(listDataSource, data));
	}, [data]);

	const updateLayout = (index: number) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		const array = [...listDataSource];
		if (multiSelect) {
			// If multiple select is enabled
			array[index].isExpanded = !array[index].isExpanded;
		} else {
			// If single select is enabled
			array.map((_value, placeindex) => {
				if (placeindex === index) {
					array[placeindex].isExpanded = !array[placeindex].isExpanded;
				} else {
					array[placeindex].isExpanded = false;
				}
				return null;
			});
		}
		setListDataSource(array);
	};

	const toggleAll = (variant: 'expand' | 'collapse') => {
		const newArr: ExpandListDataInterface[] = [];
		listDataSource?.forEach((listItem) => newArr.push({ ...listItem, isExpanded: variant === 'expand' }));
		if (newArr?.length > 0) {
			setMultiSelect(true);
			setListDataSource(newArr);
		}
		return null;
	};

	const isAllExpanded = useCallback(() => {
		const filteretOnlyWithItems = listDataSource?.filter((item) => item?.items?.length > 0);
		const result = filteretOnlyWithItems?.every((obj) => obj?.isExpanded);
		return result;
	}, [listDataSource]);

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingLeft: 16,
					paddingRight: 8,
				}}
			>
				<TouchableOpacity style={{ height: 30, width: 150 }} onPress={() => setMultiSelect(!multiSelect)}>
					<Text>{multiSelect ? 'Single Expand' : 'Multiple Expand'}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}
					onPress={() => (isAllExpanded() ? toggleAll('collapse') : toggleAll('expand'))}
				>
					<Icon name={isAllExpanded() ? 'angle-double-up' : 'angle-double-down'} size={16} />
				</TouchableOpacity>
			</View>

			<DraggableFlatList
				data={listDataSource}
				onDragEnd={({ data: newData }: { data: ExpandListDataInterface[] }) => onDragEnd(newData)}
				style={{
					maxHeight: '100%',
					height: bottomSheetHeight === 1 ? '83%' : '95.5%',
					paddingRight: 16,
					paddingLeft: 16,
				}}
				keyExtractor={(item: ExpandListDataInterface) => item?.category}
				renderItem={({ item, drag, isActive, getIndex }: RenderItemParams<ExpandListDataInterface>) => (
					<OpacityDecorator>
						<ExpandableComponent
							item={item}
							drag={drag}
							isActive={isActive}
							onClickFunction={() => updateLayout(getIndex()!)}
						/>
					</OpacityDecorator>
				)}
			/>
		</View>
	);
};
