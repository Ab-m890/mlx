import React from 'react'

//react query
import {useQuery} from 'react-query'

//axios
import { axiosInstance } from '../../config'

//components
import LoadingProgress from '../loading/LoadingProgress'
import Error from '../error/Error'

//react router dom
import { Outlet , useNavigate} from 'react-router-dom'

//page
import Login from '../../page/Login'

export const IsLogin = () => {
    const { isLoading, data, error, isError } = useQuery('verify-user', async () => {
        return await axiosInstance.get(`/api/auth/check`)
    })

    if (isLoading) {

        return <LoadingProgress />

    }
    
    if (isError) {

        return <Error error={error.message} />

    }
    
    if (data.data.status === "error") {

        return <Error error={data.data.error} />

    }
    
    if (data.data.status === "auth") {

        return <Login />

    }

    return <Outlet />
}

export const IsNotLogin = () => {
    const navigate = useNavigate()

    const { isLoading, data, error, isError } = useQuery('verify-user', async () => {
        return await axiosInstance.get(`/api/auth/check`)
    })

    if (isLoading) {

        return <LoadingProgress />

    } 
    
    if (isError) {

        return <Error error={error.message} />

    }
    
    if (data.data.status === "error") {

        return <Error error={data.data.error} />

    }
    
    if (data.data.status != null && data.data.status === "auth") {

        return <Outlet />
    }

    return navigate('/')
}