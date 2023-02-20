import Chart from 'react-apexcharts'

interface IBar {
	series: { data: number[]; name: string }[]
	categories: string[]
}

export const Bar = ({ series, categories }: IBar) => {
	return (
		<Chart
			options={{
				chart: {
					id: 'basic-bar',
					toolbar: {
						show: false,
					},
				},
				legend: {
					position: 'top',
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					type: 'category',
					categories,
					tickPlacement: 'on',
				},
				plotOptions: {
					bar: {
						columnWidth: '100%',
					},
				},
			}}
			series={series}
			type='bar'
			height='400vh'
		/>
	)
}
