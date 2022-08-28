import React from 'react'

import { Box, CircularProgress } from '@mui/material'

const LoadingProgress = () => {
    return (
        <Box
            p={2}
            component="div"
            height="calc(100vh - 64px)"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Box>
    )
}

export default LoadingProgress