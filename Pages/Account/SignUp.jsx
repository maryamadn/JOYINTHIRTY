import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/user')
    }
    const handleSignIn = () => {
        navigate('/')
    }

    const handleForgotPw = () => {
        navigate('/forgotpw')
    }


    return (
        <>
        <input placeholder="USERNAME" />
        <input placeholder="PASSWORD" />
        <button onClick={handleSignUp}>SIGN UP</button>
        <button onClick={handleForgotPw}>FORGOT PASSWORD</button>
        <button onClick={handleSignIn}>SIGN IN</button>
        </>
    )
}

export default SignUp