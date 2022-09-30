import { FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'



function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const onLogout = () => {
        dispatch(reset())
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header className='header'>
            <div>
                <Link to='/'>GoalSetter</Link>
            </div>
            <div>
                <ul>
                    {user ? (<><button className='btn' onClick={onLogout}>Logout</button></>) : (<>
                        <li>
                            <Link to='login'><FaSignInAlt />Login</Link>
                        </li>
                        <li>
                            <Link to='register'><FaUserAlt /> Register</Link>
                        </li>
                    </>)}

                </ul>
            </div>
        </header>
    )
}

export default Header