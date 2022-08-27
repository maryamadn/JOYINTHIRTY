import {useNavigate} from 'react-router-dom'

const ForgotPw = () => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        navigate('/')
    }


    return (
        <>
        <h1>....cant do anything yet</h1>
        <button onClick={handleSignIn}>SIGN IN</button>
        </>
    )
}

export default ForgotPw