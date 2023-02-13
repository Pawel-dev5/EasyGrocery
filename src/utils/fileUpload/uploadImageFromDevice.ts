// import * as ImagePicker from 'expo-image-picker';
import { hasMediaLibraryPermissionGranted } from 'utils/fileUpload/hasMediaLibraryPermissionGranted';

export const uploadImageFromDevice = async () => {
	let img = null;
	const storagePermissionGranted = await hasMediaLibraryPermissionGranted();

	// Discard execution when  media library permission denied
	if (!storagePermissionGranted) return null;

	// const result = await ImagePicker.launchImageLibraryAsync({
	// 	mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 	allowsEditing: true,
	// 	aspect: [4, 4],
	// 	quality: 1,
	// 	base64: true,
	// });

	// if (!result.canceled) {
	// 	img = result;
	// }

	return img;
};
