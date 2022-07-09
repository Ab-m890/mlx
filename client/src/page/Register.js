import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//material ui
import { Box, Grid, TextField, Button } from '@mui/material'
import { Alert , Snackbar , AlertTitle } from '@mui/material'

//axios
import axios from 'axios'
import { axiosInstance } from '../config'

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        location: '',
    })

    const [error, setError] = useState('')

    const sendDataToDatabase = async () => {
        console.log("yes")
        console.log(formData)
        try {

            const res = await axiosInstance.post('/api/auth/register', {
                data: formData
            })

            if(res) {
                if(res.data.status === "ok") {

                    localStorage.setItem('token',res.data.token)
                    navigate('/')
    
                }else if(res.data.status === "error") {
    
                    setError(res.data.error)
    
                }else setError("An Error Occured!")
            }

        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        setError('')
        if (
            !(
                formData.name &&
                formData.email &&
                formData.password &&
                formData.phone &&
                formData.location
            )
        ) setError("All Field Required !")
        else {
            setError('')
            sendDataToDatabase()
        }
    }

    return (
        <section style={{ padding: '20px' }}>
            <Box
                component="form"
                width="100%"
                minHeight="100vh"
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
                        <TextField
                            fullWidth
                            label="Your Location"
                            variant="outlined"
                            name="location"
                            id="location"
                            type="text"
                            value={formData.location}
                            onChange={e => setFormData(old => ({ ...old, location: e.target.value }))}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <Button type="submit" variant="contained">
                            Register
                        </Button>
                    </Grid>

                </Grid>

                {/* {error &&
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                        open={error ? true : false}
                        autoHideDuration={2000}
                        onClose={() => setError('')}
                    >
                        <Alert
                            autoHideDuration={2000}
                            onClose={() => setError('')}
                            severity='error'
                            sx={{ width: '80%', backgroundColor: 'red', color: 'white', fontWeight: '600' }}>
                            <AlertTitle>
                                Error
                            </AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>} */}
            </Box>
        </section>
    )
}

export default Register