import {useState, useEffect} from 'react'
import {FaUserAlt} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {reset, register} from '../../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import Spinner from '../Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    const onChange = (e) => {
       setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
       }))
    } 
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (user || isSuccess) {
            navigate('/')
            dispatch(reset())
        }  
    }, [user, isError, message, isSuccess, navigate, dispatch] )
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('passwords do not match')
        }
        const userData = {
            name,
            email,
            password
        }
        dispatch(register(userData)) 
    }
    if (isLoading) {
        return <Spinner/>
    }
  
    return (
        <>
            <section className='heading'>
                <h1><FaUserAlt /></h1>
                <p>Create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name='name' id='name' value={name}
                            placeholder='Please Enter Your Name' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" name='email' id='email' value={email}
                            placeholder='Please Enter Your Email' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name='password' id='password' value={password}
                            placeholder='Please Enter Your Password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" name='password2' id='password2' value={password2}
                            placeholder='Confirm Password' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'> Submite</button>
                    </div>
                </form>
            </section>
        </>

    )
}

export default Register