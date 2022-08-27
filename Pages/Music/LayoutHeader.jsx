import {Link, Outlet} from 'react-router-dom'

const LayoutHeader = () => {

    return (
        <>
        <Link to='/user'><div>HOME</div></Link>
        <Link to='/user/playlists'><div>PLAYLISTS</div></Link>
        <Link to='/user/search'><div>SEARCH</div></Link>
        <Link to='/user/stats'><div>STATS</div></Link>

        <div className='dropdown'>
            <p>img: user icon</p>
            <div className='dropdown-content'>
                <Link to='/user/account'>Account Info</Link>
                <Link to='/'>Logout</Link>
            </div>
        </div>

        <Outlet />
        </>
    )
}

export default LayoutHeader