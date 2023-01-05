import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

// COMPONENTS
import { Input } from 'components/layout/common';

// MODELS
import { SearchInterface } from 'components/layout/models/common';

// STYLES
import { StyledPopperWrapper } from 'components/layout/elements/Styles';

export const Search = ({ name, placeholder, textContentType, setSearchIcons, results }: SearchInterface) => {
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		if (results?.length > 0) {
			setShowMore(true);
		} else {
			setShowMore(false);
		}
		console.log(results);
	}, [results]);
	return (
		<>
			<Input
				name={name}
				placeholder={placeholder}
				textContentType={textContentType}
				onChange={(e) => setSearchIcons(e as unknown as string)}
			/>

			{showMore && (
				<View>
					{results?.map((user: any) => (
						<Text>{user?.username}</Text>
					))}
				</View>
			)}
		</>
	);
};
