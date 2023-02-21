import { request } from 'api/request'

export const productRecommendations = <T>(params: T) =>
	request('api/dior/product_recommendation_groups', {
		params,
	})

export const recProductions = <T>(params: T) =>
	request('api/pmx/product_recommendations', { params })

export const addRecommendations = <T>(data: T) =>
	request.post('api/dior/product_recommendation_groups', { ...data, locations: [] })

export const editRecommendations = <T>(data: T, id?: string) =>
	request.put(`api/dior/product_recommendation_groups/${id}`, { ...data, locations: [] })
