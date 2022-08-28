import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//material ui
import { Grid, Box, Typography } from '@mui/material'

//component
import Card from '../components/ads/card/Card'
import CardPlaceholder from '../components/ads/card/CardPlaceholder'

//react query
import { useQuery } from 'react-query'


//axios
import { axiosInstance } from '../config'

//components
import LoadingProgress from '../components/loading/LoadingProgress'
import Error from '../components/error/Error'
import Empty from '../components/empty/Empty'

//api
import allCategories from '../api/categories/categories'


function Home() {

  const categories = allCategories

  const { isLoading, data, isError, error } = useQuery('all-ads', async () => {
    return await axiosInstance.get("/api/ads/all")
  })

  const displayCategories = categories.map((category, i) => {
    return (
      <Link key={i} to={`/category/${category}`} style={{ minWidth: 'fit-content', borderRadius: '15px', padding: '5px 10px', backgroundColor: 'rgb(235,235,235)', color: 'black' }}>{category}</Link>
    )
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center', marginTop: '5px' }}>

      {/* display all categories */}
      <Box width={{ xs: "100%", md: "90%" }} p={1}>
        <Grid container width="100%">
          <Grid item xs={12}>
            <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "18px", md: "26px" }}>Categories</Typography>
          </Grid>
          <Box minWidth="100%" display="flex" overflow="auto" gap={{ xs: "5px", md: "10px" }} mt={1} pb={1}>
            {
              displayCategories
            }
          </Box>
        </Grid>
      </Box>

      {/* display all ads */}
      <Box width={{ xs: "100%", md: "90%" }} mt={3}>
        <Grid
          width="100%"
          container
          rowSpacing={1}
        >
          <Grid item xs={12} p={1}>
            <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "18px", md: "26px" }}>Ads</Typography>
          </Grid>

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

  if(data.data.status === "error") {
    return <Error error={data.data.error} />
  }

  if (data.data.ads.length === 0) {
    return <Empty text="No Ads Published" />
  }

  const displayAds = (data.data.ads != null && data.data.ads.length > 0) ? data.data.ads.map((ad, key) => {
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
  }) : []

  return (
    <Box sx={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center', marginTop: '5px' }}>

      {/* display all categories */}
      <Box width={{ xs: "100%", md: "90%" }} p={1}>
        <Grid container width="100%">
          <Grid item xs={12}>
            <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "18px", md: "26px" }}>Categories</Typography>
          </Grid>
          <Box minWidth="100%" display="flex" overflow="auto" gap={{ xs: "5px", md: "10px" }} mt={1} pb={1}>
            {
              displayCategories
            }
          </Box>
        </Grid>
      </Box>

      {/* display all ads */}
      <Box width={{ xs: "100%", md: "90%" }} mt={3}>
        <Grid
          width="100%"
          container
          rowSpacing={1}
        >
          <Grid item xs={12} p={1}>
            <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "18px", md: "26px" }}>Ads</Typography>
          </Grid>

          {
            displayAds
          }

        </Grid>
      </Box>
    </Box>
  )
}

export default Home
