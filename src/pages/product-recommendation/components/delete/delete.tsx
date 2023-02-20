import { useDelete } from './useDelete'
import { Container, WrapList, WrapButtons } from './style'
import { Button, Dialog, IconButton } from '@mui/material'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'

interface IDelete<T> {
	list: T[]
	onClear: () => void
}

export const Delete = <T extends unknown>({ list, onClear }: IDelete<T>) => {
	const { open, toggle, resSeleteData, handleDelete } = useDelete(onClear)

	return (
		<>
			<Button disabled={list.length === 0} onClick={toggle}>
				Delete
			</Button>
			<Dialog
				open={open}
				scroll='body'
				onClose={toggle}
				BackdropProps={{
					style: {
						backdropFilter: 'blur(25px)',
						background: 'rgba(0, 0, 0, 0.5)',
					},
				}}
				PaperProps={{
					style: {
						borderRadius: '20px',
						boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
					},
				}}
				fullWidth
			>
				<Container>
					<IconButton onClick={toggle} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<h3>Are you sure you want to delete the below product recommendations?</h3>
					<WrapList>
						<table>
							<tbody>
								{list.map((v: any) => (
									<tr key={v.id}>
										<td>{v.name}</td>
										<td>-{v.routine}</td>
										<td>-{v.number_of_products}</td>
									</tr>
								))}
							</tbody>
						</table>
					</WrapList>
					<WrapButtons>
						<Button variant='outlined' onClick={toggle}>
							No
						</Button>
						<Button
							disabled={resSeleteData.isLoading}
							onClick={() => handleDelete(list.map((v: any) => v.id))}
						>
							Yes
						</Button>
					</WrapButtons>
				</Container>
			</Dialog>
		</>
	)
}
