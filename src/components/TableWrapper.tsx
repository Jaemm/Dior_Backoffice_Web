import {
  Collapse,
  LinearProgress,
  Paper,
  TableContainer,
  TableContainerProps,
} from '@material-ui/core'
import React from 'react'

interface TableWrapperProps extends TableContainerProps {
  isLoading?: boolean
}

export function TableWrapper({ isLoading = false, children, ...props }: TableWrapperProps) {
  return (
    <TableContainer component={Paper} style={{ position: 'relative' }} {...props}>
      <Collapse
        in={isLoading}
        style={{ position: 'absolute', left: 0, top: 0, right: 0, zIndex: 2 }}
      >
        <LinearProgress />
      </Collapse>
      {children}
    </TableContainer>
  )
}
