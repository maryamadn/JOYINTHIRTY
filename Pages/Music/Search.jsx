import {Outlet} from 'react-router-dom'

const Search = () => {

    return (
        <>
        <input placeholder="tracks"/>
        <button>search</button>
        <Outlet />
        </>
    )
}

export default Search