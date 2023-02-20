import { LogOut } from 'components/logout'
import version from '../../../package.json'
import { Ul, Aside, Wrapper } from './style'
import { Link, NavLink } from 'react-router-dom'
import { PERMISSIONS } from 'constants/permissions'
import { usePermission } from 'hooks/usePermission'
import { administratorList, menuList } from 'constants/sidebar'
import { ReactComponent as IconChowisLogo } from 'assets/icons/chowis-logo.svg'
import { ReactComponent as IconSideBarLogo } from 'assets/icons/sidebar-logo.svg'

export const Sidebar = () => {
	const { user } = usePermission()

	return (
		<Aside>
			<Wrapper>
				<Link to='/brand-details'>
					<IconSideBarLogo />
				</Link>
				<Ul>
					<div className='title'>Menu</div>
					{menuList
						.filter(({ permissions }) => permissions.includes(user?.user_type))
						.map(({ Icon, title, path, ActiveIcon }) => (
							<li key={path}>
								<NavLink to={path}>
									{({ isActive }) => (
										<div className={isActive ? 'wrap-link active' : 'wrap-link'}>
											<div className='icon'>{isActive ? <ActiveIcon /> : <Icon />}</div>
											<span>{title}</span>
										</div>
									)}
								</NavLink>
							</li>
						))}
					<li>
						<LogOut />
					</li>
				</Ul>
				{user?.user_type === PERMISSIONS.SUPER_ADMIN ? (
					<Ul>
						<div className='title'>Administrator</div>
						{administratorList.map(({ Icon, title, path, ActiveIcon }) => (
							<li key={path}>
								<NavLink to={path}>
									{({ isActive }) => (
										<div className={isActive ? 'wrap-link active' : 'wrap-link'}>
											<div className='icon'>{isActive ? <ActiveIcon /> : <Icon />}</div>
											<span>{title}</span>
										</div>
									)}
								</NavLink>
							</li>
						))}
					</Ul>
				) : null}
			</Wrapper>
			<footer>
				<IconChowisLogo />
				<span>App version {version.version}</span>
			</footer>
		</Aside>
	)
}
