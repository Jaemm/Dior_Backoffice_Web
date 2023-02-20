import { Suspense } from 'react'
import { Header } from 'components/header'
import { Sidebar } from 'components/sidebar'
import { Spinner } from 'components/spinner'
import { PageContainer, Content, Container } from './style'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { usePermission } from 'hooks/usePermission'

const PrivateRouter = () => {
	const location = useLocation()
	const { user } = usePermission()

	if (!user?.token || location.pathname === '/') {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return (
		<Container>
			<Sidebar />
			<PageContainer>
				<Header />
				<Content>
					<Suspense fallback={<Spinner center />}>
						<Outlet />
					</Suspense>
				</Content>
			</PageContainer>
		</Container>
	)
}

export default PrivateRouter
