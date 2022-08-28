import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//mui
import { Typography, Box, Grid, Alert, AlertTitle, Snackbar, Button } from '@mui/material'
import { CircularProgress } from '@mui/material'

//formik
import { Formik, Form, Field, ErrorMessage } from 'formik'

//axiosos'
import { axiosInstance } from '../config'

//api cities and categorys
import lebanonCities from '../api/lebanon-cities/lb'
import allCategories from '../api/categories/categories'

const PostAd = () => {

    const navigate = useNavigate()

    const formData = {
        title: '',
        price: '',
        currency: '',
        category: '',
        status: '',
        phone: '',
        location: '',
        images: [],
        description: '',
    }

    const [isRequired, setIsRequired] = useState(false)

    const [requiredText, setRequiredText] = useState('')

    const [isError, setIsError] = useState(false)

    const [error, setError] = useState('')

    const [imagesUpload, setImagesUpload] = useState([])

    const [isSend, setIsSend] = useState(false)

    const [success, setSuccess] = useState(false)

    const cities = lebanonCities

    const categories = allCategories

    const uploadImageToStorage = async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `images/mlx/${Date.now()}`);
        return new Promise(resolve => {
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    setIsError(true)
                    setError(error.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    });
                })
        })
    }

    const sendDataToDatabase = async (values) => {

        setIsSend(true)

        try {

            const imagesUrl = []

            for (const image of imagesUpload) {
                const url = await uploadImageToStorage(image)
                imagesUrl.push(url)
            }

            const res = await axiosInstance.post('/api/ads/ad', {
                ...values,
                images: [...imagesUrl]
            })

            if (res.data.status === "ok") {
                setSuccess(true)
                navigate(`/ad/${res.data.id}`)

            } else if (res.data.status === "error") {
                setIsError(true)
                setError(res.data.error)
            } else if (res.data.status === "auth") {
                navigate('/login')
            } else if (res.data.status === "required") {
                setIsRequired(true)
                setRequiredText(res.data.requiredText)
            }
        } catch (error) {
            setIsError(true)
            setError(error.message)
        }

        setIsSend(false)
    }

    const onSubmitForm = (values) => {
        sendDataToDatabase(values)
    }

    const validate = values => {
        let error = {}

        if (!values.title) {
            error.title = "Enter title"
        }

        if (!values.price) {
            error.price = "Enter price"
        }

        if (!values.currency) {
            error.currency = "Select currency"
        }

        if (!values.category) {
            error.category = "Select category"
        }

        if (!values.status) {
            error.status = "Select status"
        }

        if (!values.phone) {
            error.phone = "Enter your phone number"
        }

        if (!values.location) {
            error.location = "Select your location"
        }

        if (imagesUpload.length === 0) {
            error.images = "Shoose images"
        }

        if (!values.description) {
            error.description = "Enter description"
        }

        return error
    }

    const displayImages = imagesUpload.length > 0 ? imagesUpload.map((file, i) => {
        return (
            <Grid
                key={i} item xs={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={4}
            >
                <img src={URL.createObjectURL(file)} style={{ width: '100%', maxHeight: '100%' }} />
            </Grid>
        )
    }) : []


    return (
        <Box sx={{ padding: "20px" }}>
            <Formik
                initialValues={formData}
                validate={validate}
                onSubmit={onSubmitForm}
                encType="multipart/form-data"
            >
                <Form>
                    <Box
                        width="100%"
                        minHeight="100vh"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onSubmit={onSubmitForm}
                        encType="multipart/form-data"
                    >
                        <Grid
                            maxWidth={600}
                            container
                            rowSpacing={{ xs: 2, sm: 3, md: 4 }}
                        >

                            {/* title of ad */}
                            <Grid item xs={12}>
                                <Typography color="primary" fontSize="1rem">Title</Typography>
                                <Field
                                    name="title"
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
                                <ErrorMessage name="title">
                                    {
                                        error => {
                                            return <Typography fontSize="1rem" color="error">{error}</Typography>
                                        }
                                    }
                                </ErrorMessage>
                            </Grid>

                            {/* price of ad */}
                            <Grid item xs={12}>
                                <Typography color="primary" fontSize="1rem">Price</Typography>
                                <Field
                                    type="number"
                                    name="price"
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
                                <ErrorMessage name="price">
                                    {
                                        error => {
                                            return <Typography fontSize="1rem" color="error">{error}</Typography>
                                        }
                                    }
                                </ErrorMessage>
                            </Grid>


                            {/* currency */}
                            <Grid item xs={12}>
                                <Typography color="primary" fontSize="1rem">Currency</Typography>
                                <Field
                                    as="select"
                                    name="currency"
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
                                    <option value="" disabled defaultValue hidden>Currency</option>
                                    <option value="$">$</option>
                                    <option value="LBP">LBP</option>
                                </Field>
                                <ErrorMessage name="currency">
                                    {
                                        error => {
                                            return <Typography fontSize="1rem" color="error">{error}</Typography>
                                        }
                                    }
                                </ErrorMessage>
                            </Grid>

                            {/* category */}
                            <Grid item xs={12}>
                                <Typography color="primary" fontSize="1rem">Category</Typography>
                                <Field
                                    as="select"
                                    name="category"
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
                                    <option value="" disabled defaultValue hidden>Category</option>
                                    {
                                        categories.map((category, i) => {
                                            return (
                                                <option key={i} value={category}>{category}</option>
                                            )

                                        })
                                    }
                                </Field>
                                <ErrorMessage name="category">
                                    {
                                        error => {
                                            return <Typography fontSize="1rem" color="error">{error}</Typography>
                                        }
                                    }
                                </ErrorMessage>
                            </Grid>

                            {/* status */}
                            <Grid item xs={12}>
                                <Typography color="primary" fontSize="1rem">Status</Typography>
                                <Field
                                    as="select"
                                    name="status"
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
                                    <option value="" disabled defaultValue hidden>Status</option>
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                </Field>
                                <ErrorMessage name="status">
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

                            {/* get file from externel storage */}
                            <Grid item xs={12}>
                                <Typography color="primary" fontSize="1rem">Shoose images</Typography>
                                <Field
                                    type="file"
                                    style={{
                                        backgroundColor: "rgb(250,250,250)",
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "4px"
                                    }}
                                    accept="image/*"
                                    name="images"
                                    id="images"
                                    onChange={(e) => {
                                        setImagesUpload(Array.from(e.target.files))
                                    }}
                                    multiple
                                />
                                <ErrorMessage name="images">
                                    {
                                        error => {
                                            return <Typography fontSize="1rem" color="error">{error}</Typography>
                                        }
                                    }
                                </ErrorMessage>
                            </Grid>

                            {/* display images shoose of ad */}
                            {displayImages.length > 0 &&
                                <Grid item xs={12}>
                                    <Grid container columnSpacing={4}>

                                        {displayImages}

                                    </Grid>
                                </Grid>}

                            {/* description of ad */}
                            <Grid item xs={12}>
                                <Typography color="primary" fontSize="1rem">Description</Typography>
                                <Field
                                    as="textarea"
                                    name="description"
                                    style={{
                                        width: "100%",
                                        borderRadius: "4px",
                                        outline: "none",
                                        border: "1px solid rgb(200,200,200)",
                                        padding: "10px",
                                        fontSize: "1rem"
                                    }}
                                    rows={10}
                                />
                                <ErrorMessage name="description">
                                    {
                                        error => {
                                            return <Typography fontSize="1rem" color="error">{error}</Typography>
                                        }
                                    }
                                </ErrorMessage>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    isSend ? <CircularProgress /> :
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                            Publish Ad
                                        </Button>
                                }
                            </Grid>
                        </Grid>
                        {(isRequired || isError) &&
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
                                    {requiredText || error}
                                </Alert>
                            </Snackbar>}
                        {success &&
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                                open={success ? true : false}
                                autoHideDuration={2000}
                                onClose={() => setSuccess(false)}
                            >
                                <Alert
                                    autoHideDuration={2000}
                                    onClose={() => setSuccess(false)}
                                    severity='success'
                                    sx={{ width: '80%', backgroundColor: 'green', color: 'white', fontWeight: '600' }}>
                                    Ad saved successfully!
                                </Alert>
                            </Snackbar>}
                    </Box>
                </Form>
            </Formik>
        </Box>
    )
}

export default PostAd