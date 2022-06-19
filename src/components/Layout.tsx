import { Box, BoxProps, CircularProgress } from '@material-ui/core'
import React, { ReactNode } from 'react'

import { Header } from './Header'
import { SectionHeader } from './SectionHeader'
import { Sidebar } from './Sidebar'

export interface LayoutProps extends Omit<BoxProps, 'title'> {
  title: ReactNode
  loading?: boolean
  disableLayout?: boolean
}

export function Layout({ title, children, loading, disableLayout, ...rest }: LayoutProps) {
  return (
    <Box display="flex" height="100%" {...rest} style={{backgroundColor: '#F2F2F2'}}>
      <Box>
        <Sidebar />
      </Box>
      <Box flexGrow="1" overflow="auto" display="flex" flexDirection="column">
        <Header title={title}/>
        {!disableLayout ?
          <Box padding={2} flexGrow={1} display="flex" flexDirection="column">
            {!loading ? (
              <div style={{padding: '20px', backgroundColor: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', borderRadius:'20px'}}>
                {children}
              </div>
            ) : (
              <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center" style={{backgroundColor: 'white'}}>
                <CircularProgress />
              </Box>
            )}
          </Box>
        : <>
          {children}
        </>
        }
      </Box>
    </Box>
  )
}
