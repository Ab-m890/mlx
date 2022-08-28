import React from 'react'

import { Box, Typography } from '@mui/material'

const Error = ({ error }) => {
    return (
        <Box
            p={2}
            component="div"
            width="100%"
            height="calc(100vh - 64px)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="20px"
        >
            <Typography variant="h2" fontSize="12px">Error : {error}</Typography>
        </Box>
    )
}

export default Error