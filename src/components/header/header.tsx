import { Breadcrumbs } from 'components/breadcrumbs'
import { WrapUser, WrapHeader, RightSide } from './style'
import { ReactComponent as IconUser } from 'assets/icons/user.svg'
import { getUser } from 'utils/getUser'

export const Header = () => {
	const { user } = getUser()

	return (
		<WrapHeader>
			<Breadcrumbs />
			<RightSide>
				<WrapUser>
					<span>{user?.user_id ?? 'User ID'}</span>
					<div className='icon'>
						<IconUser />
					</div>
				</WrapUser>
			</RightSide>
		</WrapHeader>
	)
}
