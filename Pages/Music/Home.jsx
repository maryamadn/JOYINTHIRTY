import {Link} from 'react-router-dom'

const Home = () => {

    return (
        <>
        <h1>WELCOME, username{''}!</h1>
        <button>remove landing image</button>

        <hr />

        <div className='dropdown'>
            <p>img: user icon</p>
            <div className='dropdown-content'>
                <Link to='/user/account'>Account Info</Link>
                <Link to='/'>Logout</Link>
            </div>
        </div>

        <Link to='/user/search'><div>SEARCH</div></Link>
        <Link to='/user/stats'><div>STATS</div></Link>
        <Link to='/user/playlists'><div>PLAYLISTS</div></Link>
        <Link to='/user/search'><div>TOP TRACKS</div></Link>

        </>
    )
}

export default Home