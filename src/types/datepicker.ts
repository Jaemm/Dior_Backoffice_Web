import { Dispatch, SetStateAction } from 'react'

export interface DateTypes {
	from?: string | undefined
	to?: string | undefined
}

export interface DatePickerPropsType {
	dates?: DateTypes
	setDates?: Dispatch<SetStateAction<DateTypes>>
}
