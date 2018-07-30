export function favoriteControl(data, user) {
	const currentValue = () => JSON.parse(localStorage.getItem('favorites'));
	const newUser = value => {
		return {...currentValue(), [user]: value}
	}

	if (!localStorage.getItem('favorites')) {
		localStorage.setItem('favorites', JSON.stringify({ [user]: [] }));
	} else if (!currentValue()[user]) {
		localStorage.setItem('favorites', JSON.stringify(newUser([])));
	}

	const filtered = currentValue()[user].filter(el => el.id !== data.id)
	const result = currentValue()[user].length === filtered.length ?
		filtered.concat([data]) :
		filtered

	localStorage.setItem('favorites', JSON.stringify(newUser(result)));

	return result;
}

export function getFavorites(user) {
	let result;
	if(localStorage.getItem('favorites')) {
		const currentValue = JSON.parse(localStorage.getItem('favorites'));
		currentValue[user] ?
		result = currentValue[user] :
		result = false
	}
	return result
}