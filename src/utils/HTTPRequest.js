const get = (url, headers = [], queryString = []) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		// query string generation
		let qs = '?';
		for (let i = 0; i < queryString.length; i++) {
			qs = qs + queryString[i].key + '=' + queryString[i].value;
			if (i !== queryString.length - 1) {
				qs += '&';
			}
		}
		const getRequest =
			!queryString ||
			queryString === undefined ||
			queryString.length === 0
				? ''
				: qs;
		xhr.onload = progressEvent => {
			const { responseText, status } = progressEvent.target;
			if (status >= 200 || status < 400) {
				resolve(responseText);
			} else {
				reject(
					Error('HTTP response status code error: ' + responseText)
				);
			}
		};
		xhr.onerror = () => {
			reject(Error('XMLHttpRequest error!'));
		};
		xhr.open('get', url + getRequest, true);
		for (let i = 0; i < headers.length; i++) {
			xhr.setRequestHeader(headers[i].header, headers[i].value);
		}
		xhr.send();
	});
};

export const getJSON = (url, headers = [], queryString = []) => {
	return new Promise((resolve, reject) => {
		get(url, headers, queryString)
			.then(res => {
				resolve(JSON.parse(res));
			})
			.catch(err => {
				reject(err);
			});
	});
};
