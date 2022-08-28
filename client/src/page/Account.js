import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//material ui
import { Box, Skeleton, Typography, Button , Snackbar , Alert , AlertTitle , CircularProgress} from '@mui/material'

//axios
import { axiosInstance } from '../config'

//react query
import { useQuery } from 'react-query'

//component
import Error from '../components/error/Error'


const Account = () => {

    const [err, setError] = useState(false)
    const [iserror, setIsError] = useState(false)

    const [isSend , setIsSend] = useState(false)

    const { isLoading, data, isError, error } = useQuery('account', async () => {
        return await axiosInstance.get('/api/auth/account')
    })

    if (isLoading) {
        return (
            <Box
                component="section"
                sx={{
                    width: '100%',
                    p: { xs: 1, sm: 2 },
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
                        <Skeleton width="100px" />
                        <Skeleton width="150px" />
                    </Box>
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

    if (data.data.status === "auth") {
        return (
            <Box
                component="section"
                sx={{
                    width: '100%',
                    p: { xs: 1, sm: 2 },
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
                        <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src="/images/default.png" alt="User Image" />
                    </Box>
                    <Box
                        sx={{
                            display: 'block',
                            ml: 1
                        }}
                    >
                        <Typography fontWeight="bold" fontSize={{ xs: '16px', sm: '20px', md: '24px', lg: '28px' }}>Log in</Typography>
                        <Typography fontWeight="bold" fontSize={{ xs: '12px', sm: '16px', md: '20px', lg: '24px' }}>
                            <Link style={{ fontSize: "inherit", textDecoration: "underline" }} to="/login">Login to your account</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )
    }

    const { name, profileImg } = data.data.account

    const logout = async () => {
        setIsSend(true)
        try {
            const res = await axiosInstance.post('/api/auth/logout')
            if (res.data.status === "error") {
                setIsError(true)
                setError(res.data.error)
            } else if (res.data.status === "ok") window.location = "/"
        } catch (error) {
            setIsError(true)
            setError(error.message)
        }
        setIsSend(false)
    }

    return (
        <Box
            component="section"
            sx={{
                width: '100%',
                p: { xs: 1, sm: 2 },
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
                    <Typography fontWeight="bold" fontSize={{ xs: '16px', sm: '20px', md: '24px', lg: '28px' }}>{name}</Typography>
                    <Typography fontWeight="bold" fontSize={{ xs: '12px', sm: '16px', md: '20px', lg: '24px' }}>
                        <Link style={{ fontSize: "inherit", textDecoration: "underline" }} to="/account/edit">View and edit profile</Link>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{mt: 4}}>
                {
                    isSend ? 
                    <CircularProgress /> :
                    <Button variant="contained" color="error" onClick={() => logout()}>Logout</Button>
                }
            </Box>
            {
                iserror &&
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    open={iserror}
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
                        {err}
                    </Alert>
                </Snackbar>
                }
        </Box>
    )
}

export default Account