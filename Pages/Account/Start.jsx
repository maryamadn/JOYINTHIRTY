import {Outlet} from 'react-router-dom'
import {MdOutlineLibraryMusic} from 'react-icons/md'
import { IconContext } from 'react-icons'

const Start = () => {

    const style = {
        fontSize: '40px'
    }
    return (
        <>
        <div className='startPage'>

        <IconContext.Provider value={{ size: "20vw", className: "logo" }}>
        <MdOutlineLibraryMusic />
        </IconContext.Provider>
        <h1 className='brand'>music.</h1>
        <Outlet />
        </div>
        </>
    )
}

export default Start