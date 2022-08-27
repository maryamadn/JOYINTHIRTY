import {useNavigate} from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/user')
    }

    return (
        <>
        <h1>PROFILE</h1>
        <p>USERNAME</p>
        <p>PASSWORD</p>
        <button onClick={handleBack}>BACK</button>
        </>
    )
}

export default Account