import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

//mui
import { Select, TextField, FormControl, InputLabel, MenuItem, Box, Grid, Alert, AlertTitle, Snackbar } from '@mui/material'
import { CircularProgress } from '@mui/material'
//axios
import { axiosInstance } from '../config'

//fie base 64
import FileBase64 from 'react-file-base64'

const PostAd = () => {

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        currency: '',
        category: '',
        status: '',
        phone: '',
        location: '',
        images: [],
        description: '',
    })

    const [error, setError] = useState('')

    const [resultCheck, setResultCheck] = useState("loading")

    const [imagesShoose, setImagesShoose] = useState([])

    const navigate = useNavigate()

    const checkUser = async () => {

        const token = localStorage.getItem('token')

        try {
            const res = await axiosInstance.post(`/api/auth/check`, {
                token
            })

            if (res.data.status === "error") {

                console.log(res.data.error)

                navigate('/login')

            } else if (res.data.status === "ok") {

                setResultCheck("ok")

                const { phone, location } = res.data.data

                setFormData(old => ({ ...old, phone, location }))

            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        checkUser()

    }, [])

    const sendDataToDatabase = async () => {

        const token = localStorage.getItem('token')

        try {
            const res = await axiosInstance.post('/api/ads/ad', {

                formData,
                token,

            })

            if (res.data.status === "ok") {

                console.log("Ok")
                console.log(res.data.data)

            } else if (res.data.status === "error") {
                console.log(res.data.error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        if (
            !(
                formData.title &&
                formData.price &&
                formData.currency &&
                formData.status &&
                formData.phone &&
                formData.location &&
                formData.category &&
                formData.images.length > 0 &&
                formData.description
            )
        ) setError("All Field Required !")
        else {
            sendDataToDatabase()
        }
    }

    const imagesView = useMemo(() => {

        const imagesUrl = imagesShoose.map(e => {
            return e.base64
        })

        // const imagesUrl = imagesShoose.map(e => {
        //     return URL.createObjectURL(e)
        // })

        setFormData(old => ({ ...old, images: [...imagesUrl] }))

        return imagesUrl

    }, [imagesShoose])

    const displayImages = imagesView.map((src, i) => {
        return (
            <Grid
                key={i} item xs={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <img src={src} style={{ width: '100%', maxHeight: '100%' }} />
            </Grid>
        )
    })

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
                {resultCheck === "loading" ? <CircularProgress /> :
                    resultCheck === "ok" &&
                    <Grid
                        maxWidth={600}
                        container
                        rowSpacing={{ xs: 2, sm: 3, md: 4 }}
                    >

                        {/* title of ad */}
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                name="title"
                                fullWidth
                                value={formData.title}
                                onChange={(e => setFormData(old => ({ ...old, title: e.target.value })))}
                            />
                        </Grid>

                        {/* price of ad */}
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                label="Price"
                                name="price"
                                fullWidth
                                value={formData.price}
                                onChange={(e => setFormData(old => ({ ...old, price: e.target.value })))}
                            />
                        </Grid>


                        {/* currency */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="currencyLabel">Currency</InputLabel>
                                <Select
                                    labelId="currencyLabel"
                                    label="Currrency"
                                    name="currency"
                                    id="currency"
                                    value={formData.currency}
                                    onChange={(e => setFormData(old => ({ ...old, currency: e.target.value })))}
                                >

                                    <MenuItem value="$">$</MenuItem>

                                    <MenuItem value="LBP">LBP</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* category */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="categoryLabel">Category</InputLabel>
                                <Select
                                    labelId="categoryLabel"
                                    label="Category"
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={(e => setFormData(old => ({ ...old, category: e.target.value })))}
                                >

                                    <MenuItem value="Cars">Cars</MenuItem>

                                    <MenuItem value="Mobile Phones and Accessories">Mobile phones and Accessories</MenuItem>

                                    <MenuItem value="Home Furniture & Decor">Home furniture & Decor</MenuItem>

                                    <MenuItem value="Fashion and beauty">Fashion and beauty</MenuItem>

                                    <MenuItem value="Kids and babies">Kids and babies</MenuItem>

                                    <MenuItem value="Sports and Equipments">Sports and Equipments</MenuItem>

                                    <MenuItem value="Electronics">Electronics</MenuItem>

                                    <MenuItem value="Hobbies , Music , Arts and Books">Hobbies , Music , Arts and Books</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* status */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="statusLabel">Status</InputLabel>
                                <Select
                                    labelId="statusLabel"
                                    label="Status"
                                    name="status"
                                    id="status"
                                    value={formData.status}
                                    onChange={(e => setFormData(old => ({ ...old, status: e.target.value })))}
                                >

                                    <MenuItem value="new">New</MenuItem>

                                    <MenuItem value="used">Used</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>


                        {/* phone */}
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                label="Phone"
                                name="phone"
                                fullWidth
                                value={formData.phone}
                                onChange={(e => setFormData(old => ({ ...old, phone: e.target.value })))}
                            />
                        </Grid>

                        {/* location */}
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                label="Location"
                                name="location"
                                fullWidth
                                value={formData.location}
                                onChange={(e => setFormData(old => ({ ...old, location: e.target.value })))}
                            />
                        </Grid>

                        {/* get file from externel storage */}
                        <Grid item xs={12}>

                            <FileBase64
                                multiple={true}
                                onDone={(base64 => setImagesShoose(base64))}
                            />
                        </Grid>

                        {/* display images shoose of ad */}
                        <Grid item xs={12}>
                            <Grid container columnSpacing={4}>

                                {displayImages}

                            </Grid>
                        </Grid>

                        {/* description of ad */}
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Description"
                                fullWidth
                                multiline
                                rows={6}
                                value={formData.description}
                                onChange={(e => setFormData(old => ({ ...old, description: e.target.value })))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <button type="submit" >Submit</button>
                        </Grid>
                    </Grid>}
                {error &&
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
                    </Snackbar>}
            </Box>
        </section>
    )
}

export default PostAd