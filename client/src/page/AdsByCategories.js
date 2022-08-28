import React from 'react'
import { useParams } from 'react-router-dom'

//material ui
import { Grid, Box, Typography } from '@mui/material'

//rect query
import { useQuery } from 'react-query'

//axios
import { axiosInstance } from '../config'

//component
import Card from '../components/ads/card/Card'
import CardPlaceholder from '../components/ads/card/CardPlaceholder'
import Error from '../components/error/Error'
import Empty from '../components/empty/Empty'

const AdsByCategories = () => {

    const { category } = useParams()

    const { isLoading, data, isError, error } = useQuery(['category', category], async () => {
        return await axiosInstance.get(`api/ads/category/${category}`)
    })

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '5px' }}>
                <Box width={{ xs: "100%", md: "90%" }}>
                    <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "21px", md: "28px" }} mt={2} mb={2} ml={1}>Find results for {category}</Typography>
                    <Grid
                        width="100%"
                        container
                        rowSpacing={1}
                    >
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                    </Grid>

                </Box>
            </Box>
        )
    }

    if (isError) {
        return <Error error={error} />
    }

    if (data.data.status === "error") {
        return <Error error={data.data.error} />
    }

    if (data.data.ads.length === 0) {
        return <Empty text="No ads for this category" />
    }

    const displayAds = data.data.ads.map((ad, key) => {
        return (
            <Card
                key={key}
                id={ad._id}
                title={ad.title}
                price={ad.price}
                currency={ad.currency}
                location={ad.location}
                images={ad.images}
                date={ad.createdAt}
            />
        )
    })



    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '5px' }}>
            <Box width={{ xs: "100%", md: "90%" }}>
                <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "21px", md: "28px" }} mt={2} mb={2} ml={1}>Find results for {category}</Typography>
                <Grid
                    width="100%"
                    container
                    rowSpacing={1}
                >
                    {displayAds}
                </Grid>

            </Box>
        </Box>
    )
}

export default AdsByCategories