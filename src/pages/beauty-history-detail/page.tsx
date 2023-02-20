import { useDetail } from './useDetail'
import { Spinner } from 'components/spinner'
import { HeaderTable } from 'components/header-table'
import { Measurement } from './components/measurement'
import { ResultTable } from './components/result-table'
import { Title, Header, Container, WrapSpinner } from './style'

const BeautyhistoryDetail = () => {
	const {
		resultData,
		customerData,
		moistureData,
		resulteHeader,
		moistureHeader,
		resultIsLoading,
		customerIsLoading,
		moistureIsLoading,
	} = useDetail()

	return (
		<Container>
			{customerIsLoading ? (
				<WrapSpinner>
					<Spinner center />
				</WrapSpinner>
			) : (
				<Header>
					<HeaderTable list={customerData.list1} />
					<HeaderTable list={customerData.list2} />
					<HeaderTable list={customerData.list3} />
				</Header>
			)}
			<Title>Measurement Details</Title>
			<Measurement />
			<Title>Moisture Details</Title>
			<ResultTable header={moistureHeader} isLoading={moistureIsLoading} list={moistureData.data} />
			<Title>Analysis Results</Title>
			<ResultTable header={resulteHeader} isLoading={resultIsLoading} list={resultData.data} />
		</Container>
	)
}

export default BeautyhistoryDetail
