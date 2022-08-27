import {useNavigate} from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        navigate('/user')
    }

    const handleForgotPw = () => {
        navigate('/forgotpw')
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <>
        <input placeholder="USERNAME" />
        <input placeholder="PASSWORD" />
        <button onClick={handleSignIn}>SIGN IN</button>
        <button onClick={handleForgotPw}>FORGOT PASSWORD</button>
        <button onClick={handleSignUp}>SIGN UP</button>
        </>
    )
}

export default SignIn