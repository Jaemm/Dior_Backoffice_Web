import _create, { StateCreator, StoreApi, UseBoundStore } from 'zustand'

const resetters: (() => void)[] = []

export const create = <TState extends unknown>(
	createState: StateCreator<TState> | StoreApi<TState>,
): UseBoundStore<StoreApi<TState>> => {
	const slice: UseBoundStore<StoreApi<TState>> = _create(createState as never)
	const initialState = slice.getState()
	resetters.push(() => {
		slice.setState(initialState, true)
	})

	return slice
}

export const resetAllSlices = () => {
	for (const resetter of resetters) {
		resetter()
	}
}
