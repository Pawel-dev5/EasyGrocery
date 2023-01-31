export const getBlobFromUri = async (uri: string) => {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		console.log(xhr);
		xhr.onload = function () {
			resolve(xhr.response);
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		xhr.onerror = function (e) {
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	return blob;
};
