import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

//material ui
import { Grid, Box, Typography } from '@mui/material'
import CallIcon from '@mui/icons-material/Call'

//swiper js
import { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

//swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

//react query
import { useQuery } from 'react-query'

//axios'
import { axiosInstance } from '../config'

//components
import LoadingProgress from '../components/loading/LoadingProgress'
import Error from '../components/error/Error'

//moment ago
import moment from 'moment'

const AdDetails = () => {

    const params = useParams()

    const [id, setId] = useState(params.id)

    const { isLoading, data, isError, error } = useQuery(['ad', id], async () => {
        return await axiosInstance.get(`/api/ads/ad/${id}`)
    })

    if (isLoading) {

        return <LoadingProgress />

    }

    if (isError) {

        return <Error error={error} />

    }

    if (data.data.status === "error") {

        return <Error error={data.data.error} />

    }

    const { title, price, images, currency, status, description, phone, createdAt, location, category } = data.data.ad

    const owner = data.data.owner

    const timeago = moment(createdAt).fromNow()

    const displayImages = images.map((image, i) => {

        return (
            <SwiperSlide
                key={i}
            >
                <Box
                    width="100%"
                    height={{ xs: '200px', md: '300px', xl: '400px' }}
                    display="flex"
                    justifyContent="center"
                >
                    <img src={image} style={{ maxWidth: "100%", height: '100%' , backgroundColor: "white"}} />
                </Box>
            </SwiperSlide>
        )
    })

    return (
        <Box sx={{
            backgroundColor: 'rgb(200,200,200)',
            width: '100%',
            height: '100%'
        }}
        >

            {/* images */}
            <Box width="100%" backgroundColor="black">
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {displayImages}
                </Swiper>
            </Box>

            {/* main details */}
            <Box
                width="100%"
                p={{ xs: 2, md: 3, lg: 4 }}
                backgroundColor="white"
                mt={1}
            >
                <Grid container width="100%" maxWidth="100%">
                    <Grid item xs={12}>
                        <Box
                            component="a"
                            href={`/user/${owner._id}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                                borderRadius: '4px'
                            }}>
                            <Box
                                sx={{
                                    width: { xs: '50px', md: '75px', lg: '100px' },
                                    height: { xs: '50px', md: '75px', lg: '100px' }
                                }}
                            >
                                <img src={owner.profileImg} style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="User profile" />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'center',
                                ml: 1
                            }}>
                                <Typography variant="h5" fontWeight="bold" color="inherit" width="100%" fontSize={{ xs: '14px', sm: '16px', md: "18px", lg: "20px" }}>
                                    {owner.name}
                                </Typography>
                                <Typography variant="h5" width="100%" color="red" fontSize={{ xs: '10px', sm: '12px', md: "14px", lg: "16px" }}>
                                    See user profile
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" fontSize={{ xs: "18px", md: "26px", lg: "32px" }}>
                            {currency} {price}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mt={1} fontSize={{ xs: "18px", md: "26px", lg: "32px" }}>
                        <Typography variant="h6" fontWeight="400" color="rgb(50,50,50)">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mt={1} borderTop="0.5px solid rgb(220,220,220)" display="flex" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="400" color="rgb(100,100,100)" fontSize="12px" pt={1}>
                            {location}
                        </Typography>
                        <Typography variant="h6" fontWeight="400" color="rgb(100,100,100)" fontSize="12px" pt={1}>
                            {timeago}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Details */}
            <Box
                p={{ xs: 2, md: 3, lg: 4 }}
                mt={1}
                backgroundColor="white"
            >
                <Grid
                    container
                    width="100%"
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography variant="h5" fontWeight="bold" fontSize={{ xs: "18px", md: "26px", lg: "32px" }}>
                            Details
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                    >
                        <Grid
                            container
                            width="100%">
                            {/* price */}
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}>
                                    Price
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}>
                                    {price}
                                </Typography>
                            </Grid>

                            {/* currency */}
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}>
                                    Currency
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}>
                                    {currency}
                                </Typography>
                            </Grid>

                            {/* category */}
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}>
                                    Category
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" },
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        lineHeight: { md: "1rem", lg: "1.5rem" },
                                        height: { md: "1rem", lg: "1.5rem" }
                                    }}
                                >
                                    {category}
                                </Typography>
                            </Grid>

                            {/* status */}
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}
                                    mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    Status
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}
                                    mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    {status}
                                </Typography>
                            </Grid>

                            {/* phone */}
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}
                                    mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    phone
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        fontSize: { xs: "14px", md: "22px", lg: "28px" }
                                    }}
                                    mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    {phone}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            {/* description  */}
            <Box
                sx={{
                    p: { xs: 2, md: 3, lg: 4 },
                    mt: 1,
                    backgroundColor: '#fff'
                }}
            >
                <Grid
                    container
                    width="100%"
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: "18px", md: "26px", lg: "32px" }
                            }}>
                            Description
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                    >
                        <Typography variant="h6"
                            sx={{
                                mt: 2,
                                fontSize: { xs: "14px", md: "22px", lg: "28px" }
                            }}>
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* phone */}
            <Box
                sx={{
                    p: 1,
                    width: '50px',
                    height: '50px',
                    position: 'fixed',
                    bottom: '66px',
                    right: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'rgb(30,30,30)'
                }}
            >
                <a style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }} href={`tel:${phone}`}>
                    <CallIcon />
                </a>
            </Box>

        </Box>
    )
}

export default AdDetails
