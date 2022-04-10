import { Box, BoxProps, CircularProgress } from '@material-ui/core'
import React, { ReactNode } from 'react'

import { Header } from './Header'
import { SectionHeader } from './SectionHeader'
import { Sidebar } from './Sidebar'

export interface LayoutProps extends Omit<BoxProps, 'title'> {
  title: ReactNode
  loading?: boolean
}

export function Layout({ title, children, loading, ...rest }: LayoutProps) {
  return (
    <Box display="flex" height="100%" {...rest}>
      <Box>
        <Sidebar />
      </Box>
      <Box flexGrow="1" bgcolor="white" overflow="auto" display="flex" flexDirection="column">
        <Header />
        <Box padding={2} flexGrow={1} display="flex" flexDirection="column">
          <SectionHeader title={title} />
          {!loading ? (
            children
          ) : (
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
