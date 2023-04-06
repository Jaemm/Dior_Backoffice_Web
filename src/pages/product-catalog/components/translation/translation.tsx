import { Spinner } from 'components/spinner'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from './useTranslation'
import { Button, TextField } from '@mui/material'
import { usePermission } from 'hooks/usePermission'
import { Li, WrapList, WrapButton, Container, WrapSpinner } from './style'

interface ITran {
	type: string
	onNext: (e: number) => void
	title: string
	isLoading: boolean
}

export const Translation = ({ type, onNext, title, isLoading: formLoading }: ITran) => {
	const form = useFormContext()
	const { user, isAdmin } = usePermission()
	const { isLoading, isFetching, allTranslation, setAllTranslation } = useTranslation()

	return (
		<Container>
			<h3>Please input product name translations</h3>
			{isLoading || isFetching ? (
				<WrapSpinner>
					<Spinner center />
				</WrapSpinner>
			) : (
				<WrapList>
					{allTranslation
						?.filter(language => {
							if (type === 'add') {
								return language
							}
							if (user.consultant_country) {
								return user.consultant_country.includes(language.language)
							} else {
								if (user.countries.length > 0) {
									return user.countries.includes(language.language)
								}
								return language
							}
						})
						.map((v: any) => (
							<Li key={v.language}>
								<div>{v.language}:</div>
								<div>
									<label htmlFor={v.language}>Product name</label>
									<TextField
										fullWidth
										variant='filled'
										value={v.value}
										id={v.language}
										name={v.language}
										onChange={(e: any) => {
											const newData: any = allTranslation.map((a: any) => {
												if (e.target.id === a.language) {
													return { ...a, value: e.target.value }
												}
												return a
											})
											setAllTranslation(newData)
											form.setValue(
												'product_translations',
												newData.filter(
													(v: any) => v.value !== '' && v.value !== undefined && v.value !== null,
												),
											)
										}}
										placeholder='Enter product name'
										InputProps={{ disableUnderline: true }}
									/>
								</div>
							</Li>
						))}
				</WrapList>
			)}
			<WrapButton>
				<Button variant='outlined' onClick={() => onNext(isAdmin ? 1 : 0)}>
					Previous
				</Button>
				<Button disabled={formLoading} type='submit'>
					{title}
				</Button>
			</WrapButton>
		</Container>
	)
}
