import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//material ui
import { Box, Grid, TextField, Button, FormControl, Select, InputLabel, MenuItem, CircularProgress } from '@mui/material'
import { Alert, Snackbar, AlertTitle } from '@mui/material'

//axios
import { axiosInstance } from '../config'

//get all cities
import lebanonCities from '../api/lebanon-cities/lb'

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        location: '',
    })

    const cities = lebanonCities

    const [isError, setIsError] = useState(false)

    const [error, setError] = useState('')

    const [requiredText, setRequiredText] = useState('')

    const [isRequired, setIsRequired] = useState('')

    const [isSend, setIsSend] = useState(false)

    const sendDataToDatabase = async () => {
        setIsError(false)
        setIsSend(true)
        try {

            const res = await axiosInstance.post('/api/auth/register', {
                data: formData
            })

            if (res) {
                if (res.data.status === "ok") {

                    window.location = "/"

                } else if (res.data.status === "error") {

                    setIsError(true)
                    setError(res.data.error)

                } else if (res.data.status === "required") {
                    setIsRequired(true)
                    setRequiredText(res.data.requiredText)
                }
            }

        } catch (err) {
            console.log(err)
            setIsError(true)
            setError(err)
        }

        setIsSend(false)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        setIsError(false)
        setIsRequired(false)
        if (
            !(
                formData.name &&
                formData.email &&
                formData.password &&
                formData.phone &&
                formData.location
            )
        ) {
            setIsRequired(true)
            setRequiredText('All Fields Required')
        }
        else {
            setIsRequired(false)
            sendDataToDatabase()
        }
    }

    const displayCities = cities.map((city, i) => {
        return (
            <MenuItem key={i} value={city}>{city}</MenuItem>
        )
    })

    return (
        <section style={{ padding: '20px' }}>
            <Box
                component="form"
                width="100%"
                minHeight="calc(100vh - 64px)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                onSubmit={onSubmitForm}

            >

                <Grid
                    container
                    rowSpacing={{ xs: 2, sm: 3, md: 4 }}
                    maxWidth={600}
                >

                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            name="name"
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData(old => ({ ...old, name: e.target.value }))}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            name="email"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData(old => ({ ...old, email: e.target.value }))}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            name="password"
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={e => setFormData(old => ({ ...old, password: e.target.value }))}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            name="phone"
                            id="phone"
                            type="number"
                            value={formData.phone}
                            onChange={e => setFormData(old => ({ ...old, phone: e.target.value }))}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="categoryLabel">Location</InputLabel>
                            <Select
                                labelId="locationLabel"
                                label="Location"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={(e => setFormData(old => ({ ...old, location: e.target.value })))}
                            >

                                {displayCities}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            {
                                isSend ? <CircularProgress /> :
                                    <Button type="submit" variant="contained">
                                        Register
                                    </Button>
                            }
                            <Link to='/login' style={{ fontSize: '16px' }}>Sign in</Link>
                        </Box>
                    </Grid>

                </Grid>

                {(isError || isRequired) &&
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                        open={isRequired || isError}
                        autoHideDuration={2000}
                        onClose={() => {
                            setIsRequired(false)
                            setIsError(false)
                        }}
                    >
                        <Alert
                            autoHideDuration={2000}
                            onClose={() => {
                                setIsRequired(false)
                                setIsError(false)
                            }}
                            severity='error'
                            sx={{ width: '80%', backgroundColor: 'red', color: 'white', fontWeight: '600' }}>
                            <AlertTitle>
                                Error
                            </AlertTitle>
                            {error || requiredText}
                        </Alert>
                    </Snackbar>}
            </Box>
        </section>
    )
}

export default Register