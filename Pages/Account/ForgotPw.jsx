import {useNavigate} from 'react-router-dom'

const ForgotPw = () => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        navigate('/')
    }


    return (
        <>
        <div className='forgotPasswordPage'>
        <p>...nothing to see here</p>
        <button className='signIn' onClick={handleSignIn}>SIGN IN</button>
        </div>
        </>
    )
}

export default ForgotPw