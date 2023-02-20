export const getUser = () => {
	const local = JSON.parse(localStorage.getItem('user') as string)

	if (local?.token) {
		return { user: local }
	}

	return { user: JSON.parse(sessionStorage.getItem('user') as string) }
}
