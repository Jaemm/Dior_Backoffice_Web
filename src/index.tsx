import 'swiper/css/bundle'
import { router } from 'routers'
import { theme } from 'config/material'
import { CssBaseline } from '@mui/material'
import { Spinner } from 'components/spinner'
import { Suspense, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import reportWebVitals from './reportWebVitals'
import { queryClient } from 'config/react-query'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './index.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Suspense fallback={<Spinner />}>
					<RouterProvider router={router} />
					<CssBaseline />
					<ToastContainer />
				</Suspense>
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>,
)

reportWebVitals()
