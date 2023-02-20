import { request } from 'api/request'

interface IDate {
	to: string
	from: string
}

export const getStatisticsOverall = () => request('api/dior/statistics/overall')
export const getMostPopularProducts = () => request('api/dior/statistics/most_popular_products')
export const getPerCountry = ({ to, from }: IDate) =>
	request(`api/dior/statistics/overall_per_country?from=${from}&to=${to}&type=weekly`)

export const getPerDate = ({ to, from }: IDate) =>
	request(`api/dior/statistics/overall_by_date?from=${from}&to=${to}&type=weekly`)

export const getStatisticsType = ({ type }: { type: string }) =>
	request(`/api/dior/statistics/overall_details?type=${type}`)
