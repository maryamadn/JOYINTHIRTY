import {Link} from 'react-router-dom'

const Playlists = () => {

    const handleNewPlaylist = () => {
        console.log('make new playlist appear')
    }

    return (
        <>
        <Link to={'/user/playlists/playlistname'}><div>PLAYLIST 1</div></Link>
        <Link to={'/user/playlists/playlistname'}><div>PLAYLIST 2</div></Link>
        <button onClick={handleNewPlaylist}>+ NEW PLAYLIST</button>
        </>
    )
}

export default Playlists