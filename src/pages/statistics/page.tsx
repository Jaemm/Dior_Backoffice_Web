import { Wrap, Container } from './style'
import { Graph } from './components/graph'
import { TotalList } from './components/total-list'
import { ListImages } from './components/list-images'
import { Title } from '../../components/statistics-title'

const Statistics = () => {
	return (
		<Container>
			<Wrap>
				<TotalList />
				<Graph />
				<Title title='MOST POPULAR PRODUCTS' text='The best seller' />
				<ListImages />
			</Wrap>
		</Container>
	)
}

export default Statistics
