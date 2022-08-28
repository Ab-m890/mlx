import React from 'react'
import { useParams } from 'react-router-dom'

//material ui
import { Grid, Box, Typography, Skeleton } from '@mui/material'

//component
import Card from '../components/ads/card/Card'
import CardPlaceholder from '../components/ads/card/CardPlaceholder'
import Error from '../components/error/Error'

//axios
import { axiosInstance } from '../config'

//react query
import { useQuery } from 'react-query'

const UserProfile = () => {

    const { id } = useParams()

    const { isLoading, data, isError, error } = useQuery(['user', id], async () => {
        return await axiosInstance.get(`/api/ads/user/${id}`)
    })

    if (isLoading) {
        return (
            <Box
                component="section"
                sx={{
                    width: '100%',
                    p: {xs: 1 , sm: 2},
                }}
            >
                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: '100px', sm: '150px', md: '200px', lg: '250px' },
                            height: { xs: '100px', sm: '150px', md: '200px', lg: '250px' },
                        }}
                    >
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%'
                            }} />
                    </Box>
                    <Box
                        sx={{
                            display: 'block',
                            ml: 1
                        }}
                    >
                        <Skeleton width="150px" />
                        <Skeleton width="100px" />
                        <Skeleton width="120px" />
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        mt: 3
                    }}
                >

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

    const { ads } = data.data

    const { name, phone , location , profileImg} = data.data.user

    const displayAds = ads.length > 0 ? ads.map((ad, key) => {
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
    }) : 'User not publish any ad'

    return (
        <Box
            component="section"
            sx={{
                width: '100%',
                p: {xs: 1 , sm: 2},
            }}
        >
            <Box
                component="div"
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100px', sm: '150px', md: '200px', lg: '250px' },
                        height: { xs: '100px', sm: '150px', md: '200px', lg: '250px' },
                    }}
                >
                    <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={profileImg} alt="User Image" />
                </Box>
                <Box
                    sx={{
                        display: 'block',
                        ml: 1
                    }}
                >
                    <Typography fontSize={{ xs: '16px', sm: '20px', md: '24px', lg: '28px' }}>{name}</Typography>
                    <Typography fontSize={{ xs: '12px', sm: '16px', md: '20px', lg: '24px' }}>{phone}</Typography>
                    {/* <Typography fontSize={{ xs: '12px', sm: '16px', md: '20px', lg: '24px' }} mt={1}>{location}</Typography> */}
                </Box>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    mt: 3
                }}
            >

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

export default UserProfile