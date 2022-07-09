import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//material ui
import { Grid, Box, Typography } from '@mui/material'

//swiper js
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

//swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

//axios'
import { axiosInstance } from '../config'

const AdDetails = () => {

    const navigate = useNavigate()

    const [ad, setAd] = useState({})

    const params = useParams()

    const getAd = async () => {
        try {
            const res = await axiosInstance.get(`/api/ads/ad/${params.id}`)

            if (res) {
                setAd(res.data)
                console.log(res.data)
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        getAd()

    }, [])

    const deletProduct = async () => {
        const token = localStorage.getItem('token')
        try {
            const res = await axiosInstance.delete(`/api/ads/ad/${params.id}`, { data: { token } })

            if (res) {
                if (res.data.status === "ok") {
                    console.log("Delete success : " + res.data)
                    navigate("/")
                } else if (res.data.status === "error") {
                    console.log(res.data.error)
                }
            }

        } catch (err) {
            console.log("Error : " + err)
        }
    }

    const displayImages = ad.images?.length && ad.images.map((src, i) => {
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
                    <img src={src} style={{ maxWidth: "100%", height: '100%' }} />
                </Box>
            </SwiperSlide>
        )
    }) || []

    return (
        <section style={{ backgroundColor: 'rgb(200,200,200)', width: '100%' }}>
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

            <Box
                width="100%"
                p={{ xs: 2, md: 3, lg: 4 }}
                backgroundColor="white"
                mt={1}
            >
                <Grid container width="100%" maxWidth="100%">
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" fontSize={{ xs: "18px" , md:"26px" , lg: "32px" }}>
                            {ad.currency} {ad.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mt={1} fontSize={{ xs: "18px" , md:"26px" , lg: "32px" }}>
                        <Typography variant="h6" fontWeight="400" color="rgb(50,50,50)">
                            {ad.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mt={1} borderTop="0.5px solid rgb(220,220,220)" display="flex" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="400" color="rgb(100,100,100)" fontSize="12px" pt={1}>
                            {ad.location}
                        </Typography>
                        <Typography variant="h6" fontWeight="400" color="rgb(100,100,100)" fontSize="12px" pt={1}>
                            {ad.createdAt}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

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
                        <Typography variant="h5" fontWeight="bold" fontSize={{ xs: "18px" , md:"26px" , lg: "32px" }}>
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
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    Price
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    {ad.price}
                                </Typography>
                            </Grid>

                            {/* currency */}
                            <Grid item xs={6}>
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    Currency
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    {ad.currency}
                                </Typography>
                            </Grid>

                            {/* category */}
                            <Grid item xs={6}>
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    Category
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }} overfolw="hidden" textOverflow="ellipsis" lineHeight="1rem" height="1rem">
                                    {ad.category}
                                </Typography>
                            </Grid>

                            {/* status */}
                            <Grid item xs={6}>
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    Status
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                                    {ad.status}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>

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
                        <Typography variant="h5" fontWeight="bold" fontSize={{ xs: "18px" , md:"26px" , lg: "32px" }}>
                            Description
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                    >
                        <Typography variant="h6" mt={2} fontSize={{ xs: "14px", md: "22px", lg: "28px" }}>
                            {ad.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

        </section>
    )
}

export default AdDetails
