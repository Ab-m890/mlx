import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

//convert time to ago
import moment from 'moment'

//material ui 
import { Grid, Card, CardMedia, CardContent, Box, Typography , Button} from '@mui/material'
import { CircularProgress } from '@mui/material'
import { Alert, AlertTitle, Snackbar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'


//axios
import { axiosInstance } from '../../../config'

const MyCard = ({ id, title, price, currency, location, images, date, refetch }) => {

    const timeago = moment(date).fromNow()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [isError, setIsError] = useState(false)

    const [error, setError] = useState('')

    const deleteAd = async () => {
        setIsLoading(true)
        try {

            const res = await axiosInstance.delete(`/api/ads/ad/${id}`)
            if (res.data.status === "ok") {
                refetch()
            } else if (res.data.status === "auth") {
                navigate('/login')
            } else if (res.data.status === "error") {
                setIsError(true)
                setError(res.data.error)
            }

        } catch (error) {
            setIsError(true)
            setError(error.message)
        }
        setIsLoading(false)
    }



    return (
        <Grid item xs={6} md={3} p={1} position="relative">
            {/* <Link to={`/ad/${id}`} style={{ width: '100%', height: '100%', textDecoration: 'none' }}> */}
            <Card variant="outlined" onClick={() => navigate(`/ad/${id}`)}>
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
                    <Typography variant="h6" fontSize="14px" color="rgb(150,150,150)" overflow="hidden" textOverflow="ellipsis" lineHeight="1.8rem" maxHeight="1.8rem">
                        {timeago}
                    </Typography>
                </CardContent>
            </Card>
            <Box sx={{
                width: "100%",
                fontSize: "40px",
                display: "flex",
            }}
            >
                {
                    isLoading ? (
                        <Button variant="contained" color="error" sx={{width: "50%" , margin: 0 , height: {sm: "60px"} , borderRadius: "0px"}}>
                            <CircularProgress color="inherit" sx={{height: "100%" , width: "fit-content"}} />
                        </Button>
                    ) :
                    <Button variant="contained" onClick={() => deleteAd()} startIcon={<DeleteIcon />} color="error" sx={{width: "50%" , margin: 0 , height: {sm: "60px"} , borderRadius: "0px"}}>Delete</Button>
                }
                <Button variant="contained" onClick={() => navigate(`/edit/${id}`)} startIcon={<EditIcon />} sx={{width: "50%" , margin: 0 , height: {sm: "60px"} , borderRadius: "0px"}}>Edit</Button>
            </Box>
            {/* </Link> */}
            {isError &&
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    open={isError}
                    autoHideDuration={2000}
                    onClose={() => {
                        setIsError(false)
                    }}
                >
                    <Alert
                        autoHideDuration={2000}
                        onClose={() => {
                            setIsError(false)
                        }}
                        severity='error'
                        sx={{ width: '80%', backgroundColor: 'red', color: 'white', fontWeight: '600' }}>
                        <AlertTitle>
                            Error
                        </AlertTitle>
                        {error}
                    </Alert>
                </Snackbar>}
        </Grid>
    )
}

export default MyCard