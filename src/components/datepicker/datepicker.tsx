import dayjs from 'dayjs'
import { WrapButton, Container } from './style'
import DatePicker from 'react-multi-date-picker'
import { DatePickerPropsType } from 'types/datepicker'
import { MutableRefObject, useRef, useState } from 'react'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'

const FORMAT = 'MM/DD/YYYY'

const defaultDate = FORMAT.toLowerCase()

export const Datepicker = ({ dates, setDates }: DatePickerPropsType) => {
	const datePickerRef: MutableRefObject<any> = useRef()
	const [values, setValues] = useState([])

	const handleClick = () => datePickerRef.current.openCalendar()
	const handleChange = (e: any) => {
		const [start, end] = e
		const obj = {
			from: start?.day ? `${start?.year}-${start?.month?.number}-${start?.day}` : undefined,
			to: end?.day ? `${end?.year}-${end?.month?.number}-${end?.day}` : undefined,
		}
		if (setDates) setDates(obj)
		setValues(e)
		if (e.length === 2) {
			setTimeout(() => datePickerRef.current.closeCalendar(), 500)
		}
	}

	return (
		<Container>
			<WrapButton>
				<h6>Start Date</h6>
				<button className='date-button' onClick={handleClick}>
					<div> {dates?.from ? dayjs(dates.from).format('DD/MM/YYYY') : defaultDate} </div>
					<IconDown />
				</button>
			</WrapButton>
			<WrapButton>
				<h6>End Date</h6>
				<button className='date-button' onClick={handleClick}>
					<div>{dates?.to ? dayjs(dates.to).format('DD/MM/YYYY') : defaultDate}</div>
					<IconDown />
				</button>
			</WrapButton>
			<DatePicker
				range
				portal
				value={values}
				format={FORMAT}
				zIndex={10000000}
				numberOfMonths={2}
				ref={datePickerRef}
				onChange={handleChange}
				calendarPosition='bottom-center'
			/>
		</Container>
	)
}
