import React from 'react'

import { Link } from 'react-router-dom'

//convert time to ago
import moment from 'moment'

//material ui 
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material'

//material ui icons
import { Icon } from '@mui/material'

const CardAd = ({ id, title, price, currency, location, images, date }) => {

    const timeago = moment(date).fromNow()

    return (
        <Grid item xs={6} md={3} p={1} >
            <Link to={`/ad/${id}`} style={{ width: '100%', height: '100%', textDecoration: 'none' }}>
                <Card variant="outlined">
                    <CardMedia
                        component="img"
                        image={images[0]}
                        alt="Ad image"
                        height="170"
                    ></CardMedia>

                    <CardContent>
                        <Typography variant="h6" fontSize="14px" color="rgb(80,80,80)" fontWeight="bold" overflow="hidden" textOverflow="ellipsis" lineHeight="1.8rem" height="1.8rem" >
                            {title}
                        </Typography>
                        <Typography variant="h6" fontSize="14px" fontWeight="bold">{currency} {price}</Typography>
                        <Typography variant="h6" fontSize="14px" color="rgb(150,150,150)" overflow="hidden" textOverflow="ellipsis" lineHeight="1.8rem" height="1.8rem" mt="5px">
                            {location}
                        </Typography>
                        <Typography variant="h6" fontSize="14px" color="rgb(150,150,150)" overflow="hidden" textOverflow="ellipsis" lineHeight="1.8rem" height="1.8rem">
                            {timeago}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}

export default CardAd