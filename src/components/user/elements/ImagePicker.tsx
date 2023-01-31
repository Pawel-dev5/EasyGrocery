import React, { useState } from 'react';
import { Button, Image, View, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
// const ImagePicker = require('react-native-image-picker');
// import Permissions, { usePermissions } from 'expo-permissions';

export const ImagePickerComponent = ({ setFile }: { setFile: any }) => {
	const [image, setImage] = useState<null | string>(null);

	const pickImage = async () => {
		const options: any = { mediaType: 'photo' };
		const callback = (assets: any) => {
			console.log(assets);
		};
		// const { granted } = await Permissions.askAsync(Permissions.CAMERA);
		// if (granted) {
		// 	console.log('access granted');
		// 	const data = await ImagePicker.launchImageLibraryAsync({
		// 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		// 		allowsEditing: true,
		// 		aspect: [1, 1],
		// 		quality: 0.5,
		// 	});
		// 	console.log(data);
		// }
		// 	if (!data.cancelled){
		// 	setImage(data.uri);
		//   }
		// await ImagePicker.launchImageLibrary(options, callback);
		// const result = await ImagePicker.launchImageLibrary({ noData: true }, (response) => {
		// 	console.log(response);
		// 	// if (response) {
		// 	//   setPhoto(response);
		// 	// }
		// });

		// ImagePicker?.launchImageLibrary(options, callback);

		// You can also use as a promise without 'callback':
		// const result = await ImagePicker?.launchImageLibrary(options);

		// const result = await ImagePicker.launchImageLibrary(options);
		// No permissions request is necessary for launching the image library
		// try {
		// 	const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
		// 		title: 'Cool Photo App Camera Permission',
		// 		message: 'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
		// 		buttonNeutral: 'Ask Me Later',
		// 		buttonNegative: 'Cancel',
		// 		buttonPositive: 'OK',
		// 	});
		// 	if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		// 		console.log('You can use the camera');

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 2,
			base64: true,
			// allowsEditing: true,
		});

		console.log(result);

		if (!result.canceled) {
			setFile(result.assets);
			setImage(result.assets[0].uri);
		}
		// 	} else {
		// 		console.log('Camera permission denied');
		// 	}
		// } catch (err) {
		// 	console.warn(err);
		// }
	};

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button title="Pick an image from camera roll" onPress={pickImage} />
			{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
		</View>
	);
};
