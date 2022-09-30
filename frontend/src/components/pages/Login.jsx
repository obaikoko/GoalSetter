import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import Spinner from '../Spinner'
import { useEffect } from 'react';


function Login() {

    const [formData, setFormData] = useState({ email: '', password: '' })
    const { email, password, } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isSuccess, isLoading, isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) { 
            toast.error(message)
        }
        if (user || isSuccess) {
            navigate('/')
        }
    }, [ user, isError, isSuccess, message, navigate])
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        
        dispatch(login(userData))

    }
    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <h1><FaSignInAlt /></h1>
                <p>Login an get started</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" name='email' id='email' value={email}
                            placeholder='Please Enter Your Email' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name='password' id='password' value={password}
                            placeholder='Please Enter Your Password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'> Submite</button>
                    </div>
                </form>
            </section>
        </>

    )
}

export default Login