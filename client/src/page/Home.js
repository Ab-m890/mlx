import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//material ui
import { Grid, Box } from '@mui/material'

//component
import Card from '../components/ads/card/Card'


//axios
import { axiosInstance } from '../config'

function Home() {

  const [Ads, setAds] = useState([])

  const getAds = async () => {
    const token = localStorage.getItem('token')
    try {

      const res = await axiosInstance.get("/api/ads/myads", { params: { token } })

      if (res) {
        setAds(res.data.myads)
        console.log(res.data.myads)
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    getAds()

  }, [])


  const displayAds = Ads && Ads.map((ad, key) => {
    return (
      <Card
        key={key}
        id={ad._id}
        title={ad.title}
        price={ad.price}
        currency={ad.currency}
        status={ad.status}
        category={ad.category}
        location={ad.location}
        description={ad.description}
        images={ad.images}
      />
    )
  }) || []

  return (
    <section style={{display: 'flex' , justifyContent: 'center'}}>
      <Box width={{xs: "100%" , md: "90%" }}>

        <Grid
          width="100%"
          container
          rowSpacing={1}
        >
          {displayAds}
        </Grid>

      </Box>
    </section>
  )
}

export default Home
