import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//axios
import axios from 'axios'

const UpdateAd = () => {

    const [resultCheck, setResultCheck] = useState("loading")

    const navigate = useNavigate()

    const checkUser = async () => {

        const token = localStorage.getItem('token')

        const res = await axios.post(`http://localhost:8080/api/auth/check`, {
            token
        })

        if (res.data.status === "error") {

            console.log(res.data.error)

            navigate('/login')

        } else setResultCheck("ok")
    }

    useEffect(() => {

        checkUser()

    }, [])

    return (
        resultCheck === "loading" ? <p style={{textAlign: 'center'}}>Loading...</p> :
            resultCheck === "ok" &&
            <section>
                add product
            </section>
    )
}

export default UpdateAd