import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

//axios
import { axiosInstance } from '../config'

const Login = () => {

    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: ''
    }

    const validate = values => {
        let error = {}
        if (!values.email) {
            error.email = 'Email required'
        }

        if (!values.password) {
            error.password = 'Password required'
        }

        return error
    }

    const onSubmit = async (values) => {

        const res = await axiosInstance.post(`/api/auth/login`, { data: values })

        if (res.data.status === "ok") {

            console.log("Login success")

            localStorage.setItem('token', res.data.token)

        } else console.log(res.data.error)

    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            <Form>
                <Field name="email" id="email" placeholder="email" /><br />
                <Field name="password" id="password" placeholder="password" />
                <button type="submit" >Submit </button>
            </Form>
        </Formik>
    )
}

export default Login