import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

//material ui
import { Grid, Box, Typography } from '@mui/material'

//component
import MyCard from '../components/ads/card/MyCard'
import Card from '../components/ads/card/Card'
import CardPlaceholder from '../components/ads/card/CardPlaceholder'
import Error from '../components/error/Error'
import Empty from '../components/empty/Empty'


//axios
import { axiosInstance } from '../config'

// react query
import { useQuery } from 'react-query'

const MyAds = () => {

  const navigate = useNavigate()

  const getMyAds = useQuery('myads', async () => {
    return await axiosInstance.get(`/api/ads/myads`)
  })

  if (getMyAds.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        <Box width={{ xs: "100%", md: "90%" }}>
          <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "21px", md: "28px" }} mt={2} mb={2} ml={1}>My Ads</Typography>
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

  if (getMyAds.isError) {
    return <Error error={getMyAds.error} />
  }

  if (getMyAds.data.data.status === "error") {
    return <Error error={getMyAds.data.data.error} />
  }

  if (getMyAds.data.data.status === "auth") {
    return navigate('/login')
  }

  if (getMyAds.data.data.myads.length === 0) {
    return <Empty
      text={
        <Link to="/post-ad">
          You are not publish any ad ! , click here to publish a new ad
        </Link>
      }

    />
  }

  const myads = getMyAds.data.data.myads

  const displayAds = myads.map((ad, key) => {
    return (
      <MyCard
        key={key}
        id={ad._id}
        title={ad.title}
        price={ad.price}
        currency={ad.currency}
        location={ad.location}
        images={ad.images}
        date={ad.createdAt}
        refetch={getMyAds.refetch}
      />
    )
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
      <Box width={{ xs: "100%", md: "90%" }}>
        <Typography variant="h1" fontWeight="bold" fontSize={{ xs: "21px", md: "28px" }} mt={2} mb={2} ml={1}>My Ads</Typography>
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

export default MyAds
