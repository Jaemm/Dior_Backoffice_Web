import { Box } from '@material-ui/core'
import React, { ReactNode } from 'react'

interface SectionHeaderProps {
  title: ReactNode
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Box padding={2} bgcolor="#e6e6e6" borderRadius="3px" marginBottom={2}>
      {title}
    </Box>
  )
}
