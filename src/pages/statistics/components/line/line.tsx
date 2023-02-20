import Chart from 'react-apexcharts'

interface ILine {
	series: { name: string; data: number[] }[]
	categories: string[]
}

export const Line = ({ series, categories }: ILine) => {
	return (
		<Chart
			options={{
				chart: {
					type: 'line',
					id: 'areachart-2',
					toolbar: {
						show: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				legend: {
					position: 'top',
				},
				xaxis: {
					type: 'category',
					categories,
				},
			}}
			type='line'
			height='400vh'
			series={series}
		/>
	)
}
