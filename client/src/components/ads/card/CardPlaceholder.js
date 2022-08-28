import React from 'react'

//material ui 
import { Box, Grid, Skeleton } from '@mui/material'

const CardPlaceholder = () => {

    return (
        <Grid item xs={6} md={3} p={1} >
            <Box sx={{
                width: '100%',
                height: '100%',
            }}
            >
                <Skeleton variant="rectangular" sx={{
                    width: '100%',
                    height: '170px'
                }}/>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        </Grid>
    )
}

export default CardPlaceholder