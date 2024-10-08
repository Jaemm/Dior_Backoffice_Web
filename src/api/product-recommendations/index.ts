import { request } from 'api/request'

export const productRecommendations = <T>(params: T) =>
	request('dior/product_recommendation_groups', {
		params,
	})

export const getProductFormRecommendations = <T>(params: T) =>
	request('dior/product_recommendation_groups/list', {
		params,
	})

export const getProductFormRecommendation = (id: string) =>
	request(`dior/product_recommendation_groups/get_products/${id}`)

export const recProductions = <T>(params: T) => request('pmx/product_recommendations', { params })

export const addRecommendations = <T>(data: T) =>
	request.post('dior/product_recommendation_groups', { ...data, locations: [] })

export const editRecommendations = <T>(data: T, id?: string) =>
	request.put(`dior/product_recommendation_groups/${id}`, { ...data, locations: [] })
