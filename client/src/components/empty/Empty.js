import React from 'react'

import { Box, Typography } from '@mui/material'

const Empty = ({ text }) => {
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
            <Typography variant="h1" fontSize="16px">{text}</Typography>
        </Box>
    )
}

export default Empty