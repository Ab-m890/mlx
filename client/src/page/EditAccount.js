import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

//formik
import { Formik, Form, Field, ErrorMessage } from 'formik'

//firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//mui
import { Typography, Box, Grid, Alert, AlertTitle, Snackbar, Button } from '@mui/material'
import { CircularProgress } from '@mui/material'

//axios
import { axiosInstance } from '../config'

//api cities
import lebanonCities from '../api/lebanon-cities/lb'

//components
import LoadingProgress from '../components/loading/LoadingProgress'
import Error from '../components/error/Error'

const EditAccount = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        profileImg: '/images/default.png',
    })

    const [imageUpload, setImageUpload] = useState('')

    const [isUpload, setIsUpload] = useState(false)

    const [isSend, setIsSend] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    const [iserror, setIserror] = useState(false)
    const [err, seterror] = useState('')

    const [isRequired, setIsRequired] = useState(false)
    const [requiredText, setRequiredText] = useState('')

    const cities = lebanonCities

    const getMyAccount = async () => {
        setIsLoading(true)
        try {
            const res = await axiosInstance.get('/api/auth/account')
            if (res.data.status === 'auth') {
                navigate('/account')
            } else if (res.data.status === 'error') {
                setIsError(true)
                setError(res.data.error)
            } else {
                setFormData(res.data.account)
            }
        } catch (error) {
            setIsError(true)
            setError(error.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getMyAccount()
    }, [])

    const uploadImageToStorage = () => {
        const storage = getStorage();

        setIsUpload(true)

        const imageName = `mlx-profile-image-${formData._id}-${Date.now()}`
        const storageRef = ref(storage, `images/mlx/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, imageUpload);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                setIserror(true)
                seterror(error)
                setIsUpload(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL)
                    setFormData(old => ({ ...old, profileImg: downloadURL }))
                    setIsUpload(false)
                });
            }
        )
    }

    useEffect(() => {
        imageUpload && uploadImageToStorage()
    }, [imageUpload])

    if (isLoading) {
        return <LoadingProgress />
    }

    if (isError) {
        return <Error error={error} />
    }

    const sendDataToDatabase = async (values) => {

        setIsSend(true)

        try {
            const res = await axiosInstance.put(`/api/auth/account`, {

                data: {
                    name: values.name,
                    phone: values.phone,
                    location: values.location,
                    profileImg: formData.profileImg
                }

            })

            if (res.data.status === "ok") {
                navigate(`/account`)

            } else if (res.data.status === "error") {
                setIserror(true)
                seterror(res.data.error)
            } else if (res.data.status === "auth") {
                navigate('/login')
            } else if (res.data.status === "required") {
                setIsRequired(true)
                setRequiredText(res.data.requiredText)
            }
        } catch (error) {
            setIserror(true)
            seterror(error.message)
        }

        setIsSend(false)
    }

    const validate = values => {
        let error = {}

        if (!values.name) {
            error.name = "Enter your name"
        }

        if (!values.phone) {
            error.phone = "Enter your phone number"
        }

        if (!values.location) {
            error.location = "Select your location"
        }

        return error
    }

    const onSubmitForm = (values) => {
        sendDataToDatabase(values)
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
                    <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={formData.profileImg} alt="User Image" />
                </Box>
                <Box
                    sx={{
                        display: 'block',
                        ml: 1
                    }}
                >
                    {
                        isUpload ?
                            <Box display="flex" alignItems="center" gap="5px">
                                <CircularProgress />
                                <Typography fontSize="1rem" >Uploading images ...</Typography>
                            </Box> :
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setImageUpload(e.target.files[0])
                                }}
                            />
                    }
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Formik
                    initialValues={formData}
                    validate={validate}
                    onSubmit={onSubmitForm}
                >
                    <Form>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="start"
                        >
                            <Grid
                                maxWidth={600}
                                container
                                rowSpacing={{ xs: 2, sm: 3, md: 4 }}
                            >
                                {/* email */}
                                <Grid item xs={12}>
                                    <Typography color="primary" fontSize="1rem">Email</Typography>
                                    <Typography fontSize="1rem">{formData.email}</Typography>
                                </Grid>

                                {/* my name */}
                                <Grid item xs={12}>
                                    <Typography color="primary" fontSize="1rem">Name</Typography>
                                    <Field
                                        name="name"
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "4px",
                                            outline: "none",
                                            border: "1px solid rgb(200,200,200)",
                                            padding: "10px",
                                            fontSize: "1rem"
                                        }}
                                    />
                                    <ErrorMessage name="name">
                                        {
                                            error => {
                                                return <Typography fontSize="1rem" color="error">{error}</Typography>
                                            }
                                        }
                                    </ErrorMessage>
                                </Grid>

                                {/* phone */}
                                <Grid item xs={12}>
                                    <Typography color="primary" fontSize="1rem">Phone</Typography>
                                    <Field
                                        type="number"
                                        name="phone"
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "4px",
                                            outline: "none",
                                            border: "1px solid rgb(200,200,200)",
                                            padding: "10px",
                                            fontSize: "1rem"
                                        }}
                                    />
                                    <ErrorMessage name="phone">
                                        {
                                            error => {
                                                return <Typography fontSize="1rem" color="error">{error}</Typography>
                                            }
                                        }
                                    </ErrorMessage>
                                </Grid>

                                {/* location */}
                                <Grid item xs={12}>
                                    <Typography color="primary" fontSize="1rem">Location</Typography>
                                    <Field
                                        as="select"
                                        name="location"
                                        style={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "4px",
                                            outline: "none",
                                            border: "1px solid rgb(200,200,200)",
                                            padding: "10px",
                                            fontSize: "1rem"
                                        }}
                                    >
                                        <option value="" disabled defaultValue hidden>Location</option>
                                        {
                                            cities.map((city, i) => {
                                                return (
                                                    <option key={i} value={city}>{city}</option>
                                                )

                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="location">
                                        {
                                            error => {
                                                return <Typography fontSize="1rem" color="error">{error}</Typography>
                                            }
                                        }
                                    </ErrorMessage>
                                </Grid>

                                <Grid item xs={12}>
                                    {
                                        isUpload ?
                                            <Button disabled>
                                                Uploading images
                                            </Button> :
                                            isSend ? <CircularProgress /> :
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    SAVE CHANGES
                                                </Button>
                                    }
                                </Grid>
                            </Grid>
                            {(isRequired || iserror) &&
                                <Snackbar
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                                    open={isRequired || isError}
                                    autoHideDuration={2000}
                                    onClose={() => {
                                        setIsRequired(false)
                                        setIserror(false)
                                    }}
                                >
                                    <Alert
                                        autoHideDuration={2000}
                                        onClose={() => {
                                            setIsRequired(false)
                                            setIserror(false)
                                        }}
                                        severity='error'
                                        sx={{ width: '80%', backgroundColor: 'red', color: 'white', fontWeight: '600' }}>
                                        <AlertTitle>
                                            Error
                                        </AlertTitle>
                                        {requiredText || err}
                                    </Alert>
                                </Snackbar>}
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    )


}

export default EditAccount