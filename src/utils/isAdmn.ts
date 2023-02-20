export const isAdmin = (id?: number, type?: 'string' | 'boolean') => {
	if (type === 'string') {
		return id === 5 ? 'Yes' : 'No'
	}
	return id === 5
}
